import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/resumes",
});

export const uploadResume = (formData) =>
  api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getResumes = () => api.get("/");
export const deleteResume = (id) => api.delete(`/${id}`);
