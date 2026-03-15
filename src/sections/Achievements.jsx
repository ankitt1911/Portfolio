import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { GiPunchBlast, GiLaurelsTrophy, GiPublicSpeaker } from "react-icons/gi";
import { MdGroups, MdCampaign } from "react-icons/md";

const achievements = [
  {
    icon: <GiPunchBlast />,
    title: "State Level Player",
    subtitle: "Martial Arts",
    level: "State Level",
    color: "#FFD700",
    gradient: "from-yellow-500 via-amber-400 to-yellow-600",
    bgGlow: "rgba(255, 215, 0, 0.15)",
    description:
      "Represented at the state level in Martial Arts — a testament to years of discipline, rigorous training, and competitive spirit.",
  },
  {
    icon: <GiPublicSpeaker />,
    title: "Debate Champion",
    subtitle: "Public Speaking",
    level: "District Level",
    color: "#C0C0C0",
    gradient: "from-slate-300 via-gray-200 to-slate-400",
    bgGlow: "rgba(192, 192, 192, 0.15)",
    description:
      "Claimed the championship title at the district level debate competition — sharp articulation, logical reasoning, and persuasive power.",
  },
  {
    icon: <MdGroups />,
    title: "Tech Fest Head Volunteer",
    subtitle: "Leadership & Event Management",
    level: "College Level",
    color: "#1cd8d2",
    gradient: "from-cyan-400 via-teal-300 to-emerald-400",
    bgGlow: "rgba(28, 216, 210, 0.15)",
    description:
      "Led as Head Volunteer in the college tech fest — orchestrating teams, managing events, and ensuring a seamless experience for hundreds of participants.",
  },
  {
    icon: <MdCampaign />,
    title: "Social Awareness Award",
    subtitle: "UP Traffic Police Recognition",
    level: "State Recognition",
    color: "#ff6b6b",
    gradient: "from-red-400 via-orange-400 to-amber-400",
    bgGlow: "rgba(255, 107, 107, 0.15)",
    description:
      "Awarded by Uttar Pradesh Traffic Police for conceptualizing and executing a high-impact public awareness campaign on road safety — engaging 1,000+ community members and driving measurable behavioral change.",
  },
];

function TiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [8, -8]);
  const rotateY = useTransform(x, [-150, 150], [-8, 8]);

  function handleMouse(e) {
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

function FloatingParticles({ color }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: color,
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AchievementCard({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full"
    >
      <TiltCard className="relative cursor-pointer perspective-[1000px]">
        <motion.div
          className="relative rounded-3xl border border-white/10 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
            backdropFilter: "blur(20px)",
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow border effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              boxShadow: `0 0 40px ${item.bgGlow}, inset 0 0 40px ${item.bgGlow}`,
            }}
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          />

          <FloatingParticles color={item.color} />

          <div className="relative z-10 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {/* Medal / Icon Section */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              {/* Animated ring behind icon */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px solid ${item.color}`,
                    filter: `drop-shadow(0 0 10px ${item.color})`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${item.bgGlow}, transparent 70%)`,
                    color: item.color,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${item.bgGlow}`,
                      `0 0 40px ${item.bgGlow}`,
                      `0 0 20px ${item.bgGlow}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {item.icon}
                </motion.div>
              </div>


            </div>

            {/* Text Content */}
            <div className="flex-1 text-center sm:text-left">
              {/* Level badge */}
              <motion.span
                className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 bg-gradient-to-r ${item.gradient} text-black`}
                whileHover={{ scale: 1.05 }}
              >
                {item.level}
              </motion.span>

              <h3
                className="text-xl sm:text-2xl font-extrabold mb-1"
                style={{ color: item.color }}
              >
                {item.title}
              </h3>

              <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                {item.subtitle}
              </p>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-lg">
                {item.description}
              </p>

              {/* Decorative line */}
              <motion.div
                className="mt-4 h-[2px] rounded-full"
                style={{
                  background: `linear-gradient(to right, ${item.color}, transparent)`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col items-center justify-center"
    >
      {/* Background glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-10 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-yellow-500/20 via-amber-400/10 to-transparent blur-[130px] animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-slate-300/15 via-gray-400/10 to-transparent blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#302b63]/20 via-[#00bf8f]/10 to-[#1cd8d2]/10 blur-[150px]" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <GiLaurelsTrophy className="text-6xl sm:text-7xl text-[#FFD700] mx-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]" />
        </motion.div>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-[#00bf8f] to-[#1cd8d2]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Achievements
        </motion.h2>

        <motion.p
          className="mt-3 text-white/60 text-base sm:text-lg max-w-md mx-auto"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Beyond the code — discipline, voice, and victories
        </motion.p>

        {/* Decorative line under heading */}
        <motion.div
          className="mt-4 mx-auto h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: 200 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        />
      </div>

      {/* Achievement Cards */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-5">
        {achievements.map((item, i) => (
          <AchievementCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
