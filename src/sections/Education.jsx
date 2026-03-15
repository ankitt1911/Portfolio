import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const educations = [
  {
    degree: "10th Standard",
    school: "Chandra Public School-UP",
    year: "2018",
    description:
      "Built a strong foundation in Mathematics, Science, and Computer Science.",
  },
  {
    degree: "12th Standard (PCM)",
    school: "Chandra Public School-UP",
    year: "2020",
    description:
      "Specialized in Physics, Chemistry, and Mathematics. Strengthened analytical thinking.",
  },
{
  degree: "B.E in Information Science and Engineering",
  school: "Acharya Institute of Technology, Bangalore",
  year: "2021 - 2025",
  description:
    "Specialized in DSA, Full-Stack Web Development, and Software Engineering. Developed scalable applications using modern development practices.",
}
];

function EducationCard({ edu, idx, start, end, scrollYProgress }) {
  const mid = start + (end - start) * 0.4;
  const opacity = useTransform(scrollYProgress, [start, mid], [0, 1]);
  const y = useTransform(scrollYProgress, [start, mid], [40, 0]);
  const scale = useTransform(scrollYProgress, [start, mid], [0.9, 1]);
  const markerScale = useTransform(scrollYProgress, [start, mid], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, mid], [0, 1]);

  const isLeft = idx % 2 === 0;

  const card = (side) => (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative bg-white/5 backdrop-blur-sm border border-[#1cd8d2]/30 rounded-xl p-4 max-w-[300px] w-full shadow-[0_0_15px_rgba(28,216,210,0.08)] hover:shadow-[0_0_25px_rgba(28,216,210,0.15)] transition-shadow duration-500"
    >
      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-[#1cd8d2]/10 text-[#1cd8d2] mb-2">
        {edu.year}
      </span>
      <h3 className="text-base font-bold text-white mb-0.5">{edu.degree}</h3>
      <p className="text-xs text-[#1cd8d2]/60 mb-1">{edu.school}</p>
      <p className="text-xs text-white/70 leading-relaxed">{edu.description}</p>
      <div className={`absolute top-1/2 ${side === "left" ? "-right-[14px] border-r border-t" : "-left-[14px] border-l border-b"} w-2.5 h-2.5 rotate-45 bg-white/5 border-[#1cd8d2]/30`} />
    </motion.div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[1fr_50px_1fr] items-center w-full">
        <div className={`flex ${isLeft ? "justify-end pr-6" : "justify-end pr-6 invisible"}`}>
          {isLeft && card("left")}
        </div>

        <div className="flex justify-center relative">
          <motion.div
            style={{ scale: markerScale, opacity: markerOpacity }}
            className="w-4 h-4 rounded-full bg-[#1cd8d2] ring-[3px] ring-[#1cd8d2]/30 shadow-[0_0_10px_rgba(28,216,210,0.4)] z-10"
          />
        </div>

        <div className={`flex ${!isLeft ? "justify-start pl-6" : "justify-start pl-6 invisible"}`}>
          {!isLeft && card("right")}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative flex items-start">
        <motion.div
          style={{ scale: markerScale, opacity: markerOpacity }}
          className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-[#1cd8d2] ring-[3px] ring-[#1cd8d2]/30 shadow-[0_0_10px_rgba(28,216,210,0.4)] z-10"
        />
        <motion.div
          style={{ opacity, y, scale }}
          className="ml-6 bg-white/5 backdrop-blur-sm border border-[#1cd8d2]/30 rounded-xl p-4 w-full max-w-xs shadow-[0_0_15px_rgba(28,216,210,0.08)]"
        >
          <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-[#1cd8d2]/10 text-[#1cd8d2] mb-2">
            {edu.year}
          </span>
          <h3 className="text-sm font-bold text-white mb-0.5">{edu.degree}</h3>
          <p className="text-xs text-[#1cd8d2]/60 mb-1">{edu.school}</p>
          <p className="text-xs text-white/70 leading-relaxed">{edu.description}</p>
        </motion.div>
      </div>
    </>
  );
}

const Education = () => {
  const sectionRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 280 : 250;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const numItems = educations.length;
  const thresholds = React.useMemo(
    () => Array.from({ length: numItems }, (_, i) => (i + 1) / numItems),
    [numItems]
  );

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
    <section id="education" className="relative bg-black text-white">
      <div
        ref={sectionRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          {/* Background ambient glow - matching Skills */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
          </div>

          {/* Title */}
          <div className="shrink-0 px-6 pt-6 text-center z-10">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mt-3 bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Education
            </motion.h2>
            <motion.p
              className="text-white/90 mt-2 text-xs sm:text-sm max-w-md mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              My academic journey that shaped my technical foundation
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="flex-1 flex items-center justify-center px-6 pb-6 z-10">
            <div className="relative w-full max-w-3xl">
              {/* Vertical timeline line - Desktop */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-white/10 rounded-full">
                <motion.div
                  className="absolute top-0 left-0 w-[3px] rounded-full origin-top"
                  style={{
                    height: lineHeight,
                    background: "linear-gradient(to bottom, #1cd8d2, #00bf8f, #302b63)",
                    boxShadow: lineGlow,
                  }}
                />
              </div>

              {/* Vertical timeline line - Mobile */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-[3px] bg-white/10 rounded-full">
                <motion.div
                  className="absolute top-0 left-0 w-[3px] rounded-full origin-top"
                  style={{
                    height: lineHeight,
                    background: "linear-gradient(to bottom, #1cd8d2, #00bf8f, #302b63)",
                    boxShadow: lineGlow,
                  }}
                />
              </div>

              {/* Education cards */}
              <div className="flex flex-col gap-8 md:gap-10">
                {educations.map((edu, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <EducationCard
                      key={`${edu.degree}-${idx}`}
                      edu={edu}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
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

export default Education;
