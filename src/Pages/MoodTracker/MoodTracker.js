import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Calendar } from '../../components/ui/calendar';
import { Textarea } from '../../components/ui/textarea';
import { Smile, Frown, Meh, Calendar as CalendarIcon, BarChart2, Plus } from 'lucide-react';
import { formatDate } from '../../utils';

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useState([]);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEntry, setNewEntry] = useState({
    mood: 'neutral',
    score: 5,
    note: '',
    date: new Date().toISOString(),
  });
  const [view, setView] = useState('calendar'); // 'calendar' or 'list' or 'stats'

  useEffect(() => {
    // Fetch mood entries
    // This would normally be an API call
    // For now, we'll use mock data
    const mockEntries = [
      {
        id: 1,
        mood: 'happy',
        score: 8,
        note: 'Had a great day at work!',
        date: '2023-06-10T14:30:00Z',
      },
      {
        id: 2,
        mood: 'calm',
        score: 7,
        note: 'Meditation session helped',
        date: '2023-06-09T18:45:00Z',
      },
      {
        id: 3,
        mood: 'anxious',
        score: 4,
        note: 'Worried about upcoming presentation',
        date: '2023-06-08T20:15:00Z',
      },
      {
        id: 4,
        mood: 'sad',
        score: 3,
        note: 'Missing friends and family',
        date: '2023-06-07T19:20:00Z',
      },
      {
        id: 5,
        mood: 'happy',
        score: 9,
        note: 'Weekend trip was amazing!',
        date: '2023-06-05T21:10:00Z',
      },
    ];
    
    setMoodEntries(mockEntries);
  }, []);

  const handleAddEntry = () => {
    // This would normally be an API call to save the entry
    const newEntryWithId = {
      ...newEntry,
      id: moodEntries.length + 1,
    };
    
    setMoodEntries([newEntryWithId, ...moodEntries]);
    setIsAddingEntry(false);
    setNewEntry({
      mood: 'neutral',
      score: 5,
      note: '',
      date: new Date().toISOString(),
    });
  };

  const handleMoodSelect = (mood) => {
    setNewEntry({
      ...newEntry,
      mood,
      score: mood === 'happy' ? 8 : mood === 'calm' ? 7 : mood === 'neutral' ? 5 : mood === 'sad' ? 3 : 2,
    });
  };

  const handleScoreChange = (value) => {
    setNewEntry({
      ...newEntry,
      score: value,
      mood:
        value >= 8 ? 'happy' :
        value >= 6 ? 'calm' :
        value >= 4 ? 'neutral' :
        value >= 2 ? 'sad' : 'angry',
    });
  };

  const getMoodEntryForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return moodEntries.find(entry => {
      const entryDate = new Date(entry.date).toISOString().split('T')[0];
      return entryDate === dateString;
    });
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy': return 'bg-green-500';
      case 'calm': return 'bg-blue-500';
      case 'neutral': return 'bg-gray-400';
      case 'sad': return 'bg-yellow-500';
      case 'angry': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getMoodEmoji = (mood) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'calm': return '😌';
      case 'neutral': return '😐';
      case 'sad': return '😢';
      case 'angry': return '😠';
      default: return '😐';
    }
  };

  const renderCalendarView = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          modifiers={{
            mood: (date) => getMoodEntryForDate(date) !== undefined,
          }}
          modifiersStyles={{
            mood: (date) => {
              const entry = getMoodEntryForDate(date);
              return entry ? { backgroundColor: getMoodColor(entry.mood).replace('bg-', '') } : {};
            },
          }}
        />
      </Card>

      {selectedDate && (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">
            {formatDate(selectedDate, 'long')}
          </h3>
          
          {getMoodEntryForDate(selectedDate) ? (
            <div>
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">
                  {getMoodEmoji(getMoodEntryForDate(selectedDate).mood)}
                </div>
                <div>
                  <h4 className="font-medium capitalize">{getMoodEntryForDate(selectedDate).mood}</h4>
                  <div className="flex items-center">
                    <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                      <div
                        className={`h-2 rounded-full ${getMoodColor(getMoodEntryForDate(selectedDate).mood)}`}
                        style={{ width: `${getMoodEntryForDate(selectedDate).score * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{getMoodEntryForDate(selectedDate).score}/10</span>
                  </div>
                </div>
              </div>
              
              {getMoodEntryForDate(selectedDate).note && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Notes</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {getMoodEntryForDate(selectedDate).note}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">No mood entry for this date</p>
              <Button onClick={() => setIsAddingEntry(true)}>Add Entry</Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {moodEntries.map((entry) => (
        <Card key={entry.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-3xl mr-3">{getMoodEmoji(entry.mood)}</div>
              <div>
                <h3 className="font-medium capitalize">{entry.mood}</h3>
                <p className="text-sm text-gray-500">{formatDate(entry.date, 'medium')}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                <div
                  className={`h-2 rounded-full ${getMoodColor(entry.mood)}`}
                  style={{ width: `${entry.score * 10}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{entry.score}/10</span>
            </div>
          </div>
          
          {entry.note && (
            <div className="mt-3 pl-12">
              <p className="text-gray-600 dark:text-gray-300 text-sm">{entry.note}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );

  const renderStatsView = () => {
    // Calculate average mood score
    const averageScore = moodEntries.length > 0
      ? (moodEntries.reduce((sum, entry) => sum + entry.score, 0) / moodEntries.length).toFixed(1)
      : 0;
    
    // Count mood types
    const moodCounts = moodEntries.reduce((counts, entry) => {
      counts[entry.mood] = (counts[entry.mood] || 0) + 1;
      return counts;
    }, {});
    
    // Find most common mood
    let mostCommonMood = 'neutral';
    let maxCount = 0;
    
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > maxCount) {
        mostCommonMood = mood;
        maxCount = count;
      }
    });
    
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Mood Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Mood</p>
              <div className="text-3xl font-bold mt-1">{averageScore}/10</div>
            </div>
            
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Most Common</p>
              <div className="text-3xl font-bold mt-1 capitalize">
                {getMoodEmoji(mostCommonMood)} {mostCommonMood}
              </div>
            </div>
            
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Entries</p>
              <div className="text-3xl font-bold mt-1">{moodEntries.length}</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Mood Distribution</h3>
          
          <div className="space-y-3">
            {['happy', 'calm', 'neutral', 'sad', 'angry'].map((mood) => {
              const count = moodCounts[mood] || 0;
              const percentage = moodEntries.length > 0 
                ? Math.round((count / moodEntries.length) * 100) 
                : 0;
              
              return (
                <div key={mood} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="mr-2">{getMoodEmoji(mood)}</span>
                      <span className="capitalize">{mood}</span>
                    </div>
                    <span className="text-sm">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${getMoodColor(mood)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Mood Tracker</h1>
        
        <div className="flex space-x-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-1 flex">
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1 rounded ${view === 'calendar' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' : ''}`}
            >
              <CalendarIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1 rounded ${view === 'list' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' : ''}`}
            >
              <Meh className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView('stats')}
              className={`px-3 py-1 rounded ${view === 'stats' ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' : ''}`}
            >
              <BarChart2 className="h-5 w-5" />
            </button>
          </div>
          
          <Button onClick={() => setIsAddingEntry(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add Entry
          </Button>
        </div>
      </div>

      {/* View content */}
      {view === 'calendar' && renderCalendarView()}
      {view === 'list' && renderListView()}
      {view === 'stats' && renderStatsView()}

      {/* Add entry modal */}
      {isAddingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">How are you feeling?</h2>
              
              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  <button
                    onClick={() => handleMoodSelect('happy')}
                    className={`p-3 rounded-full ${newEntry.mood === 'happy' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    <Smile className="h-8 w-8" />
                  </button>
                  <button
                    onClick={() => handleMoodSelect('calm')}
                    className={`p-3 rounded-full ${newEntry.mood === 'calm' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    <Smile className="h-8 w-8" />
                  </button>
                  <button
                    onClick={() => handleMoodSelect('neutral')}
                    className={`p-3 rounded-full ${newEntry.mood === 'neutral' ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300' : 'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    <Meh className="h-8 w-8" />
                  </button>
                  <button
                    onClick={() => handleMoodSelect('sad')}
                    className={`p-3 rounded-full ${newEntry.mood === 'sad' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400' : 'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    <Frown className="h-8 w-8" />
                  </button>
                  <button
                    onClick={() => handleMoodSelect('angry')}
                    className={`p-3 rounded-full ${newEntry.mood === 'angry' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-800'}`}
                  >
                    <Frown className="h-8 w-8" />
                  </button>
                </div>
                
                <div className="text-center mb-2">
                  <span className="text-lg font-medium capitalize">{newEntry.mood}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                  <Slider
                    value={[newEntry.score]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(values) => handleScoreChange(values[0])}
                  />
                  <div className="text-center">
                    <span className="text-lg font-medium">{newEntry.score}/10</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <Label htmlFor="note">Notes (optional)</Label>
                <Textarea
                  id="note"
                  placeholder="How are you feeling? What happened today?"
                  value={newEntry.note}
                  onChange={(e) => setNewEntry({ ...newEntry, note: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingEntry(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEntry}>
                  Save Entry
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;