import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
{
  role: "Software Engineer Intern",
  company: "SNV SecureGen",
  duration: "Jan 2025 - Jun 2025",
  location: "Bengaluru, Karnataka, India · Remote",
  description:
    "Built responsive MERN stack applications and worked with REST APIs while gaining experience in performance optimization and collaborative development.",
},
{
  role: "Software Engineer Intern",
  company: "JoulestoWatts Business Solutions Pvt Ltd",
  duration: "Sep 2025 - Dec 2025",
  location: "Bengaluru, Karnataka, India · On-site",
  description:
    "Contributed to full-stack development using React, Node.js, and Express while building scalable features and improving application performance.",
},
{
  role: "Software Development Engineer (SDE)",
  company: "JoulestoWatts Business Solutions Pvt Ltd",
  duration: "Dec 2025 - Present",
  location: "Bengaluru, Karnataka, India · On-site",
  description:
    "Designing and developing scalable full-stack applications using the MERN stack with a focus on performance, reliability, and clean architecture.",
}
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex-1 flex justify-center items-center min-w-0" key={`${exp.company}-${exp.role}-${idx}`}>
        {/* Marker dot */}
        <motion.div
          className="z-10 w-5 h-5 rounded-full bg-[#1cd8d2] ring-[3px] ring-[#1cd8d2]/30 shadow-[0_0_10px_rgba(28,216,210,0.4)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        {/* Connector line */}
        <motion.div
          className={`absolute ${isAbove ? "-top-6" : "-bottom-6"} w-[2px]`}
          style={{ height: 32, opacity: cardOpacity, background: "rgba(28,216,210,0.3)" }}
        />
        {/* Card */}
        <motion.article
          className={`absolute ${isAbove ? "bottom-10" : "top-10"} bg-white/5 backdrop-blur-sm border border-[#1cd8d2]/30 rounded-xl p-4 w-[280px] shadow-[0_0_15px_rgba(28,216,210,0.08)] hover:shadow-[0_0_25px_rgba(28,216,210,0.15)] transition-shadow duration-500`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-[#1cd8d2]/10 text-[#1cd8d2] mb-2">
            {exp.duration}
          </span>
          <h3 className="text-base font-bold text-white mb-0.5">{exp.role}</h3>
          <p className="text-xs text-[#1cd8d2]/60 mb-1">{exp.company}</p>
          {exp.location && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#00bf8f]/15 text-[#00bf8f] inline-block mb-2">{exp.location}</span>
          )}
          <p className="text-xs text-white/70 leading-relaxed break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  // Mobile layout
  return (
    <div key={`${exp.company}-${exp.role}-m-${idx}`} className="relative flex items-start">
      <motion.div
        className="absolute -left-[9px] top-4 z-10 w-4 h-4 rounded-full bg-[#1cd8d2] ring-[3px] ring-[#1cd8d2]/30 shadow-[0_0_10px_rgba(28,216,210,0.4)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      <motion.article
        className="ml-6 bg-white/5 backdrop-blur-sm border border-[#1cd8d2]/30 rounded-xl p-3 w-full max-w-xs shadow-[0_0_15px_rgba(28,216,210,0.08)]"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-[#1cd8d2]/10 text-[#1cd8d2] mb-2">
          {exp.duration}
        </span>
        <h3 className="text-sm font-bold text-white mb-0.5 break-words">{exp.role}</h3>
        <p className="text-xs text-[#1cd8d2]/60 mb-1 break-words">{exp.company}</p>
        {exp.location && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#00bf8f]/15 text-[#00bf8f] inline-block mb-2 break-words">{exp.location}</span>
        )}
        <p className="text-xs text-white/70 leading-relaxed break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
}

const Experience = () => {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 100 * experiences.length * 2 : 100 * experiences.length * 1.2;

  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () => Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
    [numExperiences]
  );

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  const lineGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0 0 8px rgba(28,216,210,0.15)",
      "0 0 20px rgba(0,191,143,0.4)",
      "0 0 30px rgba(28,216,210,0.5)",
    ]
  );

  return (
    <section id="experience" className="relative bg-black text-white">
      <div ref={sceneRef} style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }} className="relative">
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Background ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
          </div>

          {/* Title */}
          <div className="shrink-0 px-6 pt-4 md:pt-6 text-center z-10">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mt-3 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Experience
            </motion.h2>
            <motion.p
              className="text-white/90 mt-2 text-xs sm:text-sm max-w-md mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              My professional journey building real-world applications
            </motion.p>
          </div>

          {/* Timeline container */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-6 pb-4 md:pb-6 z-10 min-h-0 overflow-y-auto">
            {/* Desktop Timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              {/* Horizontal timeline line */}
              <div className="relative h-[3px] bg-white/10 rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-[3px] rounded-full origin-left"
                  style={{
                    width: lineWidth,
                    background: "linear-gradient(to right, #1cd8d2, #00bf8f, #302b63)",
                    boxShadow: lineGlow,
                  }}
                />
              </div>
              {/* Experience items */}
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>
            {/* Mobile Timeline */}
            <div className="relative w-full max-w-md md:hidden">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/10 rounded-full">
                <motion.div
                  className="absolute top-0 left-0 w-[3px] rounded-full origin-top"
                  style={{
                    height: lineHeight,
                    background: "linear-gradient(to bottom, #1cd8d2, #00bf8f, #302b63)",
                    boxShadow: lineGlow,
                  }}
                />
              </div>
              {/* Experience items */}
              <div className="relative flex flex-col gap-4 ml-6 mt-4 pb-4">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-m-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
