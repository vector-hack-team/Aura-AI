// Conversation entity class for managing chat conversations with AI personas

export class Conversation {
  static async list(orderBy = "-created_date", limit = 10) {
    // In a real app, this would fetch conversations from an API
    // For demo purposes, we'll return mock data
    
    const conversations = [
      {
        id: "conv-1",
        title: "Morning Check-in",
        ai_persona: "aria",
        created_date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        last_message_date: new Date(Date.now() - 86400000).toISOString(),
        message_count: 8,
        preview: "I'm feeling much better today after our talk yesterday."
      },
      {
        id: "conv-2",
        title: "Anxiety Management",
        ai_persona: "dr_aegis",
        created_date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        last_message_date: new Date(Date.now() - 172800000).toISOString(),
        message_count: 12,
        preview: "Let's practice that breathing technique we discussed."
      },
      {
        id: "conv-3",
        title: "Weekend Plans",
        ai_persona: "aiden",
        created_date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        last_message_date: new Date(Date.now() - 345600000).toISOString(),
        message_count: 5,
        preview: "Have you thought about trying that new mindfulness activity?"
      }
    ];
    
    // Sort conversations based on orderBy parameter
    if (orderBy === "-created_date") {
      conversations.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    } else if (orderBy === "created_date") {
      conversations.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
    } else if (orderBy === "-last_message_date") {
      conversations.sort((a, b) => new Date(b.last_message_date) - new Date(a.last_message_date));
    } else if (orderBy === "last_message_date") {
      conversations.sort((a, b) => new Date(a.last_message_date) - new Date(b.last_message_date));
    }
    
    // Limit the number of conversations returned
    return conversations.slice(0, limit);
  }

  static async get(id) {
    // In a real app, this would fetch a specific conversation from an API
    // For demo purposes, we'll return mock data with messages
    
    const mockMessages = [
      {
        id: "msg-1",
        content: "Hi there! How are you feeling today?",
        sender: "ai",
        timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
      },
      {
        id: "msg-2",
        content: "I'm feeling a bit anxious about my presentation tomorrow.",
        sender: "user",
        timestamp: new Date(Date.now() - 3540000).toISOString() // 59 minutes ago
      },
      {
        id: "msg-3",
        content: "That's understandable. Presentations can be stressful. Would you like to talk about what's making you anxious specifically?",
        sender: "ai",
        timestamp: new Date(Date.now() - 3480000).toISOString() // 58 minutes ago
      },
      {
        id: "msg-4",
        content: "I'm worried I'll forget what to say or that people will judge my work harshly.",
        sender: "user",
        timestamp: new Date(Date.now() - 3420000).toISOString() // 57 minutes ago
      },
      {
        id: "msg-5",
        content: "Those are common concerns. Let's work through some strategies that might help. First, have you practiced your presentation out loud?",
        sender: "ai",
        timestamp: new Date(Date.now() - 3360000).toISOString() // 56 minutes ago
      }
    ];
    
    return {
      id,
      title: id === "conv-1" ? "Morning Check-in" : 
             id === "conv-2" ? "Anxiety Management" : 
             id === "conv-3" ? "Weekend Plans" : "New Conversation",
      ai_persona: id === "conv-1" ? "aria" : 
                  id === "conv-2" ? "dr_aegis" : 
                  id === "conv-3" ? "aiden" : "aria",
      created_date: new Date(Date.now() - 86400000).toISOString(),
      last_message_date: new Date(Date.now() - 3360000).toISOString(),
      message_count: mockMessages.length,
      messages: mockMessages
    };
  }

  static async create(data) {
    // In a real app, this would create a new conversation via an API
    console.log("Creating conversation:", data);
    
    // Return the created conversation with an ID
    return {
      id: `conv-${Date.now()}`,
      ...data,
      created_date: new Date().toISOString(),
      last_message_date: new Date().toISOString(),
      message_count: 0,
      messages: []
    };
  }

  static async sendMessage(conversationId, content) {
    // In a real app, this would send a message to the AI and get a response
    console.log(`Sending message to conversation ${conversationId}:`, content);
    
    // Simulate AI response based on message content
    let aiResponse = "";
    
    if (content.toLowerCase().includes("anxious") || content.toLowerCase().includes("anxiety")) {
      aiResponse = "It sounds like you're experiencing some anxiety. Remember to take deep breaths and focus on what you can control. Would you like to try a quick grounding exercise together?";
    } else if (content.toLowerCase().includes("sad") || content.toLowerCase().includes("depressed")) {
      aiResponse = "I'm sorry to hear you're feeling down. Remember that it's okay to have these feelings, and they won't last forever. Is there something specific that triggered these emotions?";
    } else if (content.toLowerCase().includes("happy") || content.toLowerCase().includes("good")) {
      aiResponse = "I'm glad to hear you're feeling positive! What's contributing to your good mood today?";
    } else if (content.toLowerCase().includes("help")) {
      aiResponse = "I'm here to support you. Could you tell me more about what you need help with so I can better assist you?";
    } else {
      aiResponse = "Thank you for sharing that with me. How does that make you feel?";
    }
    
    // Return the AI response
    return {
      id: `msg-${Date.now()}`,
      content: aiResponse,
      sender: "ai",
      timestamp: new Date().toISOString()
    };
  }

  static async delete(id) {
    // In a real app, this would delete a conversation via an API
    console.log(`Deleting conversation ${id}`);
    return true;
  }
}