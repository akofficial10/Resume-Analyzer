// pages/About.jsx
const About = () => {
  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ResumeWise
          </h1>
          <p className="text-xl text-gray-600">
            Empowering job seekers with AI-driven resume analysis and
            optimization
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Journey</h2>
          <p className="text-gray-600 mb-6">
            I’m Ayush, an Electronics and Communication Engineering student with
            a passion for building impactful tech solutions. During my web
            development journey, I identified a common struggle faced by many
            job seekers: poorly optimized resumes that fail to stand out in
            Applicant Tracking Systems (ATS).
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">The Vision</h2>
          <p className="text-gray-600 mb-6">
            I decided to build <strong>ResumeWise</strong> — a Smart Resume
            Analyzer & ATS Optimizer powered by the MERN stack and OpenAI API.
            It evaluates resumes, offers actionable feedback, highlights missing
            keywords, and improves formatting to help candidates maximize their
            chances of getting noticed.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            The Technology
          </h2>
          <p className="text-gray-600 mb-6">
            Built using{" "}
            <strong>React.js, Node.js, Express.js, MongoDB, and OpenAI</strong>,
            the platform extracts content from uploaded resumes, compares it
            with job descriptions, and gives a resume score. It even suggests
            keyword improvements and rewrites parts of the resume using AI to
            match industry standards.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">The Mission</h2>
          <p className="text-gray-600 mb-6">
            To make professional, AI-powered resume analysis accessible to
            everyone — especially those without access to expensive coaching or
            networks. I believe the right tools can help deserving candidates
            unlock better opportunities.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">
              Let’s Connect
            </h3>
            <p className="text-blue-700">
              I’m constantly learning, building, and improving ResumePro AI.
              Have ideas or feedback? Feel free to reach out at{" "}
              <a href="mailto:ayush.dev.mail@gmail.com" className="font-medium">
                ayush.dev.mail@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
