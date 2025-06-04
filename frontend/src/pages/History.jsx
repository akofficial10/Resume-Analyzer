// components/History.jsx
import { useState, useEffect } from "react";
import { getResumes, deleteResume } from "../services/api";

const History = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await getResumes();
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      setResumes(resumes.filter((resume) => resume._id !== id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Resume History</h2>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-20 bg-gray-200 rounded-lg" />
          <div className="h-20 bg-gray-200 rounded-lg" />
          <div className="h-20 bg-gray-200 rounded-lg" />
        </div>
      ) : resumes.length === 0 ? (
        <p className="text-gray-500 text-center">No resumes found.</p>
      ) : (
        <div className="space-y-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-md transition-transform hover:scale-[1.01]"
            >
              <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {resume.filename}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Uploaded on: {new Date(resume.uploadedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(resume._id)}
                  className="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
