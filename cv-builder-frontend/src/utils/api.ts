// API configuration for different environments
const getApiUrl = (): string => {
  // In production, use same origin (since backend serves frontend)
  if (process.env.NODE_ENV === 'production') {
    return window.location.origin;
  }
  
  // In development, use environment variable or default
  return process.env.REACT_APP_API_URL || 'http://localhost:8000';
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