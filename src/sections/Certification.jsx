import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";

const certifications = [
  {
    title: "Frontend Web Developer - Modern HTML, CSS, JavaScript",
    issuer: "Udemy",
    date: "Jul 2025",
    description:
      "Professional certification covering modern front-end development including HTML5, CSS3, and JavaScript fundamentals used to build responsive and interactive web applications.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    image: "/certification/Frontend web developer.png",
  },
  {
    title: "Prompt Engineering",
    issuer: "Udemy",
    date: "Jun 2025",
    description:
      "Certification focused on crafting effective prompts for AI models, exploring prompt optimization techniques and improving AI response quality.",
    skills: ["Prompt Engineering", "Artificial Intelligence", "LLMs"],
    image: "/certification/Prompt Engineering.png",
  },
  {
    title: "SQL Bootcamp",
    issuer: "LetsUpgrade",
    date: "Jun 2025",
    description:
      "Comprehensive SQL training covering database querying, relational database concepts, joins, and database management fundamentals.",
    skills: ["SQL", "DBMS", "Joins", "Database Queries"],
    image: "/certification/SQL Bootcamp.png",
  },
  {
    title: "AI Crop Suggestion and Disease Predictor with Fertilizer Recommendation",
    issuer: "International Journal for Research Trends and Innovation (IJRTI)",
    date: "Apr 2025",
    description:
      "Research publication focused on developing an AI-based system that predicts crop diseases and recommends suitable crops and fertilizers using machine learning techniques.",
    skills: [
      "Machine Learning",
      "Agriculture AI",
      "Disease Prediction",
      "Data Analysis",
    ],
    image: "/certification/Paper.png",
  },
  {
    title: "Database Management System",
    issuer: "Infosys Springboard",
    date: "Feb 2024",
    description:
      "Comprehensive understanding of Database Management Systems including relational models, normalization, and query optimization.",
    skills: ["SQL", "Normalization", "ER Diagrams", "Query Optimization"],
    image: "/certification/Dbms.png",
  },
  {
    title: "Threat Intelligence and Hunting",
    issuer: "IBM",
    date: "Nov 2023",
    description:
      "Cybersecurity certification covering threat detection, incident response, and proactive threat hunting methodologies.",
    skills: [
      "Cybersecurity",
      "Threat Detection",
      "Incident Response",
      "SIEM",
    ],
    image: "/certification/Threat-Hunting.png",
  },
];
const PageCover = React.forwardRef(({ children }, ref) => (
  <div
    ref={ref}
    className="relative h-full w-full overflow-hidden bg-white"
    style={{
      backgroundColor: "#ffffff",
      background: "#ffffff",
      boxShadow: "inset 0 0 0 1000px #ffffff",
    }}
  >
    {/* Decorative border */}
    <div className="absolute inset-3 border-2 border-[#1cd8d2]/30 rounded-lg" />
    <div className="absolute inset-5 border border-[#1cd8d2]/15 rounded-lg" />

    {/* Corner ornaments */}
    {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos, i) => (
      <div
        key={i}
        className={`absolute ${pos} w-4 h-4 border-[#1cd8d2]/50 ${
          i < 2 ? "border-t-2" : "border-b-2"
        } ${i % 2 === 0 ? "border-l-2" : "border-r-2"}`}
      />
    ))}

    <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
      {children}
    </div>
  </div>
));

