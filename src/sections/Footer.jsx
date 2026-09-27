import { motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import MagneticButton from "../components/ui/MagneticButton";
import { profile } from "../data/profile";
import { scrollToSection } from "../lib/scroll";

const glowVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.2,
    y: -3,
    filter: "drop-shadow(0 0 8px rgba(28,216,210,0.9)) drop-shadow(0 0 18px rgba(0,191,143,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const letters = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const letter = {
  hidden: { y: "100%", opacity: 0, rotate: 8 },
  show: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const builtWith = ["React 19", "Vite 7", "Tailwind 4", "GSAP", "Framer Motion", "Lenis", "OGL"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(48,43,99,0.45),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(0,191,143,0.25),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />

      <div className="relative z-10 px-4 sm:px-6 md:px-10 py-16 md:py-20 flex flex-col items-center text-center gap-6">
        <motion.h2
          aria-label={profile.name}
          className="font-bangers leading-none text-center select-none w-full"
          style={{ fontSize: "clamp(2.5rem, 9vw, 9rem)", letterSpacing: "0.03em" }}
          variants={letters}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {profile.name.split(" ").map((word, wi) => (
            <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap mx-[0.15em]">
              {word.split("").map((ch, ci) => (
                <span key={ci} className="inline-block overflow-hidden align-bottom pr-[0.08em] -mr-[0.08em]">
                  <motion.span variants={letter} className="inline-block text-gradient-animated">
                    {ch}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </motion.h2>

        <motion.div
          className="h-[3px] rounded-full bg-gradient-to-r from-brand-cyan via-brand-green to-brand-indigo"
          initial={{ width: 0 }}
          whileInView={{ width: 128 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
        />

        <div className="flex gap-5 text-2xl md:text-3xl">
          {profile.socials.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="inline-flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        <p className="text-gray-300 italic max-w-xl">“Success is when preparation meets opportunity.”</p>

        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
          <span className="font-mono text-xs text-white/40 mr-1">built with</span>
          {builtWith.map((t) => (
            <span key={t} className="font-mono text-[11px] px-2 py-0.5 rounded border border-white/10 text-white/60">
              {t}
            </span>
          ))}
        </div>

        <MagneticButton as="button" variant="ghost" onClick={() => scrollToSection(0)} className="!text-sm !px-5 !py-2">
          <FiArrowUp /> back to top
        </MagneticButton>

        <div className="w-full max-w-6xl mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-white/40">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
            </span>
            all systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
