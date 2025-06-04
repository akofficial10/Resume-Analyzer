import axios from "axios";

const api = axios.create({
  baseURL: window.location.hostname === 'localhost' 
    ? "http://localhost:5000/api/resumes" 
    : "https://resume-analyzer-yegi.onrender.com/api/resumes"
});

export const uploadResume = (formData) =>
  api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getResumes = () => api.get("/");
export const deleteResume = (id) => api.delete(`/${id}`);
