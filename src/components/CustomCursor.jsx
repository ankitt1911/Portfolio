import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useFinePointer from "../hooks/useFinePointer";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const glowX = useSpring(x, { stiffness: 80, damping: 20 });
  const glowY = useSpring(y, { stiffness: 80, damping: 20 });

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      const target = e.target.closest?.(INTERACTIVE);
      setHovering(Boolean(target));
      setLabel(target?.getAttribute("data-cursor-label") || "");
    };
    const leave = (e) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringScale = pressed ? 0.8 : label ? 2.6 : hovering ? 1.8 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9998]" style={{ opacity: visible ? 1 : 0 }}>
      {/* Soft trailing glow */}
      <motion.div
        className="absolute left-0 top-0 h-40 w-40 -ml-20 -mt-20 rounded-full bg-gradient-to-r from-brand-cyan/40 to-brand-indigo/40 blur-3xl"
        style={{ x: glowX, y: glowY }}
      />
      {/* Ring */}
      <motion.div className="absolute left-0 top-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-ml-4 -mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-brand-cyan/70 mix-blend-difference"
          animate={{ scale: ringScale, backgroundColor: hovering ? "rgba(28,216,210,0.15)" : "rgba(28,216,210,0)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {label && <span className="font-mono text-[5px] uppercase tracking-widest text-white">{label}</span>}
        </motion.div>
      </motion.div>
      {/* Dot */}
      <motion.div
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#1cd8d2]"
        style={{ x, y }}
      />
    </div>
  );
}
