# Aura - AI Mental Health Companion

Aura is a mental health companion application that uses AI to provide personalized support, mood tracking, and mental health assessments.

# Submission

-Team Name :vector-hack-team

-Participants: Sharvil Titarmare and Tahereem Khan

-Country/Region: India

-Email for Notifications: tahereemkhan18@gmail.com

-GitHub Repository: (https://github.com/vector-hack-team/Aura-AI)

## Features

- **AI Companions**: Choose from different AI personas tailored to your preferences
- **Mood Tracking**: Log and visualize your mood and energy levels over time
- **Conversations**: Have supportive conversations with your AI companion
- **Assessments**: Take standardized mental health assessments (PHQ-9, GAD-7, etc.)
- **Crisis Support**: Access emergency resources when needed

## Project Structure

```
├── App.js                 # Main application component with routing
├── Layout.js              # Application layout with navigation
├── index.js               # Entry point
├── index.css              # Global styles
├── utils.js               # Utility functions
├── Components/
│   └── CrisisSupport/     # Crisis support modal component
├── Pages/
│   ├── Onboarding/        # User onboarding flow
│   ├── Dashboard/         # Main dashboard
│   ├── Chat/              # Conversation interface
│   ├── MoodTracker/       # Mood tracking and visualization
│   └── Assessments/       # Mental health assessments
└── entities/              # Data models and API interfaces
    ├── User.js            # User entity and authentication
    ├── Conversation.js    # Conversation management
    ├── MoodEntry.js       # Mood tracking data
    └── Assessment.js      # Assessment data and logic
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/aura-mental-health-app.git
   cd aura-mental-health-app
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

**Note:** This repository has been shared with @thierrypdamiba and @kanungle for the hackathon submission.

## Technologies Used

- React.js
- React Router
- Tailwind CSS
- Recharts (for data visualization)
- Lucide React (for icons)

## Development Notes

- This application uses mock data for demonstration purposes
- In a production environment, you would integrate with a backend API
- The AI companion functionality would require integration with an AI service

## License

This project is licensed under the MIT License - see the LICENSE file for details.
