// Mock Core integration for the Chat component

export const InvokeLLM = async (messages, options = {}) => {
  // This is a mock implementation that simulates an AI response
  console.log('InvokeLLM called with messages:', messages);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return a mock response based on the last message content
  const lastMessage = messages[messages.length - 1];
  
  if (lastMessage.role === 'user') {
    const userMessage = lastMessage.content.toLowerCase();
    
    if (userMessage.includes('hello') || userMessage.includes('hi')) {
      return {
        role: 'assistant',
        content: 'Hello! How are you feeling today? I\'m here to support you.',
      };
    }
    
    if (userMessage.includes('sad') || userMessage.includes('depressed') || userMessage.includes('unhappy')) {
      return {
        role: 'assistant',
        content: 'I\'m sorry to hear you\'re feeling down. Would you like to talk about what\'s bothering you? Remember that it\'s okay to not be okay sometimes, and reaching out is a positive step.',
      };
    }
    
    if (userMessage.includes('anxious') || userMessage.includes('worried') || userMessage.includes('stress')) {
      return {
        role: 'assistant',
        content: 'Anxiety can be really challenging. Have you tried any relaxation techniques like deep breathing or mindfulness? Sometimes taking a few minutes to focus on your breath can help reduce those anxious feelings.',
      };
    }
    
    if (userMessage.includes('help') || userMessage.includes('crisis') || userMessage.includes('suicide')) {
      return {
        role: 'assistant',
        content: 'If you\'re in crisis or having thoughts of self-harm, please reach out to a crisis helpline immediately. They have trained professionals available 24/7 who can provide immediate support. Would you like me to provide some crisis resources?',
        metadata: {
          isCrisis: true
        }
      };
    }
    
    // Default response
    return {
      role: 'assistant',
      content: 'Thank you for sharing. How else can I support you today?',
    };
  }
  
  return {
    role: 'assistant',
    content: 'I\'m here to listen and support you. How are you feeling today?',
  };
};