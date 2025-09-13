import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '../../components/ui/alert';
import { Send, AlertTriangle, Info, Bot } from 'lucide-react';
import { InvokeLLM } from '../../integrations/Core';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Hi there! I\'m Aura, your mental health companion. How are you feeling today?',
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Check for crisis keywords
      const crisisKeywords = ['suicide', 'kill myself', 'end my life', 'want to die', 'harm myself'];
      const hasCrisisKeywords = crisisKeywords.some(keyword => 
        input.toLowerCase().includes(keyword.toLowerCase())
      );

      if (hasCrisisKeywords) {
        setShowCrisisAlert(true);
      }

      // Send message to AI
      const response = await InvokeLLM.sendMessage(input);

      // Add AI response
      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            {showCrisisAlert && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <AlertTitle>Crisis Support</AlertTitle>
                <AlertDescription>
                  It sounds like you might be in crisis. Please consider reaching out to a crisis helpline for immediate support.
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-destructive underline" 
                    onClick={() => setActiveTab('resources')}
                  >
                    View crisis resources
                  </Button>
                </AlertDescription>
              </Alert>
            )}
            
            <Card className="flex-1 overflow-hidden">
              <div className="flex flex-col h-[calc(100vh-16rem)]">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user'
                          ? 'bg-primary-500 text-white'
                          : message.isError
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                      >
                        <div className="flex items-start">
                          {message.role === 'assistant' && (
                            <Bot className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1 text-right">
                              {formatTimestamp(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Crisis Resources</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    If you're experiencing a mental health crisis, please reach out to one of these resources for immediate support:
                  </p>
                  
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <AlertTitle>National Suicide Prevention Lifeline</AlertTitle>
                      <AlertDescription>
                        <p>Call: <a href="tel:988" className="text-primary-600 dark:text-primary-400 font-medium">988</a> or <a href="tel:1-800-273-8255" className="text-primary-600 dark:text-primary-400 font-medium">1-800-273-8255</a></p>
                        <p>Available 24/7 for emotional support and crisis intervention.</p>
                      </AlertDescription>
                    </Alert>
                    
                    <Alert>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <AlertTitle>Crisis Text Line</AlertTitle>
                      <AlertDescription>
                        <p>Text HOME to <span className="text-primary-600 dark:text-primary-400 font-medium">741741</span></p>
                        <p>Connect with a Crisis Counselor for free 24/7 support.</p>
                      </AlertDescription>
                    </Alert>
                    
                    <Alert>
                      <Info className="h-4 w-4 mr-2" />
                      <AlertTitle>Emergency Services</AlertTitle>
                      <AlertDescription>
                        <p>If you're in immediate danger, please call <a href="tel:911" className="text-primary-600 dark:text-primary-400 font-medium">911</a> or go to your nearest emergency room.</p>
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold mb-2">Additional Support</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <a href="https://www.nami.org/help" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                        National Alliance on Mental Illness (NAMI) Helpline
                      </a>
                    </li>
                    <li>
                      <a href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                        SAMHSA's National Helpline
                      </a>
                    </li>
                    <li>
                      <a href="https://www.thetrevorproject.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                        The Trevor Project (LGBTQ+ Youth)
                      </a>
                    </li>
                  </ul>
                </div>
                
                <Button onClick={() => setActiveTab('chat')} className="w-full">
                  Return to Chat
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Chat;