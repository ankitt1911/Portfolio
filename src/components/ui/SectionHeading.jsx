import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
};

const letter = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function SectionHeading({ index, eyebrow, title, subtitle, align = "center", compact = false, className = "" }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`relative z-10 flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <motion.p
          className="font-mono text-xs sm:text-sm text-brand-cyan/80 tracking-wider mb-3"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white/30">{"// "}</span>
          {index && <span className="text-brand-green">{index}. </span>}
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        aria-label={title}
        className={`${compact ? "text-3xl sm:text-4xl md:text-5xl" : "text-4xl sm:text-5xl md:text-6xl"} font-extrabold tracking-tight leading-[1.1]`}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        {title.split(" ").map((word, wi) => (
          <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
            {word.split("").map((ch, ci) => (
              <span key={ci} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                <motion.span variants={letter} className="inline-block text-gradient-animated">
                  {ch}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </motion.h2>

      <motion.div
        className={`${compact ? "mt-2" : "mt-4"} h-[2px] rounded-full bg-gradient-to-r from-transparent via-brand-cyan to-transparent`}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 160, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
      />

      {subtitle && (
        <motion.p
          className={`${compact ? "mt-2" : "mt-4"} text-white/60 text-sm sm:text-base max-w-xl`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
