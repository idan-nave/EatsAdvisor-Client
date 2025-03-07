import axios from 'axios';

// In‑memory storage for the access token
let accessToken = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Request Interceptor: attach access token if available
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Variables to handle token refresh queuing
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: on 401 errors, try refreshing token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue the request if a refresh is already in progress
        try {
              const token = await new Promise((resolve, reject) => {
                  failedQueue.push({ resolve, reject });
              });

              originalRequest.headers.Authorization = `Bearer ${token}`;
              return await api(originalRequest);
              
          } catch (err) {
              return await Promise.reject(err);
          }
      }

      isRefreshing = true;

      // Call the refresh endpoint; note: no payload needed because the refresh token is in an HTTP‑only cookie
      return new Promise((resolve, reject) => {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          )
          .then(({ data }) => {
            // Assume the server returns a new access token in data.accessToken
            setAccessToken(data.accessToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
            processQueue(null, data.accessToken);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            window.location.href = '/login';
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

export default api;