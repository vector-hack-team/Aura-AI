import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { formatDate } from '../../utils';
import { CheckCircle, Clock, AlertTriangle, ChevronRight, FileText } from 'lucide-react';

const Assessments = () => {
  const [assessments, setAssessments] = useState([]);
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch assessments
    // This would normally be an API call
    // For now, we'll use mock data
    const mockUpcoming = [
      {
        id: 1,
        title: 'Depression Screening (PHQ-9)',
        description: 'Standard screening tool for depression severity',
        dueDate: '2023-06-15T00:00:00Z',
        estimatedTime: '5 minutes',
        priority: 'high',
        questions: 9,
        category: 'Mental Health',
      },
      {
        id: 2,
        title: 'Anxiety Assessment (GAD-7)',
        description: 'Screening tool for generalized anxiety disorder',
        dueDate: '2023-06-18T00:00:00Z',
        estimatedTime: '3 minutes',
        priority: 'medium',
        questions: 7,
        category: 'Mental Health',
      },
      {
        id: 3,
        title: 'Sleep Quality Index',
        description: 'Evaluate your sleep patterns and quality',
        dueDate: '2023-06-20T00:00:00Z',
        estimatedTime: '4 minutes',
        priority: 'low',
        questions: 10,
        category: 'Wellness',
      },
    ];

    const mockCompleted = [
      {
        id: 101,
        title: 'Stress Assessment',
        description: 'Evaluate your current stress levels',
        completedDate: '2023-06-01T14:30:00Z',
        score: 65,
        category: 'Mental Health',
        summary: 'Moderate stress levels detected. Consider implementing stress management techniques.',
        recommendations: [
          'Practice daily mindfulness meditation',
          'Engage in regular physical activity',
          'Maintain a consistent sleep schedule',
        ],
      },
      {
        id: 102,
        title: 'Mood Patterns Analysis',
        description: 'Analysis of your mood patterns over time',
        completedDate: '2023-05-25T10:15:00Z',
        score: 78,
        category: 'Mental Health',
        summary: 'Your mood shows some fluctuation but remains generally positive.',
        recommendations: [
          'Continue tracking daily moods',
          'Note triggers for mood changes',
          'Maintain social connections',
        ],
      },
      {
        id: 103,
        title: 'Social Connection Assessment',
        description: 'Evaluate your social support network',
        completedDate: '2023-05-18T16:45:00Z',
        score: 82,
        category: 'Wellness',
        summary: 'Strong social connections detected. Continue nurturing these relationships.',
        recommendations: [
          'Schedule regular check-ins with close friends/family',
          'Join community activities aligned with your interests',
          'Practice active listening in conversations',
        ],
      },
    ];

    setAssessments(mockUpcoming);
    setCompletedAssessments(mockCompleted);
    setLoading(false);
  }, []);

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return null;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const startAssessment = (id) => {
    // This would normally navigate to the assessment
    console.log(`Starting assessment ${id}`);
    // For demo purposes, we'll just remove it from upcoming and add to completed
    const assessment = assessments.find(a => a.id === id);
    if (assessment) {
      const completed = {
        ...assessment,
        id: 1000 + assessment.id, // Just to make it unique
        completedDate: new Date().toISOString(),
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        summary: 'This is a placeholder summary for the completed assessment.',
        recommendations: [
          'This is a placeholder recommendation',
          'Another placeholder recommendation',
          'Final placeholder recommendation',
        ],
      };
      
      setAssessments(assessments.filter(a => a.id !== id));
      setCompletedAssessments([completed, ...completedAssessments]);
      setActiveTab('completed');
    }
  };

  const renderUpcomingAssessments = () => (
    <div className="space-y-4">
      {assessments.length === 0 ? (
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">All caught up!</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You have no pending assessments at the moment.
            </p>
          </div>
        </Card>
      ) : (
        assessments.map((assessment) => {
          const dueDate = new Date(assessment.dueDate);
          const isOverdue = dueDate < new Date();
          const isDueSoon = !isOverdue && dueDate < new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days
          
          return (
            <Card key={assessment.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium mr-3">{assessment.title}</h3>
                      {getPriorityBadge(assessment.priority)}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {assessment.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm">{assessment.estimatedTime}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm">{assessment.questions} questions</span>
                      </div>
                      <div className="flex items-center">
                        {isOverdue ? (
                          <>
                            <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
                            <span className="text-sm text-red-500">Overdue: {formatDate(assessment.dueDate, 'medium')}</span>
                          </>
                        ) : isDueSoon ? (
                          <>
                            <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                            <span className="text-sm text-yellow-500">Due soon: {formatDate(assessment.dueDate, 'medium')}</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm">Due: {formatDate(assessment.dueDate, 'medium')}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => startAssessment(assessment.id)}>
                    Start
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </div>
  );

  const renderCompletedAssessments = () => (
    <div className="space-y-4">
      {completedAssessments.length === 0 ? (
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No completed assessments</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't completed any assessments yet.
            </p>
            <Button onClick={() => setActiveTab('upcoming')}>
              View Available Assessments
            </Button>
          </div>
        </Card>
      ) : (
        completedAssessments.map((assessment) => (
          <Card key={assessment.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium mb-1">{assessment.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Completed on {formatDate(assessment.completedDate, 'medium')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{assessment.score}</div>
                  <div className="text-sm text-gray-500">Score</div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Score</span>
                  <span>{assessment.score}/100</span>
                </div>
                <Progress
                  value={assessment.score}
                  max={100}
                  className={getScoreColor(assessment.score)}
                />
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Summary</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {assessment.summary}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {assessment.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Assessments</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">
              Upcoming
              {assessments.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {assessments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              {completedAssessments.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {completedAssessments.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-0">
            {renderUpcomingAssessments()}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            {renderCompletedAssessments()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Assessments;