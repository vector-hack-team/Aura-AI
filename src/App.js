import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from './entities/User';
import Layout from './Layout';
import Onboarding from './Pages/Onboarding/Onboarding';
import Dashboard from './Pages/Dashboard/Dashboard';
import Chat from './Pages/Chat/Chat';
import MoodTracker from './Pages/MoodTracker/MoodTracker';
import Assessments from './Pages/Assessments/Assessments';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and onboarding is completed
    const checkUserStatus = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4"></div>
          <p>Loading Aura...</p>
        </div>
      </div>
    );
  }

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/onboarding" replace />;
    }

    if (!user.onboarding_completed) {
      return <Navigate to="/onboarding" replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <Layout>
              <Chat />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/mood-tracker" element={
          <ProtectedRoute>
            <Layout>
              <MoodTracker />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/assessments" element={
          <ProtectedRoute>
            <Layout>
              <Assessments />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;