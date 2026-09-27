import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { GiLaurelsTrophy } from "react-icons/gi";
import SectionHeading from "../components/ui/SectionHeading";
import SpotlightCard from "../components/ui/SpotlightCard";
import { achievements } from "../data/achievements";
import useFinePointer from "../hooks/useFinePointer";

function TiltCard({ children, className }) {
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-150, 150], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMouse(e) {
    if (!fine) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

function FloatingParticles({ color }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ background: color, left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          initial={{ opacity: 0 }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function AchievementCard({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full"
    >
      <TiltCard className="relative">
        <motion.div onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
          <SpotlightCard
            glow={item.rgb}
            className="rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl"
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ boxShadow: `inset 0 0 40px ${item.bgGlow}` }}
              animate={{ opacity: isHovered ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
            />

            {isHovered && <FloatingParticles color={item.color} />}

            <div className="relative z-10 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="relative shrink-0">
                <div
                  className="absolute inset-0 rounded-full animate-spin-slow"
                  style={{ border: `2px dashed ${item.color}`, filter: `drop-shadow(0 0 10px ${item.color})` }}
                />
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl transition-shadow duration-500"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${item.bgGlow}, transparent 70%)`,
                    color: item.color,
                    boxShadow: `0 0 ${isHovered ? 40 : 20}px ${item.bgGlow}`,
                  }}
                >
                  <Icon />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <span
                  className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 bg-gradient-to-r ${item.gradient} text-black`}
                >
                  {item.level}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold mb-1" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">{item.subtitle}</p>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-lg">{item.description}</p>
                <motion.div
                  className="mt-4 h-[2px] rounded-full"
                  style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "60%" }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-24 px-6 md:px-20 flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-10 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-yellow-500/20 via-amber-400/10 to-transparent blur-[130px] animate-aurora" />
        <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-slate-300/15 via-gray-400/10 to-transparent blur-[120px] animate-aurora [animation-delay:-8s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-brand-indigo/20 via-brand-green/10 to-brand-cyan/10 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        viewport={{ once: true }}
        className="relative z-10 mb-6"
      >
        <GiLaurelsTrophy className="text-6xl sm:text-7xl text-[#FFD700] mx-auto drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
      </motion.div>

      <SectionHeading
        index="07"
        eyebrow="achievements"
        title="Achievements"
        subtitle="Beyond the code — discipline, voice, and victories"
        className="mb-16"
      />

      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-5">
        {achievements.map((item, i) => (
          <AchievementCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
