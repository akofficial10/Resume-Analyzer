import React, { useState } from "react";
import axios from "axios";

const ResumeAnalyzer = () => {
  const [requirements, setRequirements] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("upload"); // 'upload' or 'paste'

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const extractTextFromResume = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/api/extract-text", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setResumeText(response.data.text);
        return response.data.text;
      } catch (err) {
        setError("Failed to extract text from resume");
        return "";
      }
    }
    return resumeText;
  };

  const handleAnalyze = async () => {
    if ((!file && !resumeText) || !requirements) {
      setError("Please provide both resume and requirements");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      let textToAnalyze = resumeText;
      if (file) {
        textToAnalyze = await extractTextFromResume();
      }

      const response = await axios.post("/api/analyze-resume", {
        resumeText: textToAnalyze,
        requirements,
      });

      setAnalysis(response.data);
    } catch (err) {
      setError("Analysis failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-4xl">
            Resume Analyzer
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Get instant feedback on how well your resume matches job
            requirements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Requirements Section */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Job Requirements
            </h2>
            <textarea
              className="w-full h-72 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Paste the job description or key requirements here..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </div>

          {/* Resume Section */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Your Resume
            </h2>

            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                  activeTab === "upload"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("upload")}
              >
                Upload File
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm focus:outline-none ${
                  activeTab === "paste"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("paste")}
              >
                Paste Text
              </button>
            </div>

            {activeTab === "upload" ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, or DOCX (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {file && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <span className="text-sm font-medium text-gray-700">
                        {file.name}
                      </span>
                    </div>
                    <button
                      onClick={() => setFile(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <textarea
                className="w-full h-72 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Paste your resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="text-center mb-10">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className={`px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
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
                <span>Analyzing...</span>
              </div>
            ) : (
              "Analyze Resume"
            )}
          </button>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 mb-10 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {analysis && (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Analysis Results
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Here's how your resume matches with the job requirements
              </p>
            </div>

            <div className="flex justify-center mb-12">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-blue-600"
                    strokeWidth="8"
                    strokeDasharray={`${analysis.matchScore * 2.51}, 251`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-800">
                    {analysis.matchScore}%
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-green-100 mr-3">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Matching Skills
                  </h3>
                </div>
                <ul className="space-y-3">
                  {analysis.matchingSkills.map((skill, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-white p-3 rounded-lg shadow-sm"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-yellow-100 mr-3">
                    <svg
                      className="w-5 h-5 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Missing Skills
                  </h3>
                </div>
                {analysis.missingSkills.length > 0 ? (
                  <ul className="space-y-3">
                    {analysis.missingSkills.map((skill, index) => (
                      <li
                        key={index}
                        className="flex items-center bg-white p-3 rounded-lg shadow-sm"
                      >
                        <svg
                          className="w-4 h-4 text-yellow-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          ></path>
                        </svg>
                        <span className="text-gray-700">{skill}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-gray-600">
                      No missing skills found! Great job!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Keyword Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Common Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordInsights.commonKeywords.map(
                        (keyword, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {keyword}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Missing Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordInsights.missingKeywords.map(
                        (keyword, index) => (
                          <span
                            key={index}
                            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                          >
                            {keyword}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Detailed Feedback
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Achievements vs Responsibilities
                    </h4>
                    <p className="text-gray-600">
                      {analysis.achievementVsResponsibility}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      ATS Compatibility
                    </h4>
                    <p className="text-gray-600">{analysis.atsCompatibility}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Tone and Clarity
                    </h4>
                    <p className="text-gray-600">
                      {analysis.toneClarityFeedback}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Structure Feedback
                    </h4>
                    <p className="text-gray-600">
                      {analysis.structureFeedback}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Format Suggestions
                    </h4>
                    <p className="text-gray-600">
                      {analysis.formatSuggestions}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Personalization Tips
                    </h4>
                    <p className="text-gray-600">
                      {analysis.personalizationTips}
                    </p>
                  </div>
                </div>
              </div>

              {analysis.finalRecommendations.length > 0 && (
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-full bg-green-100 mr-3">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Final Recommendations
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {analysis.finalRecommendations.map(
                      (recommendation, index) => (
                        <li
                          key={index}
                          className="flex items-start bg-white p-4 rounded-lg shadow-sm"
                        >
                          <span className="flex-shrink-0 text-green-500 mr-3 mt-0.5">
                            •
                          </span>
                          <span className="text-gray-700">
                            {recommendation}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
