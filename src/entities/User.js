/**
 * User entity class for managing user data and authentication.
 */
export class User {
  /**
   * Get the current logged-in user.
   * @returns {Promise<Object>} The user object.
   */
  static async me() {
    // This would normally be an API call to get the current user
    // For now, we'll return mock data
    return {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/150?u=john@example.com',
      onboardingCompleted: true,
      createdAt: '2023-01-15T08:30:00Z',
    };
  }

  /**
   * Update user data.
   * @param {Object} data - The data to update.
   * @returns {Promise<Object>} The updated user object.
   */
  static async update(data) {
    // This would normally be an API call to update the user
    // For now, we'll return mock data
    return {
      id: '1',
      name: data.name || 'John Doe',
      email: data.email || 'john@example.com',
      avatar: data.avatar || 'https://i.pravatar.cc/150?u=john@example.com',
      onboardingCompleted: data.onboardingCompleted || true,
      createdAt: '2023-01-15T08:30:00Z',
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Mark onboarding as complete for the user.
   * @returns {Promise<Object>} The updated user object.
   */
  static async completeOnboarding() {
    // This would normally be an API call to update the onboarding status
    // For now, we'll return mock data
    return User.update({ onboardingCompleted: true });
  }

  /**
   * Log out the current user.
   * @returns {Promise<void>}
   */
  static async logout() {
    // This would normally be an API call to log out
    // For now, we'll just return a resolved promise
    return Promise.resolve();
  }
}