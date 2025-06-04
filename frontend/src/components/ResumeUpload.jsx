import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { uploadResume } from "../services/api";
import { validateFile } from "../utils/fileValidation";
import { motion } from "framer-motion";

const ResumeUpload = ({ setAnalysis, setIsLoading }) => {
  const [file, setFile] = useState(null);
  const [isLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    setIsDragging(false);
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    noClick: true,
    noKeyboard: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      validateFile(file);
      setIsLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await uploadResume(formData);
      setAnalysis(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-6">
      {/* Drag and Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : file
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-gray-400 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <input
          type="file"
          ref={fileInputRef}
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={{
              scale: isDragging ? 1.05 : 1,
              y: isDragging ? -2 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
              <svg
                className={`w-8 h-8 ${
                  isDragging
                    ? "text-blue-500"
                    : file
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </motion.div>

          <div className="space-y-2">
            {file ? (
              <>
                <p className="text-sm font-medium text-gray-700">
                  <span className="text-green-600">{file.name}</span>
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700">
                  {isDragging ? (
                    "Drop your resume here"
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none"
                      >
                        Click to upload
                      </button>{" "}
                      or drag and drop
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-500">PDF only (max 5MB)</p>
              </>
            )}
          </div>

          {file && (
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Remove file
            </button>
          )}
        </div>
      </div>

      {/* Upload Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!file || isLoading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            !file || isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              
              <span>Analyze Resume</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-3 bg-red-50 text-red-700 rounded-lg flex items-start"
        >
          <svg
            className="flex-shrink-0 h-5 w-5 mr-2 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeUpload;
