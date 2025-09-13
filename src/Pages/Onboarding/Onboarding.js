import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../entities/User';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';

const steps = [
  { id: 'welcome', title: 'Welcome to Aura' },
  { id: 'personal-info', title: 'Personal Information' },
  { id: 'preferences', title: 'Preferences' },
  { id: 'complete', title: 'All Set!' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    goals: [],
    preferredTherapyStyle: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalToggle = (goal) => {
    setFormData((prev) => {
      const goals = [...prev.goals];
      if (goals.includes(goal)) {
        return { ...prev, goals: goals.filter((g) => g !== goal) };
      } else {
        return { ...prev, goals: [...goals, goal] };
      }
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      await User.completeOnboarding();
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center">
            <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white text-4xl font-bold">A</div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Aura</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your AI companion for mental wellness. Let's set up your profile to personalize your experience.
            </p>
          </div>
        );

      case 'personal-info':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Tell us about yourself</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Enter your age"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleRadioChange('gender', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non-binary" id="non-binary" />
                  <Label htmlFor="non-binary">Non-binary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                  <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Your Goals</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              What are you hoping to achieve with Aura? Select all that apply.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Reduce anxiety',
                'Improve mood',
                'Better sleep',
                'Manage stress',
                'Build resilience',
                'Daily mindfulness',
                'Track emotions',
                'Professional guidance'
              ].map((goal) => (
                <div
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-3 rounded-md border cursor-pointer transition-colors ${formData.goals.includes(goal) ? 'bg-primary-100 border-primary-500 dark:bg-primary-900 dark:border-primary-400' : 'border-gray-300 dark:border-gray-600'}`}
                >
                  {goal}
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mt-6">
              <Label>Preferred therapy style</Label>
              <RadioGroup
                value={formData.preferredTherapyStyle}
                onValueChange={(value) => handleRadioChange('preferredTherapyStyle', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cognitive" id="cognitive" />
                  <Label htmlFor="cognitive">Cognitive Behavioral</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mindfulness" id="mindfulness" />
                  <Label htmlFor="mindfulness">Mindfulness-Based</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solution" id="solution" />
                  <Label htmlFor="solution">Solution-Focused</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-sure" id="not-sure" />
                  <Label htmlFor="not-sure">Not sure / Let Aura decide</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center">
            <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg className="h-12 w-12 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">You're all set!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for completing your profile. We've personalized Aura based on your preferences.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <div className="p-6">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                  >
                    {index < currentStep ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-primary-500 rounded transition-all duration-300"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step content */}
          <div className="mb-8">
            {renderStep()}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={currentStep === 0 ? 'invisible' : ''}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep < steps.length - 1 ? 'Continue' : 'Get Started'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;