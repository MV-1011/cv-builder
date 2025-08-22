// API configuration for different environments
const getApiUrl = (): string => {
  // Always use the environment variable if it's set
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiUrl();

// Helper function for API calls
export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  
  return response;
};