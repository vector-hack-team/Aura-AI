// Utility functions for the application

/**
 * Creates a URL for a page in the application
 * @param {string} pageName - The name of the page
 * @param {Object} params - Optional parameters to include in the URL
 * @returns {string} The URL for the page
 */
export function createPageUrl(pageName, params = {}) {
  // In a real app with routing, this would create the appropriate URL
  // For demo purposes, we'll just return a simple path
  let url = `/${pageName.toLowerCase()}`;
  
  // Add parameters if provided
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  
  return url;
}

/**
 * Formats a date string to a human-readable format
 * @param {string} dateString - The date string to format
 * @param {string} format - The format to use (short, medium, long)
 * @returns {string} The formatted date string
 */
export function formatDate(dateString, format = 'medium') {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString();
    case 'long':
      return date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'time':
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    case 'datetime':
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    case 'medium':
    default:
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
  }
}

/**
 * Truncates a string to a specified length and adds ellipsis if needed
 * @param {string} str - The string to truncate
 * @param {number} maxLength - The maximum length of the string
 * @returns {string} The truncated string
 */
export function truncateString(str, maxLength = 100) {
  if (!str || str.length <= maxLength) {
    return str;
  }
  
  return `${str.substring(0, maxLength)}...`;
}

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} The debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Gets a color based on a value between 0 and 10
 * @param {number} value - The value between 0 and 10
 * @returns {string} The color as a tailwind class
 */
export function getMoodColor(value) {
  if (value >= 8) return 'bg-green-500';
  if (value >= 6) return 'bg-blue-500';
  if (value >= 4) return 'bg-yellow-500';
  if (value >= 2) return 'bg-orange-500';
  return 'bg-red-500';
}

/**
 * Gets a greeting based on the time of day
 * @returns {string} The greeting
 */
export function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}