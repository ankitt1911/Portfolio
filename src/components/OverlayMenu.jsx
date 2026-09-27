import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { sections } from "../data/sections";
import { profile } from "../data/profile";
import { lockScroll, scrollToSection } from "../lib/scroll";
import useIsMobile from "../hooks/useIsMobile";

export default function OverlayMenu({ isOpen, onClose, active }) {
  const isMobile = useIsMobile(1024);
  const origin = isMobile ? "95% 5%" : "50% 5%";
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    lockScroll(true);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstLinkRef.current?.focus(), 350);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [isOpen, onClose]);

  const go = (e, id) => {
    e.preventDefault();
    lockScroll(false);
    scrollToSection(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          data-lenis-prevent
          className="fixed inset-0 z-[70] flex overflow-y-auto bg-black"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden="true" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-cyan/10 blur-[140px] pointer-events-none" aria-hidden="true" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white text-3xl hover:text-brand-cyan hover:rotate-90 transition-all duration-300"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <p className="absolute top-6 left-6 font-mono text-xs text-white/40">
            <span className="text-brand-green">$</span> cd ~/portfolio/<span className="text-brand-cyan">{active}</span>
          </p>

          <ul className="relative m-auto space-y-2 sm:space-y-3 py-20">
            {sections.map(({ id, label }, index) => {
              const isActive = active === id;
              return (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.25 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={`#${id}`}
                    onClick={(e) => go(e, id)}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex items-baseline gap-4 px-2 transition-transform duration-300 hover:translate-x-2"
                  >
                    <span className="font-mono text-sm text-brand-cyan/60 w-6">{String(index + 1).padStart(2, "0")}.</span>
                    <span
                      className={`relative text-3xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 ${
                        isActive ? "text-brand-cyan" : "text-white group-hover:text-brand-cyan"
                      }`}
                    >
                      {label}
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand-cyan to-brand-green transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                    {isActive && <span className="h-2 w-2 rounded-full bg-brand-green shadow-[0_0_10px_#00bf8f] self-center" />}
                  </a>
                </motion.li>
              );
            })}
          </ul>

          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 font-mono text-xs text-white/50">
            {profile.socials.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-brand-cyan transition-colors">
                {label.toLowerCase()} ↗
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
