// MoodEntry entity class for tracking user mood data

export class MoodEntry {
  static async list(orderBy = "-created_date", limit = 30) {
    // In a real app, this would fetch mood entries from an API
    // For demo purposes, we'll return mock data
    
    // Generate some mock mood entries for the past 30 days
    const entries = [];
    const today = new Date();
    
    for (let i = 0; i < 25; i++) { // Only generate entries for some days (not all 30)
      const date = new Date();
      date.setDate(today.getDate() - Math.floor(Math.random() * 30)); // Random day in the last 30 days
      
      // Ensure we don't have duplicate dates
      if (entries.some(entry => 
        new Date(entry.created_date).toDateString() === date.toDateString()
      )) {
        continue;
      }
      
      entries.push({
        id: `mood-${i}`,
        mood_score: Math.floor(Math.random() * 10) + 1, // 1-10
        energy_level: Math.floor(Math.random() * 10) + 1, // 1-10
        notes: i % 5 === 0 ? "Feeling good today!" : 
               i % 5 === 1 ? "Stressed about work deadline" :
               i % 5 === 2 ? "Had a great conversation with a friend" :
               i % 5 === 3 ? "Feeling tired and low energy" : "",
        created_date: date.toISOString(),
        updated_date: date.toISOString()
      });
    }
    
    // Sort entries based on orderBy parameter
    if (orderBy === "-created_date") {
      entries.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    } else if (orderBy === "created_date") {
      entries.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
    }
    
    // Limit the number of entries returned
    return entries.slice(0, limit);
  }

  static async get(id) {
    // In a real app, this would fetch a specific mood entry from an API
    // For demo purposes, we'll return mock data
    return {
      id,
      mood_score: 7,
      energy_level: 6,
      notes: "Feeling pretty good today. Had a productive morning.",
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString()
    };
  }

  static async create(data) {
    // In a real app, this would create a new mood entry via an API
    console.log("Creating mood entry:", data);
    
    // Return the created entry with an ID
    return {
      id: `mood-${Date.now()}`,
      ...data,
      updated_date: new Date().toISOString()
    };
  }

  static async update(id, data) {
    // In a real app, this would update a mood entry via an API
    console.log(`Updating mood entry ${id}:`, data);
    
    // Return the updated entry
    return {
      id,
      ...data,
      updated_date: new Date().toISOString()
    };
  }

  static async delete(id) {
    // In a real app, this would delete a mood entry via an API
    console.log(`Deleting mood entry ${id}`);
    return true;
  }
}