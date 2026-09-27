import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import { experiences } from "../data/experience";
import useIsMobile from "../hooks/useIsMobile";

function ExperienceCard({ exp, className, style, borderColor, shadow }) {
  return (
    <motion.article
      className={`bg-black/70 backdrop-blur-md border rounded-xl p-3 md:p-4 ${className}`}
      style={{ ...style, borderColor, boxShadow: shadow }}
    >
      <p className="font-mono text-[10px] text-white/40 mb-2 truncate">
        <span className="text-[#febc2e]">commit {exp.commit}</span> · {exp.message}
      </p>
      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-brand-cyan/10 text-brand-cyan mb-2">
        {exp.duration}
      </span>
      <h3 className="text-sm md:text-base font-bold text-white mb-0.5 break-words">{exp.role}</h3>
      <p className="text-xs text-brand-cyan/70 mb-1 break-words">{exp.company}</p>
      {exp.location && (
        <span className="hidden md:inline-block text-[10px] font-medium px-2 py-0.5 rounded bg-brand-green/15 text-brand-green mb-2 break-words">
          {exp.location}
        </span>
      )}
      <p className="text-[11px] md:text-xs text-white/70 leading-relaxed break-words">{exp.description}</p>
    </motion.article>
  );
}

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // Card lights up once the progress line reaches it
  const borderColor = useTransform(scrollYProgress, [end - 0.05, end], ["rgba(28,216,210,0.2)", "rgba(28,216,210,0.7)"]);
  const shadow = useTransform(
    scrollYProgress,
    [end - 0.05, end],
    ["0 0 0px rgba(28,216,210,0)", "0 0 30px rgba(28,216,210,0.25)"]
  );

  if (layout === "desktop") {
    return (
      <div className="relative flex-1 flex justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-5 h-5 rounded-full bg-brand-cyan ring-[3px] ring-brand-cyan/30 shadow-[0_0_14px_rgba(28,216,210,0.6)]"
          style={{ scale: markerScale, opacity: markerScale }}
        />
        <motion.div
          className={`absolute ${isAbove ? "-top-6" : "-bottom-6"} w-[2px] bg-gradient-to-b from-brand-cyan/60 to-brand-cyan/10`}
          style={{ height: 32, opacity: cardOpacity }}
        />
        <ExperienceCard
          exp={exp}
          className={`absolute ${isAbove ? "bottom-10" : "top-10"} w-[290px] max-w-[90vw]`}
          style={{ opacity: cardOpacity, y: cardY }}
          borderColor={borderColor}
          shadow={shadow}
        />
      </div>
    );
  }

  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[30px] top-4 z-10 w-4 h-4 rounded-full bg-brand-cyan ring-[3px] ring-brand-cyan/30 shadow-[0_0_10px_rgba(28,216,210,0.5)]"
        style={{ scale: markerScale, opacity: markerScale }}
      />
      <ExperienceCard
        exp={exp}
        className="w-full max-w-xs"
        style={{ opacity: cardOpacity, x: cardX }}
        borderColor={borderColor}
        shadow={shadow}
      />
    </div>
  );
}

function Comet({ style }) {
  return (
    <motion.div className="absolute z-20 pointer-events-none" style={style} aria-hidden="true">
      <div className="-ml-2 -mt-2 relative h-4 w-4">
        <span className="absolute inset-0 rounded-full bg-brand-cyan animate-ping opacity-60" />
        <span className="absolute inset-[3px] rounded-full bg-white shadow-[0_0_16px_4px_rgba(28,216,210,0.9)]" />
      </div>
    </motion.div>
  );
}

const Experience = () => {
  const sceneRef = React.useRef(null);
  const isMobile = useIsMobile();

  const SCENE_HEIGHT_VH = isMobile ? 100 * experiences.length * 2 : 100 * experiences.length * 1.2;

  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () => Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
    [numExperiences]
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  const lineGlow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0 0 8px rgba(28,216,210,0.15)", "0 0 20px rgba(0,191,143,0.4)", "0 0 30px rgba(28,216,210,0.5)"]
  );

  return (
    <section id="experience" className="relative bg-black text-white">
      <div ref={sceneRef} style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }} className="relative">
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-brand-indigo via-brand-green to-brand-cyan opacity-20 blur-[120px] animate-aurora" />
            <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-brand-indigo via-brand-green to-brand-cyan opacity-20 blur-[120px] animate-aurora [animation-delay:-6s]" />
          </div>

          <div className="shrink-0 px-6 pt-14 md:pt-16">
            <SectionHeading compact index="04" eyebrow="experience · git log" title="Experience" subtitle="My professional journey building real-world applications" />
          </div>

          <div className="flex-1 flex items-start md:items-center justify-center px-4 md:px-6 pt-4 md:pt-0 pb-4 md:pb-6 z-10 min-h-0">
            {/* Desktop Timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              <div className="relative h-[3px] bg-white/10 rounded-full">
                <motion.div
                  className="absolute left-0 top-0 h-[3px] rounded-full"
                  style={{
                    width: lineSize,
                    background: "linear-gradient(to right, #1cd8d2, #00bf8f, #302b63)",
                    boxShadow: lineGlow,
                  }}
                />
                <Comet style={{ left: lineSize, top: 1.5 }} />
              </div>
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => (
                  <ExperienceItem
                    key={`${exp.company}-${exp.role}-${idx}`}
                    exp={exp}
                    idx={idx}
                    start={idx === 0 ? 0 : thresholds[idx - 1]}
                    end={thresholds[idx]}
                    scrollYProgress={scrollYProgress}
                    layout="desktop"
                  />
                ))}
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="relative w-full max-w-md md:hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/10 rounded-full">
                <motion.div
                  className="absolute top-0 left-0 w-[3px] rounded-full"
                  style={{
                    height: lineSize,
                    background: "linear-gradient(to bottom, #1cd8d2, #00bf8f, #302b63)",
                    boxShadow: lineGlow,
                  }}
                />
                <Comet style={{ top: lineSize, left: 1.5 }} />
              </div>
              <div className="relative flex flex-col gap-3 ml-6 py-2">
                {experiences.map((exp, idx) => (
                  <ExperienceItem
                    key={`${exp.company}-${exp.role}-m-${idx}`}
                    exp={exp}
                    idx={idx}
                    start={idx === 0 ? 0 : thresholds[idx - 1]}
                    end={thresholds[idx]}
                    scrollYProgress={scrollYProgress}
                    layout="mobile"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
