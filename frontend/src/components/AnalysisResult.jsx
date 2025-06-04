import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiDownload,
  FiPrinter,
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const AnalysisResult = ({ analysis }) => {
  const [expandedSections, setExpandedSections] = useState({
    strengths: true,
    improvements: true,
    suggestions: true,
    details: false,
  });
  const [copied, setCopied] = useState(false);

  // Parse the GPT response into structured data
  const parseAnalysis = (text) => {
    const sections = {
      strengths: [],
      improvements: [],
      score: null,
      fit: null,
      suggestions: [],
      summary: "",
      technicalSkills: [],
      softSkills: [],
      educationAnalysis: "",
      experienceAnalysis: "",
      keywords: [],
      missingKeywords: [],
      atsOptimization: [],
      additionalTips: [],
    };

    // Extract summary if available
    const summaryMatch = text.match(
      /Executive Summary:(.*?)(?=Key Strengths:|Strengths:)/s
    );
    sections.summary = summaryMatch
      ? summaryMatch[1].trim().replace(/^###\s*/, "")
      : "";

    // Extract strengths
    text
      .split(/Strengths:|Key Strengths:/)[1]
      ?.split(/Areas for Improvement:|Improvements:/)[0]
      ?.split("\n")
      .filter((line) => line.trim().startsWith("- "))
      .forEach((line) =>
        sections.strengths.push(line.replace("- ", "").trim())
      );

    // Extract improvements
    text
      .split(/Areas for Improvement:|Improvements:/)[1]
      ?.split(/Resume Score:|Suggestions:|Recommendations:/)[0]
      ?.split("\n")
      .filter((line) => line.trim().startsWith("- "))
      .forEach((line) =>
        sections.improvements.push(line.replace("- ", "").trim())
      );

    // Extract score
    const scoreMatch = text.match(/Resume Score: (\d+)\/100/);
    sections.score = scoreMatch ? parseInt(scoreMatch[1]) : null;

    // Extract job fit
    const fitMatch = text.match(/Job Role Fit: (\d+)%/);
    sections.fit = fitMatch ? parseInt(fitMatch[1]) : null;

    // Extract suggestions
    text
      .split(/Suggestions for Improvement:|Recommendations:|Suggestions:/)[1]
      ?.split("\n")
      .filter((line) => line.trim().startsWith("- "))
      .forEach((line) =>
        sections.suggestions.push(line.replace("- ", "").trim())
      );

    // Extract technical skills
    const techSkillsMatch = text.match(
      /Technical Skills Analysis:(.*?)(?=Soft Skills Analysis:)/s
    );
    if (techSkillsMatch) {
      techSkillsMatch[0]
        .split("\n")
        .filter((line) => line.trim().startsWith("- "))
        .forEach((line) =>
          sections.technicalSkills.push(line.replace("- ", "").trim())
        );
    }

    // Extract soft skills
    const softSkillsMatch = text.match(
      /Soft Skills Analysis:(.*?)(?=Education Analysis:)/s
    );
    if (softSkillsMatch) {
      softSkillsMatch[0]
        .split("\n")
        .filter((line) => line.trim().startsWith("- "))
        .forEach((line) =>
          sections.softSkills.push(line.replace("- ", "").trim())
        );
    }

    // Extract education analysis
    const educationMatch = text.match(
      /Education Analysis:(.*?)(?=Experience Analysis:)/s
    );
    sections.educationAnalysis = educationMatch ? educationMatch[1].trim() : "";

    // Extract experience analysis
    const experienceMatch = text.match(
      /Experience Analysis:(.*?)(?=Keywords:)/s
    );
    sections.experienceAnalysis = experienceMatch
      ? experienceMatch[1].trim()
      : "";

    // Extract keywords
    const keywordsMatch = text.match(/Keywords:(.*?)(?=Missing Keywords:)/s);
    if (keywordsMatch) {
      keywordsMatch[0]
        .split("\n")
        .filter((line) => line.trim().startsWith("- "))
        .forEach((line) =>
          sections.keywords.push(line.replace("- ", "").trim())
        );
    }

    // Extract missing keywords
    const missingKeywordsMatch = text.match(
      /Missing Keywords:(.*?)(?=ATS Optimization:)/s
    );
    if (missingKeywordsMatch) {
      missingKeywordsMatch[0]
        .split("\n")
        .filter((line) => line.trim().startsWith("- "))
        .forEach((line) =>
          sections.missingKeywords.push(line.replace("- ", "").trim())
        );
    }

    // Extract ATS optimization tips
    const atsMatch = text.match(/ATS Optimization:(.*?)(?=Additional Tips:)/s);
    if (atsMatch) {
      atsMatch[0]
        .split("\n")
        .filter((line) => line.trim().startsWith("- "))
        .forEach((line) =>
          sections.atsOptimization.push(line.replace("- ", "").trim())
        );
    }

    // Extract additional tips
    const additionalTipsMatch = text.match(/Additional Tips:(.*)/s);
    if (additionalTipsMatch) {
      additionalTipsMatch[0]
        .split("\n")
        .filter((line) => line.trim().startsWith("- "))
        .forEach((line) =>
          sections.additionalTips.push(line.replace("- ", "").trim())
        );
    }

    return sections;
  };

  const {
    strengths,
    improvements,
    score,
    fit,
    suggestions,
    summary,
    technicalSkills,
    softSkills,
    educationAnalysis,
    experienceAnalysis,
    keywords,
    missingKeywords,
    atsOptimization,
    additionalTips,
  } = parseAnalysis(analysis.feedback);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(analysis.feedback);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReport = () => {
    const element = document.createElement("a");
    const file = new Blob([analysis.feedback], { type: "pdf/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "resume-analysis-report.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white">
              Resume Analysis Report
            </h2>
            <p className="text-blue-100 mt-1">
              Analyzed on {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {score && (
              <div className="text-center bg-blue-700/30 px-4 py-2 rounded-lg">
                <p className="text-sm text-blue-100">Overall Score</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        strokeDasharray={`${score}, 100`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                      {score}
                    </span>
                  </div>
                  <div>
                    <div className="h-2 w-20 bg-blue-400/50 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-100 mt-1">
                      {getScoreDescription(score)}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {fit && (
              <div className="text-center bg-blue-700/30 px-4 py-2 rounded-lg">
                <p className="text-sm text-blue-100">Job Fit</p>
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-2xl font-bold text-white">{fit}%</p>
                  <div>
                    <div className="h-2 w-20 bg-blue-400/50 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${fit}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-blue-100 mt-1">
                      {getFitDescription(fit)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {analysis.resumeName && (
            <span>
              Analyzed file:{" "}
              <span className="font-medium">{analysis.resumeName}</span>
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
          >
            {copied ? (
              <FiCheck className="mr-1.5" />
            ) : (
              <FiCopy className="mr-1.5" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={downloadReport}
            className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
          >
            <FiDownload className="mr-1.5" />
            Download
          </button>
          <button
            onClick={printReport}
            className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
          >
            <FiPrinter className="mr-1.5" />
            Print
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Summary */}
        {summary && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Executive Summary
              </h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700">{summary}</p>
            </div>
          </div>
        )}

        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("strengths")}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-100 mr-3">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Key Strengths ({strengths.length})
                </h3>
              </div>
              {expandedSections.strengths ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.strengths && (
              <ul className="space-y-3 pl-4">
                {strengths.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Improvements */}
        {improvements.length > 0 && (
          <div className="space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("improvements")}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-yellow-100 mr-3">
                  <svg
                    className="w-5 h-5 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Areas for Improvement ({improvements.length})
                </h3>
              </div>
              {expandedSections.improvements ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.improvements && (
              <ul className="space-y-3 pl-4">
                {improvements.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-yellow-500 mt-0.5 mr-2">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Skills Analysis */}
        {(technicalSkills.length > 0 || softSkills.length > 0) && (
          <div className="space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("details")}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-purple-100 mr-3">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Skills Analysis
                </h3>
              </div>
              {expandedSections.details ? <FiChevronUp /> : <FiChevronDown />}
            </div>
            {expandedSections.details && (
              <div className="space-y-6">
                {technicalSkills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">
                      Soft Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {softSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Education & Experience */}
        {(educationAnalysis || experienceAnalysis) &&
          expandedSections.details && (
            <div className="grid md:grid-cols-2 gap-6">
              {educationAnalysis && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Education Analysis
                  </h4>
                  <p className="text-gray-700">{educationAnalysis}</p>
                </div>
              )}
              {experienceAnalysis && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Experience Analysis
                  </h4>
                  <p className="text-gray-700">{experienceAnalysis}</p>
                </div>
              )}
            </div>
          )}

        {/* Keywords */}
        {(keywords.length > 0 || missingKeywords.length > 0) &&
          expandedSections.details && (
            <div className="space-y-6">
              {keywords.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Keywords Found
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {missingKeywords.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        {/* ATS Optimization */}
        {atsOptimization.length > 0 && expandedSections.details && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">ATS Optimization Tips</h4>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
              {atsOptimization.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("suggestions")}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-100 mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Recommendations ({suggestions.length})
                </h3>
              </div>
              {expandedSections.suggestions ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </div>
            {expandedSections.suggestions && (
              <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                {suggestions.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5 mr-2">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Additional Tips */}
        {additionalTips.length > 0 && expandedSections.details && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700">Additional Tips</h4>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
              {additionalTips.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5 mr-2">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Helper functions
function getScoreDescription(score) {
  if (score >= 90) return "Excellent - Highly competitive resume";
  if (score >= 75)
    return "Very good - Strong resume with minor improvements needed";
  if (score >= 60) return "Good - Some areas need attention";
  if (score >= 40) return "Fair - Significant improvements recommended";
  return "Needs work - Major revisions needed";
}

function getFitDescription(fit) {
  if (fit >= 90) return "Perfect match for the job";
  if (fit >= 75) return "Strong alignment with job requirements";
  if (fit >= 60) return "Moderate fit - Some skills match";
  if (fit >= 40) return "Partial fit - Many requirements missing";
  return "Poor fit - Consider applying to different roles";
}

export default AnalysisResult;