// Left page - Certificate details
const DetailPage = React.forwardRef(({ cert, pageNumber }, ref) => (
  <div
    ref={ref}
    className="relative h-full w-full overflow-hidden bg-white"
    style={{
      backgroundColor: "#ffffff",
      background: "#ffffff",
      boxShadow: "inset 0 0 0 1000px #ffffff",
    }}
  >
    {/* Page texture */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #1cd8d2 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

    {/* Inner border */}
    <div className="absolute inset-2 sm:inset-3 border border-[#1cd8d2]/20 rounded-lg" />

    <div className="relative z-10 flex flex-col h-full p-3 sm:p-6 md:p-8">
      {/* Header ribbon */}
      <div className="text-center mb-1.5 sm:mb-4">
        <div className="inline-block px-2 sm:px-4 py-0.5 sm:py-1 rounded-full bg-[#1cd8d2]/10 border border-[#1cd8d2]/30">
          <span className="text-[7px] sm:text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[#1cd8d2]">
            Certificate of Completion
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-1.5 sm:gap-3 mb-1.5 sm:mb-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1cd8d2]/40 to-transparent" />
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rotate-45 border border-[#1cd8d2]/50" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1cd8d2]/40 to-transparent" />
      </div>

      {/* Title */}
      <h3 className="text-[11px] sm:text-lg md:text-xl font-bold text-center bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] bg-clip-text text-transparent mb-0.5 sm:mb-1 leading-tight">
        {cert.title}
      </h3>

      {/* Issuer */}
      <p className="text-center text-[8px] sm:text-xs md:text-sm text-gray-500 mb-1.5 sm:mb-4">
        Issued by <span className="text-[#0e8c7f]">{cert.issuer}</span>
      </p>

      {/* Description */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 leading-relaxed text-center mb-1.5 sm:mb-4">
          {cert.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-1.5 sm:mb-4">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="px-1 sm:px-2 py-px sm:py-0.5 text-[7px] sm:text-[10px] md:text-xs rounded-full bg-[#1cd8d2]/15 text-[#0e8c7f] border border-[#1cd8d2]/30"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-1 sm:mb-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1cd8d2]/30 to-transparent" />
        </div>
        <div className="flex justify-center text-[7px] sm:text-[10px] md:text-xs text-gray-400">
          <span>Date: {cert.date}</span>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-1 sm:bottom-2 right-2 sm:right-4 text-[7px] sm:text-[10px] text-gray-300">
        {pageNumber}
      </div>
    </div>
  </div>
));

// Right page - Certificate image
const ImagePage = React.forwardRef(({ cert, pageNumber }, ref) => (
  <div
    ref={ref}
    className="relative h-full w-full overflow-hidden bg-white"
    style={{
      backgroundColor: "#ffffff",
      background: "#ffffff",
      boxShadow: "inset 0 0 0 1000px #ffffff",
    }}
  >
    {/* Inner border */}
    <div className="absolute inset-3 border border-[#1cd8d2]/20 rounded-lg" />

    <div className="relative z-10 flex flex-col items-center justify-center h-full p-5">
      {/* Small label */}
      <div className="mb-3">
        <span className="text-[10px] sm:text-xs font-medium tracking-wider uppercase text-gray-400">
          {cert.title}
        </span>
      </div>

      {/* Certificate image */}
      <div className="flex-1 flex items-center justify-center w-full px-2">
        <img
          src={cert.image}
          alt={`${cert.title} Certificate`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-lg border border-gray-200"
        />
      </div>

      {/* Page number */}
      <div className="absolute bottom-2 left-4 text-[10px] text-gray-300">
        {pageNumber}
      </div>
    </div>
  </div>
));

const Certification = () => {
  const bookRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="certifications" className="relative bg-black text-white py-16 sm:py-24 overflow-hidden ">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-transparent mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Certifications
        </motion.h2>
        <motion.p
          className="text-white/60 text-xs sm:text-sm text-center mb-10 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Click on the pages to flip through my certifications
        </motion.p>

        {/* Book */}
        <motion.div
          className="flex justify-center "
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <HTMLFlipBook
            key={isMobile ? "mobile" : "desktop"}
            ref={bookRef}
            width={isMobile ? 250 : 450}
            height={isMobile ? 350 : 550}
            size="stretch"
            minWidth={isMobile ? 180 : 300}
            maxWidth={isMobile ? 300 : 550}
            minHeight={isMobile ? 260 : 400}
            maxHeight={isMobile ? 420 : 680}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="certification-book "
            style={{}}
            flippingTime={800}
            usePortrait={isMobile}
            startZIndex={0}
            autoSize={true}
            drawShadow={true}
            useMouseEvents={true}
            swipeDistance={30}
          >
            {/* Front Cover */}
            <PageCover>
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-[#1cd8d2] to-[#00bf8f] flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#0e8c7f] to-[#00805a] bg-clip-text text-transparent mb-2">
                My Certifications
              </h2>
              <p className="text-gray-400 text-xs">Click to open</p>
            </PageCover>

            {/* Certification pairs: Detail (left) + Image (right) */}
            {certifications.flatMap((cert, idx) => [
              <DetailPage key={`detail-${idx}`} cert={cert} pageNumber={idx * 2 + 1} />,
              <ImagePage key={`image-${idx}`} cert={cert} pageNumber={idx * 2 + 2} />,
            ])}

            {/* Back Cover */}
            <PageCover>
              <div className="w-12 h-12 mb-4 rounded-full bg-[#1cd8d2]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1cd8d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-gray-400 text-xs">Always Learning...</p>
            </PageCover>
          </HTMLFlipBook>
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          className="flex justify-center gap-6 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
            className="px-4 py-2 text-xs rounded-full border border-[#1cd8d2]/30 text-[#1cd8d2]/70 hover:bg-[#1cd8d2]/10 transition-colors"
          >
            ← Prev
          </button>
          <button
            onClick={() => bookRef.current?.pageFlip()?.flipNext()}
            className="px-4 py-2 text-xs rounded-full border border-[#1cd8d2]/30 text-[#1cd8d2]/70 hover:bg-[#1cd8d2]/10 transition-colors"
          >
            Next →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Certification;
