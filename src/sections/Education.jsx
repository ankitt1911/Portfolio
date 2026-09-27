import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import { educations } from "../data/education";

function CardBody({ edu }) {
  return (
    <>
      <p className="font-mono text-[10px] text-white/40 mb-2">
        <span className="text-[#c792ea]">git tag</span> <span className="text-brand-green">{edu.tag}</span>
      </p>
      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-brand-cyan/10 text-brand-cyan mb-2">
        {edu.year}
      </span>
      <h3 className="text-sm md:text-base font-bold text-white mb-0.5">{edu.degree}</h3>
      <p className="text-xs text-brand-cyan/70 mb-1">{edu.school}</p>
      <p className="text-xs text-white/70 leading-relaxed">{edu.description}</p>
    </>
  );
}

function EducationCard({ edu, idx, start, end, scrollYProgress }) {
  const mid = start + (end - start) * 0.4;
  const opacity = useTransform(scrollYProgress, [start, mid], [0, 1]);
  const y = useTransform(scrollYProgress, [start, mid], [40, 0]);
  const scale = useTransform(scrollYProgress, [start, mid], [0.9, 1]);
  const markerScale = useTransform(scrollYProgress, [start, mid], [0, 1]);
  const borderColor = useTransform(scrollYProgress, [mid, mid + 0.05], ["rgba(28,216,210,0.2)", "rgba(28,216,210,0.7)"]);
  const boxShadow = useTransform(
    scrollYProgress,
    [mid, mid + 0.05],
    ["0 0 0px rgba(28,216,210,0)", "0 0 30px rgba(28,216,210,0.25)"]
  );

  const isLeft = idx % 2 === 0;
  const cardClass = "relative bg-black/70 backdrop-blur-md border rounded-xl p-4";

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[1fr_50px_1fr] items-center w-full">
        <div className={`flex justify-end pr-6 ${isLeft ? "" : "invisible"}`}>
          {isLeft && (
            <motion.div style={{ opacity, y, scale, borderColor, boxShadow }} className={`${cardClass} max-w-[320px] w-full`}>
              <CardBody edu={edu} />
            </motion.div>
          )}
        </div>

        <div className="flex justify-center relative">
          <motion.div
            style={{ scale: markerScale, opacity: markerScale }}
            className="w-4 h-4 rounded-full bg-brand-cyan ring-[3px] ring-brand-cyan/30 shadow-[0_0_14px_rgba(28,216,210,0.6)] z-10"
          />
        </div>

        <div className={`flex justify-start pl-6 ${!isLeft ? "" : "invisible"}`}>
          {!isLeft && (
            <motion.div style={{ opacity, y, scale, borderColor, boxShadow }} className={`${cardClass} max-w-[320px] w-full`}>
              <CardBody edu={edu} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative flex items-start">
        <motion.div
          style={{ scale: markerScale, opacity: markerScale }}
          className="absolute -left-[30px] top-4 w-4 h-4 rounded-full bg-brand-cyan ring-[3px] ring-brand-cyan/30 shadow-[0_0_10px_rgba(28,216,210,0.5)] z-10"
        />
        <motion.div style={{ opacity, y, scale, borderColor, boxShadow }} className={`${cardClass} w-full max-w-xs`}>
          <CardBody edu={edu} />
        </motion.div>
      </div>
    </>
  );
}

function Comet({ top }) {
  return (
    <motion.div className="absolute left-[1.5px] z-20 pointer-events-none" style={{ top }} aria-hidden="true">
      <div className="-ml-2 -mt-2 relative h-4 w-4">
        <span className="absolute inset-0 rounded-full bg-brand-cyan animate-ping opacity-60" />
        <span className="absolute inset-[3px] rounded-full bg-white shadow-[0_0_16px_4px_rgba(28,216,210,0.9)]" />
      </div>
    </motion.div>
  );
}

const Education = () => {
  const sectionRef = React.useRef(null);

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
    ["0 0 8px rgba(28,216,210,0.15)", "0 0 20px rgba(0,191,143,0.4)", "0 0 30px rgba(28,216,210,0.5)"]
  );

  const line = (
    <>
      <motion.div
        className="absolute top-0 left-0 w-[3px] rounded-full"
        style={{
          height: lineHeight,
          background: "linear-gradient(to bottom, #1cd8d2, #00bf8f, #302b63)",
          boxShadow: lineGlow,
        }}
      />
      <Comet top={lineHeight} />
    </>
  );

  return (
    <section id="education" className="relative bg-black text-white">
      <div ref={sectionRef} className="relative h-[280vh] md:h-[250vh]">
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-brand-indigo via-brand-green to-brand-cyan opacity-20 blur-[120px] animate-aurora" />
            <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-brand-indigo via-brand-green to-brand-cyan opacity-20 blur-[120px] animate-aurora [animation-delay:-6s]" />
          </div>

          <div className="shrink-0 px-6 pt-14 md:pt-16">
            <SectionHeading compact index="05" eyebrow="education" title="Education" subtitle="My academic journey that shaped my technical foundation" />
          </div>

          <div className="flex-1 flex items-center justify-center px-6 pt-6 pb-6 z-10 min-h-0">
            <div className="relative w-full max-w-3xl">
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-white/10 rounded-full">
                {line}
              </div>
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-[3px] bg-white/10 rounded-full">{line}</div>

              <div className="flex flex-col gap-6 md:gap-4 ml-6 md:ml-0">
                {educations.map((edu, idx) => (
                  <EducationCard
                    key={`${edu.degree}-${idx}`}
                    edu={edu}
                    idx={idx}
                    start={idx === 0 ? 0 : thresholds[idx - 1]}
                    end={thresholds[idx]}
                    scrollYProgress={scrollYProgress}
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

export default Education;
