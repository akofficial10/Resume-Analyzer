// pages/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TestimonialSlider from "../components/TestimonialSlider";
import AnimatedCounter from "../components/AnimatedCounter";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Resume Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Get instant feedback on your resume's strengths, weaknesses, and
              areas for improvement with our advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg text-center"
              >
                Analyze Your Resume
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition text-center"
              >
                See Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white"
            >
              <p className="text-4xl font-bold mb-2">
                <AnimatedCounter target={12500} />
              </p>
              <p className="text-blue-100 text-sm uppercase tracking-wider">
                Resumes Analyzed
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white"
            >
              <p className="text-4xl font-bold mb-2">
                <AnimatedCounter target={87} />%
              </p>
              <p className="text-blue-100 text-sm uppercase tracking-wider">
                Interview Rate Increase
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-white"
            >
              <p className="text-4xl font-bold mb-2">
                <AnimatedCounter target={4200} />
              </p>
              <p className="text-blue-100 text-sm uppercase tracking-wider">
                Users Hired
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-white"
            >
              <p className="text-4xl font-bold mb-2">
                <AnimatedCounter target={45} />
              </p>
              <p className="text-blue-100 text-sm uppercase tracking-wider">
                Countries
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ResumeWise?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-600">
                Our advanced algorithms evaluate your resume against industry
                standards and provide actionable feedback.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Results</h3>
              <p className="text-gray-600">
                Get detailed feedback in seconds, not days. No waiting for human
                reviewers.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">ATS Optimization</h3>
              <p className="text-gray-600">
                Ensure your resume passes through Applicant Tracking Systems
                with flying colors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white mb-6"
          >
            Ready to improve your resume?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8"
          >
            Join thousands of professionals who've boosted their interview
            chances with our AI analyzer.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/dashboard"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            How ResumeWise Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Resume",
                description:
                  "Simply drag and drop your PDF resume or select it from your files",
                icon: "📤",
              },
              {
                step: "2",
                title: "AI Analysis",
                description:
                  "Our system scans your resume against 50+ key metrics in seconds",
                icon: "🤖",
              },
              {
                step: "3",
                title: "Get Actionable Feedback",
                description:
                  "Receive detailed suggestions to improve your resume's effectiveness",
                icon: "📝",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 p-8 rounded-xl text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Trusted by Professionals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Join thousands who've improved their job prospects
          </motion.p>
          <TestimonialSlider />
        </div>
      </section>
    </div>
  );
};

export default Home;
