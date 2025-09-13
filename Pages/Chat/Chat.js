import React, { useState, useEffect, useRef } from "react";
import { User } from "@/entities/User";
import { Conversation } from "@/entities/Conversation";
import { useParams, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Mic, PlusCircle, Image, Paperclip, MoreVertical } from "lucide-react";

export default function Chat() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatData();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatData = async () => {
    try {
      setIsLoading(true);
      const currentUser = await User.me();
      setUser(currentUser);

      // Check if onboarding is complete
      if (!currentUser.onboarding_completed) {
        navigate(createPageUrl("Onboarding"));
        return;
      }

      if (conversationId) {
        // Load existing conversation
        const conversationData = await Conversation.get(conversationId);
        setConversation(conversationData);
        setMessages(conversationData.messages || []);
      } else {
        // Create a new conversation
        const newConversation = await Conversation.create({
          title: `Conversation with ${currentUser.voice_name}`,
          ai_persona: currentUser.selected_ai_persona,
        });
        setConversation(newConversation);
        // Add welcome message
        const welcomeMessage = {
          id: "welcome",
          content: `Hi ${currentUser.name || "there"}, I'm ${currentUser.voice_name}. How can I support you today?`,
          sender: "ai",
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error("Error loading chat data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      content: newMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    // Add user message to UI immediately
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    try {
      // Send message to API
      const response = await Conversation.sendMessage(conversation.id, userMessage.content);

      // Add AI response
      const aiMessage = {
        id: response.id || `ai-${Date.now()}`,
        content: response.content,
        sender: "ai",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Show error in chat
      const errorMessage = {
        id: `error-${Date.now()}`,
        content: "Sorry, I couldn't process your message. Please try again.",
        sender: "system",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPersonaInfo = (persona) => {
    const personas = {
      aria: { name: "Aria", color: "from-pink-400 to-rose-500" },
      dr_aegis: { name: "Dr. Aegis", color: "from-blue-400 to-indigo-500" },
      aiden: { name: "Aiden", color: "from-green-400 to-emerald-500" },
    };
    return personas[persona] || personas.aria;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-4"></div>
          <p>Loading conversation...</p>
        </div>
      </div>
    );
  }

  const selectedPersona = user ? getPersonaInfo(user.selected_ai_persona) : getPersonaInfo("aria");

  return (
    <div className="flex flex-col h-screen pt-0 lg:pt-0">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${selectedPersona.color} flex items-center justify-center text-white mr-3`}>
            {selectedPersona.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{selectedPersona.name}</h2>
            <p className="text-sm text-gray-500">AI Mental Health Companion</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${message.sender === "user"
                  ? "bg-purple-600 text-white rounded-br-none"
                  : message.sender === "system"
                    ? "bg-yellow-100 text-gray-800"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                  }`}
              >
                <p>{message.content}</p>
                <div
                  className={`text-xs mt-1 ${message.sender === "user" ? "text-purple-200" : "text-gray-500"}`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 rounded-bl-none max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <PlusCircle className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="pr-20 py-6 text-base"
                multiline
              />
              <div className="absolute right-2 bottom-2 flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              className="bg-purple-600 hover:bg-purple-700 h-10 w-10 rounded-full flex-shrink-0 p-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}