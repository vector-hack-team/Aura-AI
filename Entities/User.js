// User entity class for managing user data and authentication

export class User {
  static async me() {
    // In a real app, this would fetch the current user from an API
    // For demo purposes, we'll return mock data
    return {
      id: "user-123",
      name: "Alex Johnson",
      email: "alex@example.com",
      selected_ai_persona: "aria", // aria, dr_aegis, aiden
      voice_name: "Aria",
      voice_preference: "female",
      onboarding_completed: true,
      emergency_contact: {
        name: "Sam Smith",
        phone: "555-123-4567",
        relationship: "Friend"
      },
      created_at: "2023-05-15T10:30:00Z",
      last_login: "2023-06-01T14:22:10Z"
    };
  }

  static async update(userData) {
    // In a real app, this would update user data via an API
    console.log("Updating user data:", userData);
    
    // Return updated user data
    return {
      ...await User.me(),
      ...userData
    };
  }

  static async completeOnboarding(data) {
    // In a real app, this would mark onboarding as complete and save preferences
    console.log("Completing onboarding with data:", data);
    
    return User.update({
      ...data,
      onboarding_completed: true
    });
  }

  static async logout() {
    // In a real app, this would clear authentication tokens
    console.log("User logged out");
    return true;
  }
}