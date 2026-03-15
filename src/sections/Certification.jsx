import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";

const certifications = [
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-CP-XXXXX",
    description:
      "Foundational understanding of AWS Cloud concepts, services, and terminology.",
    skills: ["Cloud Computing", "AWS Services", "Cloud Architecture"],
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "2024",
    credentialId: "META-FE-XXXXX",
    description:
      "Professional certificate covering React, JavaScript, and front-end development best practices.",
    skills: ["React", "JavaScript", "UI/UX", "Web Development"],
  },
  {
    title: "Google Data Analytics",
    issuer: "Google (Coursera)",
    date: "2023",
    credentialId: "GOOGLE-DA-XXXXX",
    description:
      "Data analysis using spreadsheets, SQL, R programming, and Tableau for visualization.",
    skills: ["SQL", "R Programming", "Tableau", "Data Visualization"],
  },
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2023",
    credentialId: "UDEMY-FS-XXXXX",
    description:
      "Comprehensive full-stack development covering MERN stack, REST APIs, and deployment.",
    skills: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    title: "Python for Data Science",
    issuer: "IBM (Coursera)",
    date: "2023",
    credentialId: "IBM-PDS-XXXXX",
    description:
      "Python programming for data science including pandas, numpy, and machine learning basics.",
    skills: ["Python", "Pandas", "NumPy", "Machine Learning"],
  },
  {
    title: "Java Programming Masterclass",
    issuer: "Udemy",
    date: "2022",
    credentialId: "UDEMY-JAVA-XXXXX",
    description:
      "Advanced Java programming covering OOP, collections, multithreading, and design patterns.",
    skills: ["Java", "OOP", "Design Patterns", "Multithreading"],
  },
];

const PageCover = React.forwardRef(({ children, type }, ref) => (
  <div
    ref={ref}
    className="relative h-full overflow-hidden"
    style={{
      backgroundColor: "#ffffff",
      background: "linear-gradient(135deg, #ffffff 0%, #f0f0f5 50%, #ffffff 100%)",
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

const CertPage = React.forwardRef(({ cert, pageNumber }, ref) => (
  <div
    ref={ref}
    className="relative h-full overflow-hidden"
    style={{
      backgroundColor: "#ffffff",
      background: "linear-gradient(160deg, #ffffff 0%, #f5f5fa 40%, #ffffff 100%)",
    }}
  >
    {/* Page texture */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #1cd8d2 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

    {/* Inner border */}
    <div className="absolute inset-3 border border-[#1cd8d2]/20 rounded-lg" />

    <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
      {/* Header ribbon */}
      <div className="text-center mb-4">
        <div className="inline-block px-4 py-1 rounded-full bg-[#1cd8d2]/10 border border-[#1cd8d2]/30">
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#1cd8d2]">
            Certificate of Completion
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1cd8d2]/40 to-transparent" />
        <div className="w-2 h-2 rotate-45 border border-[#1cd8d2]/50" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1cd8d2]/40 to-transparent" />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold text-center bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] bg-clip-text text-transparent mb-1">
        {cert.title}
      </h3>

      {/* Issuer */}
      <p className="text-center text-xs sm:text-sm text-gray-500 mb-4">
        Issued by <span className="text-[#0e8c7f]">{cert.issuer}</span>
      </p>

      {/* Description */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-center mb-4">
          {cert.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-[#1cd8d2]/15 text-[#0e8c7f] border border-[#1cd8d2]/30"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1cd8d2]/30 to-transparent" />
        </div>
        <div className="flex justify-between text-[10px] sm:text-xs text-gray-400">
          <span>Date: {cert.date}</span>
          <span>ID: {cert.credentialId}</span>
        </div>
      </div>

      {/* Page number */}
      <div className="absolute bottom-2 right-4 text-[10px] text-gray-300">
        {pageNumber}
      </div>
    </div>
  </div>
));

const Certification = () => {
  const bookRef = useRef(null);

  return (
    <section id="certifications" className="relative bg-black text-white py-16 sm:py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
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
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <HTMLFlipBook
            ref={bookRef}
            width={300}
            height={420}
            size="stretch"
            minWidth={250}
            maxWidth={400}
            minHeight={350}
            maxHeight={560}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="certification-book"
            style={{}}
            flippingTime={800}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            drawShadow={true}
            useMouseEvents={true}
          >
            {/* Front Cover */}
            <PageCover type="front">
              <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-[#1cd8d2] to-[#00bf8f] flex items-center justify-center">
                <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#0e8c7f] to-[#00805a] bg-clip-text text-transparent mb-2">
                My Certifications
              </h2>
              <p className="text-gray-400 text-xs">Click to open →</p>
            </PageCover>

            {/* Certification Pages */}
            {certifications.map((cert, idx) => (
              <CertPage key={cert.title} cert={cert} pageNumber={idx + 1} />
            ))}

            {/* Back Cover */}
            <PageCover type="back">
              <div className="w-12 h-12 mb-4 rounded-full bg-[#1cd8d2]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#1cd8d2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-gray-400 text-xs">Always Learning...</p>
            </PageCover>
          </HTMLFlipBook>
        </motion.div>

        {/* Navigation hint */}
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
