import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080', // Backend URL
  withCredentials: true, // Ensure cookies/tokens are included
  headers: {
    'Content-Type': 'application/json',
  },
})

// Debug logs for outgoing requests
api.interceptors.request.use((request) => {
  console.log("API Request:", request);
  return request;
});

export const uploadMenu = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/api/menu/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export default api;