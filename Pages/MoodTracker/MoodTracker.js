import React, { useState, useEffect } from "react";
import { MoodEntry } from "@/entities/MoodEntry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Sun, 
  CloudRain, 
  Moon, 
  Smile, 
  Frown,
  Meh,
  TrendingUp,
  Calendar,
  Plus
} from "lucide-react";
import { format, subDays } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const MOOD_TYPES = [
  { id: "happy", name: "Happy", icon: Sun, color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { id: "content", name: "Content", icon: Smile, color: "bg-green-100 text-green-800 border-green-200" },
  { id: "calm", name: "Calm", icon: Heart, color: "bg-blue-100 text-blue-800 border-blue-200" },
  { id: "excited", name: "Excited", icon: TrendingUp, color: "bg-purple-100 text-purple-800 border-purple-200" },
  { id: "sad", name: "Sad", icon: CloudRain, color: "bg-gray-100 text-gray-800 border-gray-200" },
  { id: "anxious", name: "Anxious", icon: Frown, color: "bg-orange-100 text-orange-800 border-orange-200" },
  { id: "frustrated", name: "Frustrated", icon: Meh, color: "bg-red-100 text-red-800 border-red-200" },
  { id: "overwhelmed", name: "Overwhelmed", icon: Moon, color: "bg-indigo-100 text-indigo-800 border-indigo-200" }
];

const COMMON_TRIGGERS = [
  "Work stress", "Family", "Relationships", "Health", "Sleep", "Weather", 
  "Social media", "News", "Finances", "Exercise", "Diet", "Medication"
];

const COMMON_ACTIVITIES = [
  "Exercise", "Reading", "Music", "Meditation", "Socializing", "Working",
  "Watching TV", "Cooking", "Walking", "Gaming", "Art", "Sleeping"
];

export default function MoodTracker() {
  const [recentMoods, setRecentMoods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    mood_score: 5,
    mood_type: "content",
    notes: "",
    triggers: [],
    activities: [],
    energy_level: 5
  });

  useEffect(() => {
    loadMoods();
  }, []);

  const loadMoods = async () => {
    try {
      const moods = await MoodEntry.list("-created_date", 30);
      setRecentMoods(moods);
    } catch (error) {
      console.error("Error loading moods:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await MoodEntry.create(formData);
      setShowForm(false);
      setFormData({
        mood_score: 5,
        mood_type: "content", 
        notes: "",
        triggers: [],
        activities: [],
        energy_level: 5
      });
      await loadMoods();
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  };

  const toggleTrigger = (trigger) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.includes(trigger)
        ? prev.triggers.filter(t => t !== trigger)
        : [...prev.triggers, trigger]
    }));
  };

  const toggleActivity = (activity) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const getMoodChartData = () => {
    const last14Days = Array.from({length: 14}, (_, i) => {
      const date = subDays(new Date(), 13 - i);
      const dateStr = format(date, "yyyy-MM-dd");
      const mood = recentMoods.find(m => 
        format(new Date(m.created_date), "yyyy-MM-dd") === dateStr
      );
      return {
        date: format(date, "MMM dd"),
        mood: mood?.mood_score || null,
        energy: mood?.energy_level || null
      };
    });
    return last14Days;
  };

  const getMoodTypeInfo = (type) => {
    return MOOD_TYPES.find(m => m.id === type) || MOOD_TYPES[1];
  };

  const getMoodAverage = () => {
    if (recentMoods.length === 0) return 0;
    const sum = recentMoods.reduce((acc, mood) => acc + mood.mood_score, 0);
    return (sum / recentMoods.length).toFixed(1);
  };

  const todaysMood = recentMoods.find(mood => 
    format(new Date(mood.created_date), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mood Tracker</h1>
          <p className="text-gray-600">Track your emotions and energy levels</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Log Mood
        </Button>
      </div>

      {/* Mood Entry Form */}
      {showForm && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle>How are you feeling right now?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mood Type Selection */}
            <div>
              <Label className="text-base font-semibold">What's your mood?</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {MOOD_TYPES.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setFormData(prev => ({ ...prev, mood_type: mood.id }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.mood_type === mood.id 
                        ? "border-purple-500 bg-purple-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <mood.icon className="w-6 h-6 mx-auto mb-1" />
                    <p className="text-sm font-medium">{mood.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Score */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="mood_score" className="text-base font-semibold">
                  Mood Level (1-10)
                </Label>
                <Input
                  id="mood_score"
                  type="range"
                  min="1"
                  max="10"
                  value={formData.mood_score}
                  onChange={(e) => setFormData(prev => ({ ...prev, mood_score: parseInt(e.target.value) }))}
                  className="mt-2"
                />
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-purple-600">{formData.mood_score}</span>
                </div>
              </div>

              <div>
                <Label htmlFor="energy_level" className="text-base font-semibold">
                  Energy Level (1-10)
                </Label>
                <Input
                  id="energy_level"
                  type="range"
                  min="1"
                  max="10"
                  value={formData.energy_level}
                  onChange={(e) => setFormData(prev => ({ ...prev, energy_level: parseInt(e.target.value) }))}
                  className="mt-2"
                />
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-purple-600">{formData.energy_level}</span>
                </div>
              </div>
            </div>

            {/* Triggers */}
            <div>
              <Label className="text-base font-semibold">What might be influencing your mood?</Label>
              <div className="flex flex-wrap gap-2 mt-3">
                {COMMON_TRIGGERS.map((trigger) => (
                  <Badge
                    key={trigger}
                    variant="outline"
                    className={`cursor-pointer transition-all ${
                      formData.triggers.includes(trigger)
                        ? "bg-purple-100 border-purple-500 text-purple-700"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleTrigger(trigger)}
                  >
                    {trigger}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <Label className="text-base font-semibold">What have you been doing?</Label>
              <div className="flex flex-wrap gap-2 mt-3">
                {COMMON_ACTIVITIES.map((activity) => (
                  <Badge
                    key={activity}
                    variant="outline"
                    className={`cursor-pointer transition-all ${
                      formData.activities.includes(activity)
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleActivity(activity)}
                  >
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-base font-semibold">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional thoughts or context..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Save Mood
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mood Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Mood Trends (Last 2 Weeks)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getMoodChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 10]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      connectNulls={false}
                      name="Mood"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="energy" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      connectNulls={false}
                      name="Energy"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats & Today */}
        <div className="space-y-6">
          {/* Today's Mood */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todaysMood ? (
                <div className="text-center">
                  {(() => {
                    const moodInfo = getMoodTypeInfo(todaysMood.mood_type);
                    return <moodInfo.icon className="w-12 h-12 mx-auto mb-3 text-purple-500" />;
                  })()}
                  <h3 className="text-lg font-semibold text-gray-900 capitalize mb-2">
                    {todaysMood.mood_type}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Mood: {todaysMood.mood_score}/10</p>
                    <p>Energy: {todaysMood.energy_level}/10</p>
                    <p className="text-xs">
                      {format(new Date(todaysMood.created_date), "h:mm a")}
                    </p>
                  </div>
                  {todaysMood.notes && (
                    <p className="text-xs text-gray-500 italic mt-3">
                      "{todaysMood.notes}"
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500 mb-3">No mood logged today</p>
                  <Button 
                    onClick={() => setShowForm(true)}
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Log Today's Mood
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Mood</span>
                <span className="font-semibold text-lg">{getMoodAverage()}/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Entries This Month</span>
                <span className="font-semibold text-lg">{recentMoods.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tracking Streak</span>
                <span className="font-semibold text-lg">
                  {recentMoods.length > 0 ? "🔥 Active" : "Start today!"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Entries */}
      {recentMoods.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMoods.slice(0, 5).map((mood) => {
                const moodInfo = getMoodTypeInfo(mood.mood_type);
                return (
                  <div key={mood.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <moodInfo.icon className="w-6 h-6 text-gray-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium capitalize">{mood.mood_type}</span>
                        <Badge variant="outline" className="text-xs">
                          {mood.mood_score}/10
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {format(new Date(mood.created_date), "MMM d, h:mm a")}
                      </p>
                      {mood.notes && (
                        <p className="text-sm text-gray-600 mt-1">"{mood.notes}"</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}