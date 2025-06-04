// components/Footer.jsx
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-wide">
              ResumeWise
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              AI-powered resume analysis to help you land your dream job.
              Improve, optimize, and stand out.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Resume Tips
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-300 transition-all duration-200"
                >
                  Career Advice
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <FaEnvelope className="text-blue-400" />
                aiResume@gmail.com
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FaPhoneAlt className="text-blue-400" />
                +1 (555) 123-4567
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-blue-300 transition text-xl">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-300 transition text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-300 transition text-xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="border-t border-blue-500 mt-12 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">ResumeWise</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
