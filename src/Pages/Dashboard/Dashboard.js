import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { MessageSquare, BarChart2, ClipboardList, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [recentMoods, setRecentMoods] = useState([]);
  const [upcomingAssessments, setUpcomingAssessments] = useState([]);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data and dashboard information
    const fetchDashboardData = async () => {
      try {
        // This would normally be API calls
        // For now, we'll use mock data
        
        // Mock user data
        const userData = {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://i.pravatar.cc/150?u=john@example.com',
          streakDays: 5,
          lastActive: '2023-06-10T14:30:00Z',
        };
        
        // Mock mood data
        const moodData = [
          { id: 1, mood: 'Happy', score: 8, date: '2023-06-10T14:30:00Z', note: 'Had a great day at work!' },
          { id: 2, mood: 'Calm', score: 7, date: '2023-06-09T18:45:00Z', note: 'Meditation session helped' },
          { id: 3, mood: 'Anxious', score: 4, date: '2023-06-08T20:15:00Z', note: 'Worried about upcoming presentation' },
        ];
        
        // Mock assessment data
        const assessmentData = [
          { id: 1, title: 'Weekly Mood Check-in', dueDate: '2023-06-12T00:00:00Z', completed: false },
          { id: 2, title: 'Anxiety Assessment', dueDate: '2023-06-15T00:00:00Z', completed: false },
        ];
        
        // Mock insights
        const insightData = [
          { id: 1, title: 'Sleep Pattern', description: 'Your mood tends to be better on days following 7+ hours of sleep.' },
          { id: 2, title: 'Stress Triggers', description: 'Work meetings appear to be a common source of anxiety.' },
        ];
        
        setUser(userData);
        setRecentMoods(moodData);
        setUpcomingAssessments(assessmentData);
        setInsights(insightData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <div className="bg-primary-100 dark:bg-primary-900 px-4 py-2 rounded-lg flex items-center">
            <div className="mr-3">
              <div className="text-sm text-gray-600 dark:text-gray-300">Current streak</div>
              <div className="text-xl font-bold text-primary-600 dark:text-primary-400">{user?.streakDays} days</div>
            </div>
            <div className="h-10 w-10 bg-primary-200 dark:bg-primary-800 rounded-full flex items-center justify-center">
              <span className="text-primary-600 dark:text-primary-400">🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/chat')}>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
              <MessageSquare className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-medium">Talk to Aura</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Chat about how you're feeling</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/mood-tracker')}>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
              <BarChart2 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-medium">Log your mood</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Track how you're feeling today</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/assessments')}>
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
              <ClipboardList className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-medium">Take an assessment</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Measure your mental wellbeing</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent moods */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Moods</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/mood-tracker')}>
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentMoods.length > 0 ? (
            recentMoods.map((mood) => (
              <Card key={mood.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">
                        {mood.mood === 'Happy' && '😊'}
                        {mood.mood === 'Calm' && '😌'}
                        {mood.mood === 'Anxious' && '😰'}
                        {mood.mood === 'Sad' && '😢'}
                        {mood.mood === 'Angry' && '😠'}
                      </span>
                      <span className="font-medium">{mood.mood}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{mood.note}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <div className="w-24 mr-2">
                        <Progress value={mood.score * 10} />
                      </div>
                      <span className="text-sm font-medium">{mood.score}/10</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(mood.date, 'short')}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">No mood entries yet. Start tracking your mood!</p>
              <Button className="mt-4" onClick={() => navigate('/mood-tracker')}>Log Your Mood</Button>
            </Card>
          )}
        </div>
      </div>

      {/* Upcoming assessments and insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming assessments */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Upcoming Assessments</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/assessments')}>
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingAssessments.length > 0 ? (
              upcomingAssessments.map((assessment) => (
                <Card key={assessment.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{assessment.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Due: {formatDate(assessment.dueDate, 'medium')}
                      </p>
                    </div>
                    <Button size="sm" onClick={() => navigate(`/assessments/${assessment.id}`)}>
                      Start
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">No upcoming assessments.</p>
              </Card>
            )}
          </div>
        </div>
        
        {/* Insights */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Insights</h2>
          </div>
          
          <div className="space-y-3">
            {insights.length > 0 ? (
              insights.map((insight) => (
                <Card key={insight.id} className="p-4">
                  <h3 className="font-medium">{insight.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {insight.description}
                  </p>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Continue logging your moods to receive personalized insights.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;