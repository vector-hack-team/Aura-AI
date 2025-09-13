import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageSquare, ExternalLink } from "lucide-react";

export function CrisisSupport() {
  const emergencyResources = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "1-800-273-8255",
      description: "24/7, free and confidential support for people in distress",
      chat: "https://suicidepreventionlifeline.org/chat/"
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free 24/7 support with a trained crisis counselor",
      chat: "https://www.crisistextline.org/"
    },
    {
      name: "SAMHSA's National Helpline",
      phone: "1-800-662-4357",
      description: "Treatment referral and information service (24/7)",
      chat: "https://www.samhsa.gov/find-help/national-helpline"
    }
  ];

  return (
    <dialog id="crisis-support-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-3xl bg-white rounded-lg shadow-xl p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
          <CardTitle className="text-2xl font-bold mb-2">Crisis Support</CardTitle>
          <CardDescription className="text-white/90 text-lg">
            If you're experiencing a mental health emergency, please reach out for immediate help
          </CardDescription>
        </div>
        
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-red-100 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Phone className="h-5 w-5" />
                  Emergency Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold text-red-700 mb-2">Call 911</p>
                <p className="text-gray-700">
                  If you or someone you know is in immediate danger of self-harm or suicide, 
                  call emergency services immediately.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Your Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium" id="emergency-contact-name">
                    Loading your emergency contact...
                  </p>
                  <p className="text-lg font-bold" id="emergency-contact-number">
                    Loading...
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" id="call-emergency-contact">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <h3 className="text-lg font-semibold mt-8 mb-4">Crisis Resources</h3>
          
          <div className="space-y-4">
            {emergencyResources.map((resource) => (
              <Card key={resource.name}>
                <CardHeader className="pb-2">
                  <CardTitle>{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-600">{resource.description}</p>
                  <p className="font-bold mt-1">{resource.phone}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href={resource.chat} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="modal-action bg-gray-50 p-4 flex justify-end">
          <form method="dialog">
            <Button variant="outline">Close</Button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default CrisisSupport;