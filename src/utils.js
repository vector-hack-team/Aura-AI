/**
 * Creates a URL for a page with optional parameters.
 * @param {string} page - The page name.
 * @param {Object} params - Optional parameters to include in the URL.
 * @returns {string} The formatted URL.
 */
export function createPageUrl(page, params = {}) {
  let url = `/${page}`;
  
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value);
    }
  }
  
  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  
  return url;
}

/**
 * Formats a date string into a human-readable format.
 * @param {string} dateString - The date string to format.
 * @param {string} format - The format to use: 'short', 'medium', or 'long'.
 * @returns {string} The formatted date string.
 */
export function formatDate(dateString, format = 'medium') {
  const date = new Date(dateString);
  
  const options = {
    short: { month: 'numeric', day: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  };
  
  return date.toLocaleDateString('en-US', options[format]);
}