import React, { useState } from "react"; 
import { User } from "@/entities/User"; 
import { useNavigate } from "react-router-dom"; 
import { createPageUrl } from "@/utils"; 
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label"; 
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; 
import { Heart, Brain, Calendar, Phone, CheckCircle, ArrowRight } from "lucide-react"; 
import { motion } from "framer-motion"; 


const AI_PERSONAS = [ 
  { 
    id: "aria", 
    name: "Aria", 
    role: "Your Empathetic Friend", 
    description: "Always here to listen, chat, and provide emotional support", 
    color: "from-pink-400 to-rose-500", 
    icon: Heart 
  }, 
  { 
    id: "dr_aegis", 
    name: "Dr. Aegis", 
    role: "Your Clinical Guide", 
    description: "Evidence-based therapy, assessments, and structured support", 
    color: "from-blue-400 to-indigo-500", 
    icon: Brain 
  }, 
  { 
    id: "aiden", 
    name: "Aiden", 
    role: "Your Health Assistant", 
    description: "Medication reminders, appointments, and wellness tracking", 
    color: "from-green-400 to-emerald-500", 
    icon: Calendar 
  } 
]; 


export default function Onboarding() { 
  const navigate = useNavigate(); 
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({ 
    selected_ai_persona: "aria", 
    voice_preference: "female", 
    voice_name: "Aria", 
    emergency_contact: "", 
    emergency_contact_name: "", 
    onboarding_completed: true 
  }); 


  const handlePersonaSelect = (personaId) => { 
    const persona = AI_PERSONAS.find(p => p.id === personaId); 
    setFormData(prev => ({ 
      ...prev, 
      selected_ai_persona: personaId, 
      voice_name: persona.name 
    })); 
  }; 


  const handleComplete = async () => { 
    try { 
      await User.updateMyUserData(formData); 
      navigate(createPageUrl("Dashboard")); 
    } catch (error) { 
      console.error("Error completing onboarding:", error); 
    } 
  }; 


  const renderStep1 = () => ( 
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6" 
    > 
      <div className="text-center mb-8"> 
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"> 
          Welcome to Aura 
        </h1> 
        <p className="text-gray-600 text-lg"> 
          Choose your AI companion to begin your mental health journey 
        </p> 
      </div> 


      <div className="grid gap-4"> 
        {AI_PERSONAS.map((persona) => ( 
          <Card 
            key={persona.id} 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${ 
              formData.selected_ai_persona === persona.id 
                ? "ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-pink-50" 
                : "hover:shadow-md" 
            }`} 
            onClick={() => handlePersonaSelect(persona.id)} 
          > 
            <CardHeader className="flex flex-row items-center space-y-0 space-x-4"> 
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${persona.color} flex items-center justify-center`}> 
                <persona.icon className="w-6 h-6 text-white" /> 
              </div> 
              <div className="flex-1"> 
                <CardTitle className="text-lg">{persona.name}</CardTitle> 
                <p className="text-sm text-gray-500">{persona.role}</p> 
              </div> 
              {formData.selected_ai_persona === persona.id && ( 
                <CheckCircle className="w-6 h-6 text-purple-500" /> 
              )} 
            </CardHeader> 
            <CardContent> 
              <p className="text-gray-600">{persona.description}</p> 
            </CardContent> 
          </Card> 
        ))} 
      </div> 


      <Button 
        onClick={() => setStep(2)} 
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg" 
      > 
        Continue 
        <ArrowRight className="ml-2 w-5 h-5" /> 
      </Button> 
    </motion.div> 
  ); 


  const renderStep2 = () => ( 
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6" 
    > 
      <div className="text-center mb-8"> 
        <h2 className="text-3xl font-bold text-gray-900 mb-4"> 
          Customize Your Experience 
        </h2> 
        <p className="text-gray-600"> 
          Let's personalize how {formData.voice_name} sounds and interacts with you 
        </p> 
      </div> 


      <Card> 
        <CardHeader> 
          <CardTitle>Voice Preference</CardTitle> 
        </CardHeader> 
        <CardContent> 
          <RadioGroup 
            value={formData.voice_preference} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, voice_preference: value }))} 
            className="space-y-3" 
          > 
            <div className="flex items-center space-x-2"> 
              <RadioGroupItem value="female" id="female" /> 
              <Label htmlFor="female">Female Voice - Warm and nurturing</Label> 
            </div> 
            <div className="flex items-center space-x-2"> 
              <RadioGroupItem value="male" id="male" /> 
              <Label htmlFor="male">Male Voice - Calm and supportive</Label> 
            </div> 
            <div className="flex items-center space-x-2"> 
              <RadioGroupItem value="neutral" id="neutral" /> 
              <Label htmlFor="neutral">Neutral Voice - Balanced and soothing</Label> 
            </div> 
          </RadioGroup> 
        </CardContent> 
      </Card>

      <div className="flex gap-4"> 
        <Button 
          variant="outline" 
          onClick={() => setStep(1)} 
          className="flex-1" 
        > 
          Back 
        </Button> 
        <Button 
          onClick={() => setStep(3)} 
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" 
        > 
          Continue 
        </Button> 
      </div> 
    </motion.div> 
  ); 

  const renderStep3 = () => ( 
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-6" 
    > 
      <div className="text-center mb-8"> 
        <h2 className="text-3xl font-bold text-gray-900 mb-4"> 
          Emergency Contact 
        </h2> 
        <p className="text-gray-600"> 
          Optional but recommended for your safety and peace of mind 
        </p> 
      </div> 

      <Card> 
        <CardHeader> 
          <div className="flex items-center gap-2"> 
            <Phone className="w-5 h-5 text-red-500" /> 
            <CardTitle>Emergency Contact Information</CardTitle> 
          </div> 
        </CardHeader> 
        <CardContent className="space-y-4"> 
          <div> 
            <Label htmlFor="contact_name">Contact Name</Label> 
            <Input 
              id="contact_name" 
              placeholder="e.g., Mom, Partner, Best Friend" 
              value={formData.emergency_contact_name} 
              onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_name: e.target.value }))} 
            /> 
          </div> 
          <div> 
            <Label htmlFor="contact_phone">Phone Number</Label> 
            <Input 
              id="contact_phone" 
              placeholder="+1 (555) 123-4567" 
              value={formData.emergency_contact} 
              onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact: e.target.value }))} 
            /> 
          </div> 
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4"> 
            <p className="text-sm text-amber-800"> 
              <strong>Privacy Note:</strong> This information is encrypted and only used in genuine emergencies when you explicitly consent or have pre-authorized emergency protocols. 
            </p> 
          </div> 
        </CardContent> 
      </Card> 

      <div className="flex gap-4"> 
        <Button 
          variant="outline" 
          onClick={() => setStep(2)} 
          className="flex-1" 
        > 
          Back 
        </Button> 
        <Button 
          onClick={handleComplete} 
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" 
        > 
          Complete Setup 
        </Button> 
      </div> 
    </motion.div> 
  ); 

  return ( 
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 p-6"> 
      <div className="max-w-2xl mx-auto py-8"> 
        {/* Progress Indicator */} 
        <div className="flex justify-center mb-8"> 
          <div className="flex items-center space-x-4"> 
            {[1, 2, 3].map((stepNum) => ( 
              <div key={stepNum} className="flex items-center"> 
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${ 
                    step >= stepNum 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                      : "bg-gray-200 text-gray-600" 
                  }`} 
                > 
                  {stepNum} 
                </div> 
                {stepNum < 3 && ( 
                  <div 
                    className={`w-16 h-0.5 mx-2 ${ 
                      step > stepNum ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-200" 
                    }`} 
                  /> 
                )} 
              </div> 
            ))} 
          </div> 
        </div> 

        {step === 1 && renderStep1()} 
        {step === 2 && renderStep2()} 
        {step === 3 && renderStep3()} 
      </div> 
    </div> 
  ); 
}