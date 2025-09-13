import React, { useState, useEffect } from "react";
import { Assessment } from "@/entities/Assessment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Brain, 
  Heart, 
  FileText, 
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { format } from "date-fns";

const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless", 
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
];

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen"
];

const RESPONSE_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" }
];

const getSeverityLevel = (score, type) => {
  if (type === "phq9") {
    if (score <= 4) return { level: "minimal", color: "bg-green-100 text-green-800" };
    if (score <= 9) return { level: "mild", color: "bg-yellow-100 text-yellow-800" };
    if (score <= 14) return { level: "moderate", color: "bg-orange-100 text-orange-800" };
    if (score <= 19) return { level: "moderately_severe", color: "bg-red-100 text-red-800" };
    return { level: "severe", color: "bg-red-200 text-red-900" };
  }
  
  if (type === "gad7") {
    if (score <= 4) return { level: "minimal", color: "bg-green-100 text-green-800" };
    if (score <= 9) return { level: "mild", color: "bg-yellow-100 text-yellow-800" };
    if (score <= 14) return { level: "moderate", color: "bg-orange-100 text-orange-800" };
    return { level: "severe", color: "bg-red-100 text-red-800" };
  }
};

const getRecommendations = (score, type) => {
  const severity = getSeverityLevel(score, type);
  
  const recommendations = {
    minimal: [
      "Continue with current self-care practices",
      "Maintain regular exercise and good sleep habits",
      "Consider mindfulness or meditation practices"
    ],
    mild: [
      "Consider speaking with a counselor or therapist", 
      "Practice stress management techniques",
      "Maintain social connections and support systems",
      "Regular exercise and healthy lifestyle habits"
    ],
    moderate: [
      "Consider professional therapy or counseling",
      "Speak with your healthcare provider",
      "Implement structured stress management",
      "Consider support groups"
    ],
    moderately_severe: [
      "Seek professional mental health treatment",
      "Contact your healthcare provider soon",
      "Consider therapy and possibly medication",
      "Ensure you have crisis support contacts"
    ],
    severe: [
      "Seek immediate professional help",
      "Contact your healthcare provider or therapist immediately",
      "Consider crisis intervention resources",
      "Ensure you have someone to support you"
    ]
  };
  
  return recommendations[severity.level] || [];
};

