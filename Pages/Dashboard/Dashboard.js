
import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { MoodEntry } from "@/entities/MoodEntry";
import { Conversation } from "@/entities/Conversation";
import { Assessment } from "@/entities/Assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Heart, 
  MessageCircle, 
  Brain, 
  Calendar, 
  TrendingUp, 
  Smile,
  ArrowRight,
  Mic,
  Sun,
  Moon,
  CloudRain
} from "lucide-react";
import { format, subDays } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [recentMoods, setRecentMoods] = useState([]);
  const [todayMood, setTodayMood] = useState(null);
  const [recentConversations, setRecentConversations] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    setGreeting(getTimeBasedGreeting());
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      
      // Check if onboarding is complete
      if (!currentUser.onboarding_completed) {
        // Redirect to onboarding if not completed
        window.location.href = createPageUrl("Onboarding");
        return;
      }
      
      // Load recent moods for chart
      const moods = await MoodEntry.list("-created_date", 7);
      setRecentMoods(moods);
      
      // Check today's mood
      const today = format(new Date(), "yyyy-MM-dd");
      const todaysMood = moods.find(mood => 
        format(new Date(mood.created_date), "yyyy-MM-dd") === today
      );
      setTodayMood(todaysMood);
      
      // Load recent conversations
      const conversations = await Conversation.list("-created_date", 3);
      setRecentConversations(conversations);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      // User might not be logged in or onboarding not complete
      window.location.href = createPageUrl("Onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getMoodChartData = () => {
    const last7Days = Array.from({length: 7}, (_, i) => {
      const date = subDays(new Date(), 6 - i);
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
    return last7Days;
  };

  const getPersonaInfo = (persona) => {
    const personas = {
      aria: { name: "Aria", color: "from-pink-400 to-rose-500", icon: Heart },
      dr_aegis: { name: "Dr. Aegis", color: "from-blue-400 to-indigo-500", icon: Brain },
      aiden: { name: "Aiden", color: "from-green-400 to-emerald-500", icon: Calendar }
    };
    return personas[persona] || personas.aria;
  };

  const getMoodIcon = (score) => {
    if (score >= 8) return { icon: Sun, color: "text-yellow-500" };
    if (score >= 6) return { icon: Smile, color: "text-green-500" };
    if (score >= 4) return { icon: CloudRain, color: "text-blue-500" };
    return { icon: Moon, color: "text-gray-500" };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4"></div>
          <p>Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <Heart className="w-16 h-16 mx-auto mb-4 text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Aura</h2>
            <p className="text-gray-600 mb-6">Let's get you set up with your AI mental health companion</p>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Link to={createPageUrl("Onboarding")}>Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedPersona = getPersonaInfo(user.selected_ai_persona);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {greeting}! 👋
        </h1>
        <p className="text-xl text-gray-600">
          {user.voice_name} is here to support you today
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link to={createPageUrl("Chat")}>
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Talk to {user.voice_name}</h3>
                <p className="text-gray-600">Start a conversation</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedPersona.color} flex items-center justify-center`}>
                <selectedPersona.icon className="w-6 h-6 text-white" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to={createPageUrl("MoodTracker")}>
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Log Your Mood</h3>
                <p className="text-gray-600">Track how you're feeling</p>
              </div>
              <Heart className="w-12 h-12 text-green-500" />
            </CardContent>
          </Card>
        </Link>

        <Link to={createPageUrl("Chat")}> {/* Changed to Link and pointed to Chat page */}
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">Voice Chat</h3>
                <p className="text-gray-600">Speak naturally</p>
              </div>
              <Mic className="w-12 h-12 text-blue-500" />
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mood Tracking Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Your Mood This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMoods.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getMoodChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[1, 10]} />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      connectNulls={false}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Start tracking your mood to see patterns</p>
                  <Button className="mt-4" asChild>
                    <Link to={createPageUrl("MoodTracker")}>
                      Log First Mood
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Check-in</CardTitle>
            </CardHeader>
            <CardContent>
              {todayMood ? (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {(() => {
                      const moodInfo = getMoodIcon(todayMood.mood_score);
                      return <moodInfo.icon className={`w-16 h-16 ${moodInfo.color}`} />;
                    })()}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Feeling {todayMood.mood_type}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mood: {todayMood.mood_score}/10 • Energy: {todayMood.energy_level}/10
                  </p>
                  {todayMood.notes && (
                    <p className="text-sm text-gray-500 italic">"{todayMood.notes}"</p>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <Smile className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How are you feeling today?
                  </h3>
                  <Button asChild>
                    <Link to={createPageUrl("MoodTracker")}>
                      Check In
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Chats
                <Link to={createPageUrl("Chat")}>
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentConversations.length > 0 ? (
                <div className="space-y-4">
                  {recentConversations.map((conversation) => {
                    const persona = getPersonaInfo(conversation.ai_persona);
                    return (
                      <div key={conversation.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${persona.color} flex items-center justify-center flex-shrink-0`}>
                          <persona.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">
                            {conversation.user_message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(conversation.created_date), "MMM d, h:mm a")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-2">No recent conversations</p>
                  <p className="text-sm text-gray-400 mb-4">Start chatting with {user.voice_name} to see your conversation history here</p>
                  <Button className="mt-2" asChild>
                    <Link to={createPageUrl("Chat")}>
                      Start Chatting
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
