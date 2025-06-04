const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const Resume = require("../models/Resume");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const { analyzeResume } = require("../services/openaiService");

const router = express.Router();

// ✅ Upload Resume, Save to MongoDB & Get AI Feedback
router.post("/upload", upload.single("resume"), async (req, res) => {
  console.log("File:", req.file);
  console.log("Body:", req.body);
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No file uploaded or invalid file type!" });
    }

    let resumeText = "";

    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(dataBuffer);
      resumeText = pdfData.text;
    } else {
      return res
        .status(400)
        .json({ error: "Only PDF files are supported for analysis." });
    }

    if (!resumeText.trim()) {
      return res
        .status(400)
        .json({ error: "Resume content extraction failed." });
    }
    console.log("---------------------------------");
    
    const feedback = await analyzeResume(resumeText);

    const newResume = new Resume({
      filename: req.file.filename,
      filePath: req.file.path,
      uploadedAt: new Date(),
    });

    await newResume.save();

    res.status(201).json({
      message: "Resume uploaded successfully!",
      resume: newResume,
      feedback: feedback,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// ✅ Get All Uploaded Resumes
router.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ uploadedAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// ✅ Get Single Resume by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid Resume ID format" });
    }

    const resume = await Resume.findById(id);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

// ✅ Delete Resume by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid Resume ID format" });
    }

    const resume = await Resume.findByIdAndDelete(id);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }
    res.status(200).json({ message: "Resume deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

module.exports = router;
