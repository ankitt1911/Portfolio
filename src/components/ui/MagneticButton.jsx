import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useFinePointer from "../../hooks/useFinePointer";

const variants = {
  primary:
    "text-black font-semibold bg-gradient-to-r from-brand-cyan via-brand-green to-brand-cyan bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-[0_0_24px_rgba(28,216,210,0.35)] hover:shadow-[0_0_40px_rgba(28,216,210,0.6)]",
  ghost:
    "text-white font-medium border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-brand-cyan/60",
};

export default function MagneticButton({
  as = "a",
  variant = "primary",
  strength = 0.35,
  className = "",
  children,
  ...props
}) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 250, damping: 15, mass: 0.3 });

  const onMove = (e) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = as === "button" ? motion.button : motion.a;

  return (
    <Comp
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-base sm:text-lg transition-[background-position,box-shadow,background-color,border-color] duration-500 disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Comp>
  );
}
