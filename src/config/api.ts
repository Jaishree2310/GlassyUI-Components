/**
 * Backend API base URL. Set REACT_APP_API_URL in .env (see .env.example).
 * Defaults to local Express server for development.
 */
export const API_BASE_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

export const apiUrl = (path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
};
