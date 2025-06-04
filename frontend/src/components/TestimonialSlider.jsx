import { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    content:
      "ResumeWise helped me identify gaps in my resume I never noticed. Landed 3x more interviews after using their suggestions!",
    avatar: "👩‍💻",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    content:
      "The ATS optimization feature is game-changing. Went from zero callbacks to multiple offers in just 2 weeks.",
    avatar: "👨‍💼",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Recent Graduate",
    content:
      "As someone with no professional experience, the AI helped me highlight my projects in the most compelling way.",
    avatar: "🎓",
  },
  {
    id: 4,
    name: "Emily Wilson",
    role: "UX Designer",
    content:
      "The resume templates are beautifully designed and helped me stand out from other applicants.",
    avatar: "👩‍🎨",
  },
  {
    id: 5,
    name: "James Peterson",
    role: "Data Scientist",
    content:
      "The skills matching feature helped me tailor my resume perfectly for each job application.",
    avatar: "👨‍🔬",
  },
  {
    id: 6,
    name: "Lisa Wong",
    role: "Marketing Director",
    content:
      "I was able to condense my 15-year career into a compelling one-page resume that gets results.",
    avatar: "👩‍💼",
  },
  {
    id: 7,
    name: "Robert Garcia",
    role: "Senior Developer",
    content:
      "The cover letter generator saved me hours of work and helped me land my dream job.",
    avatar: "👨‍💻",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    role: "HR Manager",
    content:
      "I recommend ResumeWise to all candidates we interview - the quality improvement is remarkable.",
    avatar: "👩‍💼",
  },
  {
    id: 9,
    name: "William Thompson",
    role: "Frontend Developer",
    content:
      "The GitHub integration helped me showcase my projects in the best possible light.",
    avatar: "👨‍💻",
  },
  {
    id: 10,
    name: "Sophia Lee",
    role: "Product Designer",
    content:
      "My response rate doubled after using ResumeWise's optimization tools.",
    avatar: "👩‍🎨",
  },
  {
    id: 11,
    name: "Daniel Kim",
    role: "DevOps Engineer",
    content:
      "The technical resume templates are perfect for engineering roles.",
    avatar: "👨‍🔧",
  },
  {
    id: 12,
    name: "Emma Davis",
    role: "Content Strategist",
    content:
      "Finally a tool that helps non-technical professionals create impactful resumes.",
    avatar: "👩‍💻",
  },
  {
    id: 13,
    name: "Christopher Brown",
    role: "CTO",
    content:
      "We evaluate hundreds of resumes weekly - ResumeWise-optimized ones always stand out.",
    avatar: "👨‍💼",
  },
  {
    id: 14,
    name: "Ava Wilson",
    role: "Recruitment Consultant",
    content:
      "I can immediately tell when a candidate has used ResumeWise - the quality difference is obvious.",
    avatar: "👩‍💼",
  },
  {
    id: 15,
    name: "Matthew Taylor",
    role: "Backend Engineer",
    content:
      "The automated bullet point generator helped me articulate my experience better than I could myself.",
    avatar: "👨‍💻",
  },
];

const TestimonialSlider = () => {
  const [currentTrio, setCurrentTrio] = useState(0);
  const testimonialsPerView = 3;
  const totalTrios = Math.ceil(testimonials.length / testimonialsPerView);

  const nextTestimonial = () => {
    setCurrentTrio((prev) => (prev === totalTrios - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTrio((prev) => (prev === 0 ? totalTrios - 1 : prev - 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentTrio * testimonialsPerView,
    currentTrio * testimonialsPerView + testimonialsPerView
  );

  return (
    <div className="w-full overflow-hidden py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
        What Our Users Say
      </h2>

      <div className="relative w-full">
        <div className="flex transition-transform duration-500">
          {visibleTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-full px-4 sm:w-1/2 md:w-1/3"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100 h-full mx-2">
                <div className="text-5xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-blue-800 text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-blue-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-xl hover:bg-blue-50 transition z-10"
        >
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-xl hover:bg-blue-50 transition z-10"
        >
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-12 space-x-2">
        {Array.from({ length: totalTrios }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTrio(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentTrio === index ? "bg-blue-600 w-8" : "bg-blue-300"
            }`}
            aria-label={`Go to testimonials ${index * 3 + 1}-${index * 3 + 3}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