export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const data = await Assessment.list("-created_date", 20);
      setAssessments(data);
    } catch (error) {
      console.error("Error loading assessments:", error);
    }
  };

  const startAssessment = (type) => {
    setActiveAssessment(type);
    setCurrentQuestion(0);
    setResponses({});
    setIsCompleted(false);
    setResult(null);
  };

  const handleResponse = (questionIndex, value) => {
    setResponses(prev => ({
      ...prev,
      [questionIndex]: parseInt(value)
    }));
  };

  const nextQuestion = () => {
    const questions = activeAssessment === "phq9" ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeAssessment();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeAssessment = async () => {
    const questions = activeAssessment === "phq9" ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
    const totalScore = Object.values(responses).reduce((sum, score) => sum + score, 0);
    const severity = getSeverityLevel(totalScore, activeAssessment);
    const recommendations = getRecommendations(totalScore, activeAssessment);

    const assessmentData = {
      assessment_type: activeAssessment,
      responses: questions.map((question, index) => ({
        question,
        answer: responses[index] || 0
      })),
      total_score: totalScore,
      severity_level: severity.level,
      recommendations: recommendations
    };

    try {
      await Assessment.create(assessmentData);
      setResult({ ...assessmentData, ...severity });
      setIsCompleted(true);
      await loadAssessments();
    } catch (error) {
      console.error("Error saving assessment:", error);
    }
  };

  const resetAssessment = () => {
    setActiveAssessment(null);
    setCurrentQuestion(0);
    setResponses({});
    setIsCompleted(false);
    setResult(null);
  };

  const getAssessmentInfo = (type) => {
    const info = {
      phq9: {
        name: "PHQ-9 Depression Screen",
        description: "Patient Health Questionnaire for depression screening",
        icon: Heart,
        color: "from-blue-400 to-indigo-500"
      },
      gad7: {
        name: "GAD-7 Anxiety Screen", 
        description: "Generalized Anxiety Disorder 7-item scale",
        icon: Brain,
        color: "from-purple-400 to-pink-500"
      }
    };
    return info[type];
  };

  const renderAssessmentSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Clinical Assessments</h1>
        <p className="text-gray-600 text-lg">
          Evidence-based screening tools to help understand your mental health
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {["phq9", "gad7"].map((type) => {
          const info = getAssessmentInfo(type);
          const latestAssessment = assessments.find(a => a.assessment_type === type);
          
          return (
            <Card key={type} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{info.name}</CardTitle>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {latestAssessment && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Last taken:</span>
                      <span className="text-sm text-gray-600">
                        {format(new Date(latestAssessment.created_date), "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Score: {latestAssessment.total_score}</span>
                      <Badge className={getSeverityLevel(latestAssessment.total_score, type).color}>
                        {latestAssessment.severity_level.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                )}
                <Button
                  onClick={() => startAssessment(type)}
                  className={`w-full bg-gradient-to-r ${info.color} hover:opacity-90 text-white`}
                >
                  {latestAssessment ? "Retake Assessment" : "Start Assessment"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Assessments */}
      {assessments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Assessment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessments.slice(0, 5).map((assessment) => {
                const info = getAssessmentInfo(assessment.assessment_type);
                const severity = getSeverityLevel(assessment.total_score, assessment.assessment_type);
                
                return (
                  <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <info.icon className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">{info.name}</p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(assessment.created_date), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Score: {assessment.total_score}</p>
                      <Badge className={severity.color + " text-xs"}>
                        {assessment.severity_level.replace('_', ' ')}
                      </Badge>
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

  const renderAssessmentQuestion = () => {
    const questions = activeAssessment === "phq9" ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
    const info = getAssessmentInfo(activeAssessment);
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center`}>
            <info.icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{info.name}</h2>
          <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        <Progress value={progress} className="w-full" />

        <Card>
          <CardContent className="p-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Over the last 2 weeks, how often have you been bothered by:
              </h3>
              
              <p className="text-xl text-gray-800 font-medium">
                {questions[currentQuestion]}
              </p>

              <RadioGroup 
                value={responses[currentQuestion]?.toString() || ""} 
                onValueChange={(value) => handleResponse(currentQuestion, value)}
              >
                {RESPONSE_OPTIONS.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                    <Label htmlFor={`option-${option.value}`} className="text-base cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            onClick={nextQuestion}
            disabled={responses[currentQuestion] === undefined}
            className={`bg-gradient-to-r ${info.color} hover:opacity-90 text-white flex items-center gap-2`}
          >
            {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const info = getAssessmentInfo(activeAssessment);
    const severityIcon = result.level === 'minimal' || result.level === 'mild' ? CheckCircle : AlertTriangle;
    
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center`}>
            <info.icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete</h2>
          <p className="text-gray-600">Your {info.name.toLowerCase()} results</p>
        </div>

        <Card className="border-2">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${result.color} mb-4`}>
                <span className="text-2xl font-bold">{result.total_score}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 capitalize mb-2">
                {result.level.replace('_', ' ')} Level
              </h3>
              <Badge className={result.color}>
                {result.level.replace('_', ' ')}
              </Badge>
            </div>

            <div className="text-left">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <severityIcon className="w-5 h-5" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {(result.level === 'severe' || result.level === 'moderately_severe') && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Important Notice</span>
                </div>
                <p className="text-sm text-red-700">
                  These results suggest you may benefit from professional support. 
                  Please consider reaching out to a mental health professional or your healthcare provider.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={resetAssessment} className="flex-1">
            Back to Assessments
          </Button>
          <Button 
            onClick={() => startAssessment(activeAssessment === 'phq9' ? 'gad7' : 'phq9')}
            className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
          >
            Take Other Assessment
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {!activeAssessment && renderAssessmentSelection()}
      {activeAssessment && !isCompleted && renderAssessmentQuestion()}
      {isCompleted && renderResults()}
    </div>
  );
}