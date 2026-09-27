import { motion } from "framer-motion";

const COLORS = ["#1cd8d2", "#00bf8f", "#6d63ff", "#ffffff", "#FFD700"];

// Fixed pieces so renders stay pure; `burstKey` replays the animation.
const PIECES = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2;
  const dist = 90 + ((i * 37) % 70);
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 40,
    rotate: (i * 67) % 360,
    color: COLORS[i % COLORS.length],
    w: i % 3 === 0 ? 10 : 6,
  };
});

export default function Confetti({ burstKey }) {
  if (!burstKey) return null;
  return (
    <div key={burstKey} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-20">
      {PIECES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[2px]"
          style={{ width: p.w, height: 6, background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 120], opacity: [1, 1, 0], rotate: p.rotate + 360, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
