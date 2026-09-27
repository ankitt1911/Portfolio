import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiExpress, SiMongodb, SiJavascript, SiTailwindcss } from "react-icons/si";
import { FiDownload, FiArrowRight } from "react-icons/fi";
import avatar from "../assets/avator.png";
import ParticleBackground from "../components/ParticlesBackground";
import ScrambleText from "../components/ui/ScrambleText";
import MagneticButton from "../components/ui/MagneticButton";
import { profile } from "../data/profile";
import useFinePointer from "../hooks/useFinePointer";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const orbitBadges = [
  { Icon: FaReact, label: "React", color: "#61dafb" },
  { Icon: FaNodeJs, label: "Node.js", color: "#83cd29" },
  { Icon: SiExpress, label: "Express", color: "#ffffff" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47a248" },
  { Icon: SiJavascript, label: "JavaScript", color: "#f7df1e" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#38bdf8" },
];

const mern = ["MongoDB", "Express", "React", "Node.js"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

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

function useTypewriter(words) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let delay = deleting ? 35 : 65;
    let next;

    if (!deleting && subIndex === current.length) {
      delay = 1400;
      next = () => setDeleting(true);
    } else if (deleting && subIndex === 0) {
      next = () => {
        setDeleting(false);
        setIndex((p) => (p + 1) % words.length);
      };
    } else {
      next = () => setSubIndex((v) => v + (deleting ? -1 : 1));
    }

    const t = setTimeout(next, delay);
    return () => clearTimeout(t);
  }, [subIndex, deleting, index, words]);

  return words[index].substring(0, subIndex);
}

function CodeCard() {
  return (
    <div className="floating-card rounded-xl border border-brand-cyan/25 bg-black/70 backdrop-blur-md shadow-[0_0_40px_rgba(28,216,210,0.15)] font-mono text-[12px] leading-relaxed w-[290px]">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-white/40 text-[10px]">developer.js</span>
      </div>
      <pre className="px-4 py-3 whitespace-pre">
        <span className="tok-key">const</span> <span className="tok-var">ankit</span> <span className="tok-pun">=</span> <span className="tok-pun">{"{"}</span>
        {"\n  "}<span className="tok-prop">stack</span><span className="tok-pun">:</span> <span className="tok-str">"MERN"</span><span className="tok-pun">,</span>
        {"\n  "}<span className="tok-prop">frontend</span><span className="tok-pun">:</span> <span className="tok-str">"React"</span><span className="tok-pun">,</span>
        {"\n  "}<span className="tok-prop">backend</span><span className="tok-pun">:</span> <span className="tok-str">"Node + Express"</span><span className="tok-pun">,</span>
        {"\n  "}<span className="tok-prop">db</span><span className="tok-pun">:</span> <span className="tok-str">"MongoDB"</span><span className="tok-pun">,</span>
        {"\n  "}<span className="tok-prop">openToWork</span><span className="tok-pun">:</span> <span className="tok-num">true</span>
        {"\n"}<span className="tok-pun">{"};"}</span>
      </pre>
    </div>
  );
}

