export const getApiUrl = (path = '') => {
  const base = import.meta.env.VITE_API_URL || '';
  return `${base}${path}`;
};
