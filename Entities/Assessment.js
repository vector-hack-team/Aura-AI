// Assessment entity class for managing mental health assessments

export class Assessment {
  static async list() {
    // In a real app, this would fetch assessments from an API
    // For demo purposes, we'll return mock data
    
    return [
      {
        id: "assessment-phq9",
        title: "Depression Screening (PHQ-9)",
        description: "Standard screening tool for depression symptoms",
        type: "depression",
        estimated_minutes: 5,
        frequency: "weekly",
        max_score: 27,
        last_completed: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
        last_score: 8,
        questions: [
          {
            id: "phq9-1",
            text: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "phq9-2",
            text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "phq9-3",
            text: "Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "phq9-4",
            text: "Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "phq9-5",
            text: "Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "phq9-6",
            text: "Over the last 2 weeks, how often have you been bothered by feeling bad about yourself — or that you are a failure or have let yourself or your family down?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "phq9-7",
            text: "Over the last 2 weeks, how often have you been bothered by trouble concentrating on things, such as reading the newspaper or watching television?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "phq9-8",
            text: "Over the last 2 weeks, how often have you been bothered by moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "phq9-9",
            text: "Over the last 2 weeks, how often have you been bothered by thoughts that you would be better off dead or of hurting yourself in some way?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          }
        ]
      },
      {
        id: "assessment-gad7",
        title: "Anxiety Screening (GAD-7)",
        description: "Standard screening tool for anxiety symptoms",
        type: "anxiety",
        estimated_minutes: 3,
        frequency: "weekly",
        max_score: 21,
        last_completed: null, // Not completed yet
        questions: [
          {
            id: "gad7-1",
            text: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "gad7-2",
            text: "Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "gad7-3",
            text: "Over the last 2 weeks, how often have you been bothered by worrying too much about different things?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "gad7-4",
            text: "Over the last 2 weeks, how often have you been bothered by trouble relaxing?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "gad7-5",
            text: "Over the last 2 weeks, how often have you been bothered by being so restless that it is hard to sit still?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "gad7-6",
            text: "Over the last 2 weeks, how often have you been bothered by becoming easily annoyed or irritable?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          },
          {
            id: "gad7-7",
            text: "Over the last 2 weeks, how often have you been bothered by feeling afraid as if something awful might happen?",
            options: [
              { text: "Not at all", value: 0 },
              { text: "Several days", value: 1 },
              { text: "More than half the days", value: 2 },
              { text: "Nearly every day", value: 3 }
            ]
          }
        ]
      },
      {
        id: "assessment-wellbeing",
        title: "General Wellbeing Check",
        description: "Quick assessment of your overall mental wellbeing",
        type: "wellbeing",
        estimated_minutes: 2,
        frequency: "monthly",
        max_score: 15,
        last_completed: new Date(Date.now() - 1209600000).toISOString(), // 14 days ago
        last_score: 11,
        questions: [
          {
            id: "wellbeing-1",
            text: "Over the past month, how would you rate your overall mood?",
            options: [
              { text: "Very poor", value: 0 },
              { text: "Poor", value: 1 },
              { text: "Fair", value: 2 },
              { text: "Good", value: 3 },
              { text: "Excellent", value: 4 }
            ]
          },
          {
            id: "wellbeing-2",
            text: "Over the past month, how would you rate your energy levels?",
            options: [
              { text: "Very low", value: 0 },
              { text: "Low", value: 1 },
              { text: "Moderate", value: 2 },
              { text: "High", value: 3 },
              { text: "Very high", value: 4 }
            ]
          },
          {
            id: "wellbeing-3",
            text: "Over the past month, how would you rate your sleep quality?",
            options: [
              { text: "Very poor", value: 0 },
              { text: "Poor", value: 1 },
              { text: "Fair", value: 2 },
              { text: "Good", value: 3 },
              { text: "Excellent", value: 4 }
            ]
          },
          {
            id: "wellbeing-4",
            text: "Over the past month, how would you rate your ability to handle stress?",
            options: [
              { text: "Very poor", value: 0 },
              { text: "Poor", value: 1 },
              { text: "Fair", value: 2 },
              { text: "Good", value: 3 },
              { text: "Excellent", value: 4 }
            ]
          },
          {
            id: "wellbeing-5",
            text: "Over the past month, how would you rate your social connections?",
            options: [
              { text: "Very poor", value: 0 },
              { text: "Poor", value: 1 },
              { text: "Fair", value: 2 },
              { text: "Good", value: 3 },
              { text: "Excellent", value: 4 }
            ]
          }
        ]
      }
    ];
  }

  static async get(id) {
    // In a real app, this would fetch a specific assessment from an API
    const assessments = await this.list();
    return assessments.find(assessment => assessment.id === id) || null;
  }

  static async submit(assessmentId, answers) {
    // In a real app, this would submit assessment answers to an API and get results
    console.log(`Submitting answers for assessment ${assessmentId}:`, answers);
    
    // Calculate mock score based on answers
    const answerValues = Object.values(answers);
    const score = answerValues.reduce((sum, value) => sum + value, 0);
    
    // Get the assessment to determine max score and type
    const assessment = await this.get(assessmentId);
    
    // Generate appropriate recommendations based on assessment type and score
    let recommendations = [];
    const scorePercentage = (score / assessment.max_score) * 100;
    
    if (assessment.type === "depression") {
      if (scorePercentage >= 60) {
        recommendations = [
          "Consider speaking with a mental health professional",
          "Practice daily self-care activities",
          "Maintain a regular sleep schedule",
          "Try to engage in light physical activity",
          "Connect with supportive friends or family"
        ];
      } else if (scorePercentage >= 30) {
        recommendations = [
          "Monitor your mood with daily check-ins",
          "Practice mindfulness meditation",
          "Maintain regular physical activity",
          "Ensure you're getting adequate sleep",
          "Consider speaking with a supportive friend"
        ];
      } else {
        recommendations = [
          "Continue your current self-care practices",
          "Maintain regular physical activity",
          "Practice gratitude journaling",
          "Stay connected with your support network"
        ];
      }
    } else if (assessment.type === "anxiety") {
      if (scorePercentage >= 60) {
        recommendations = [
          "Consider speaking with a mental health professional",
          "Practice deep breathing exercises daily",
          "Try progressive muscle relaxation",
          "Limit caffeine and alcohol",
          "Maintain a regular sleep schedule"
        ];
      } else if (scorePercentage >= 30) {
        recommendations = [
          "Practice mindfulness meditation",
          "Try grounding techniques when feeling anxious",
          "Maintain regular physical activity",
          "Consider limiting news and social media consumption",
          "Ensure you're getting adequate sleep"
        ];
      } else {
        recommendations = [
          "Continue your current self-care practices",
          "Practice regular relaxation techniques",
          "Maintain physical activity",
          "Stay connected with your support network"
        ];
      }
    } else {
      // General wellbeing
      if (scorePercentage >= 80) {
        recommendations = [
          "Continue your current wellness practices",
          "Share your positive strategies with others",
          "Consider setting new personal growth goals",
          "Maintain your supportive relationships"
        ];
      } else if (scorePercentage >= 50) {
        recommendations = [
          "Focus on areas where you scored lower",
          "Practice mindfulness meditation",
          "Ensure regular physical activity",
          "Maintain social connections",
          "Consider speaking with a supportive friend about any concerns"
        ];
      } else {
        recommendations = [
          "Consider speaking with a mental health professional",
          "Focus on basic self-care: sleep, nutrition, and exercise",
          "Practice daily mindfulness or relaxation",
          "Reach out to supportive friends or family",
          "Set small, achievable goals for improvement"
        ];
      }
    }
    
    // Return assessment results
    return {
      assessment_id: assessmentId,
      score,
      max_score: assessment.max_score,
      completion_date: new Date().toISOString(),
      summary: this.generateSummary(assessment.type, scorePercentage),
      recommendations
    };
  }

  static generateSummary(type, scorePercentage) {
    if (type === "depression") {
      if (scorePercentage >= 80) {
        return "Your responses indicate severe depressive symptoms. It's important to speak with a healthcare provider about these feelings.";
      } else if (scorePercentage >= 60) {
        return "Your responses indicate moderate to severe depressive symptoms. Consider reaching out to a mental health professional for support.";
      } else if (scorePercentage >= 40) {
        return "Your responses indicate mild to moderate depressive symptoms. Monitoring these feelings and practicing self-care is recommended.";
      } else {
        return "Your responses indicate minimal depressive symptoms. Continue practicing good self-care.";
      }
    } else if (type === "anxiety") {
      if (scorePercentage >= 80) {
        return "Your responses indicate severe anxiety symptoms. It's important to speak with a healthcare provider about these feelings.";
      } else if (scorePercentage >= 60) {
        return "Your responses indicate moderate to severe anxiety symptoms. Consider reaching out to a mental health professional for support.";
      } else if (scorePercentage >= 40) {
        return "Your responses indicate mild to moderate anxiety symptoms. Monitoring these feelings and practicing self-care is recommended.";
      } else {
        return "Your responses indicate minimal anxiety symptoms. Continue practicing good self-care.";
      }
    } else {
      // General wellbeing
      if (scorePercentage >= 80) {
        return "Your overall wellbeing appears excellent. Continue your positive practices.";
      } else if (scorePercentage >= 60) {
        return "Your overall wellbeing appears good. There may be some areas you could focus on for improvement.";
      } else if (scorePercentage >= 40) {
        return "Your overall wellbeing appears fair. Consider focusing on self-care in the areas where you scored lower.";
      } else {
        return "Your overall wellbeing appears to need attention. Consider speaking with someone about how you're feeling.";
      }
    }
  }
}