export default function Home({ introDone }) {
  const typed = useTypewriter(profile.roles);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const parallax = fine && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const avatarX = useTransform(sx, (v) => v * 14);
  const avatarY = useTransform(sy, (v) => v * 10);
  const glowX = useTransform(sx, (v) => v * -24);
  const glowY = useTransform(sy, (v) => v * -18);
  const orbitX = useTransform(sx, (v) => v * 8);
  const cardX = useTransform(sx, (v) => v * -18);
  const cardY = useTransform(sy, (v) => v * -12);

  useEffect(() => {
    if (!parallax) return;
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax, mx, my]);

  const state = introDone ? "show" : "hidden";

  return (
    <section id="home" className="min-h-[100svh] lg:h-screen w-full relative overflow-hidden bg-black">
      {/* Background layers */}
      <ParticleBackground />
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] max-w-[520px] max-h-[520px] rounded-full bg-gradient-to-r from-brand-indigo via-brand-green to-brand-cyan opacity-25 blur-[80px] md:blur-[140px] animate-aurora" />
        <div className="absolute bottom-0 right-0 w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] max-w-[520px] max-h-[520px] rounded-full bg-gradient-to-r from-brand-cyan via-brand-green to-brand-indigo opacity-30 blur-[80px] md:blur-[140px] animate-aurora [animation-delay:-9s]" />
        <div className="absolute top-1/3 left-1/2 w-[30vw] h-[30vw] max-w-[380px] max-h-[380px] rounded-full bg-[#6d63ff] opacity-10 blur-[120px] animate-aurora [animation-delay:-4s]" />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          className="flex flex-col justify-center min-h-[100svh] lg:min-h-0 lg:h-full text-center lg:text-left pt-20 pb-24 lg:py-0"
          variants={container}
          initial="hidden"
          animate={state}
        >
          <div className="w-full lg:pr-12 mx-auto max-w-[48rem]">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/10 font-mono text-xs text-brand-green"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
              </span>
              available for full-stack roles
            </motion.div>

            <motion.div
              variants={item}
              className="mb-3 font-mono text-lg sm:text-2xl md:text-3xl font-medium text-white/90 min-h-[1.6em]"
            >
              <span className="text-brand-green">&gt; </span>
              <span>{typed}</span>
              <span className="inline-block w-[0.55em] h-[1em] ml-1 bg-brand-cyan align-[-0.15em] animate-blink" />
            </motion.div>

            <motion.h1 variants={item} className="font-extrabold tracking-tight">
              <span className="block text-3xl sm:text-5xl md:text-6xl text-gradient-animated">Hello, I&apos;m</span>
              <span className="block mt-1 text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl text-white lg:whitespace-nowrap drop-shadow-[0_0_30px_rgba(28,216,210,0.25)]">
                <ScrambleText text={profile.name} trigger={introDone} duration={1600} />
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              {profile.tagline}
            </motion.p>

            {/* Mobile MERN chips */}
            <motion.div variants={item} className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden">
              {mern.map((t) => (
                <span key={t} className="font-mono text-xs px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan">
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5">
              <MagneticButton href="#architecture">
                Explore My Stack <FiArrowRight />
              </MagneticButton>
              <MagneticButton href={profile.resumeUrl} download variant="ghost">
                <FiDownload /> My Resume
              </MagneticButton>
            </motion.div>

            <motion.div variants={item} className="mt-5">
              <a href="#terminal" className="font-mono text-sm text-white/50 hover:text-brand-cyan transition-colors">
                or try my terminal <span className="text-brand-cyan">→</span>
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
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
                  className="text-gray-300 hover:text-white"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right (desktop) */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute top-1/2 right-[8%] -translate-y-1/2 pointer-events-none"
            style={{ x: glowX, y: glowY, width: "min(26vw, 440px)", height: "min(26vw, 440px)" }}
          >
            <div
              className="h-full w-full rounded-full animate-spin-slow"
              style={{
                filter: "blur(50px)",
                opacity: 0.45,
                background: "conic-gradient(from 0deg, #1CD8D2, #00bf8f, #302b63, #6d63ff, #1CD8D2)",
              }}
            />
          </motion.div>

          {/* Orbit ring with tech badges */}
          <motion.div
            aria-hidden="true"
            className="absolute top-1/2 right-[3%] -translate-y-1/2 pointer-events-none"
            style={{ x: orbitX, width: "min(36vw, 560px)", height: "min(36vw, 560px)" }}
          >
            <div className="absolute inset-0 rounded-full border border-dashed border-brand-cyan/20" />
            <div className="absolute inset-[12%] rounded-full border border-white/5" />
            <div className="absolute inset-0 animate-orbit">
              {orbitBadges.map(({ Icon, label, color }, i) => {
                const angle = (i / orbitBadges.length) * 360;
                return (
                  <div
                    key={label}
                    className="absolute left-1/2 top-1/2 h-0 w-0"
                    style={{ transform: `rotate(${angle}deg) translateX(min(18vw, 280px)) rotate(${-angle}deg)` }}
                  >
                    <div className="animate-orbit-reverse">
                      <div
                        className="-ml-6 -mt-6 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/70 backdrop-blur text-2xl shadow-[0_0_20px_rgba(28,216,210,0.25)]"
                        style={{ color }}
                        title={label}
                      >
                        <Icon />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.img
            src={avatar}
            alt="Ankit Kumar Yadav avatar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            style={{ x: avatarX, y: avatarY, right: "-30px", width: "min(45vw, 780px)", maxHeight: "90vh" }}
          />

          <motion.div className="absolute bottom-[12%] left-0 hidden xl:block" style={{ x: cardX, y: cardY }}>
            <CodeCard />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/40 hover:text-brand-cyan transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 1.8 }}
      >
        <span className="h-9 w-5 rounded-full border-2 border-current flex justify-center pt-1.5">
          <span className="h-2 w-1 rounded-full bg-current animate-scroll-dot" />
        </span>
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
      </motion.a>
    </section>
  );
}
