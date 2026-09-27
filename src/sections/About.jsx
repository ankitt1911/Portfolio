import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import p from "../assets/aky.jpeg";
import SectionHeading from "../components/ui/SectionHeading";
import SpotlightCard from "../components/ui/SpotlightCard";
import MagneticButton from "../components/ui/MagneticButton";
import Reveal from "../components/ui/Reveal";
import { profile } from "../data/profile";
import { experiences } from "../data/experience";
import { allSkills } from "../data/skills";

const stats = [
  { value: experiences.length, suffix: "", label: "Engineering roles" },
  { value: new Set(allSkills.map((s) => s.name)).size, suffix: "+", label: "Technologies" },
  { value: 0, suffix: "", label: "Full-stack specialty", text: "MERN" },
  { value: profile.since, suffix: "", label: "Shipping professionally since" },
];

function Counter({ value, suffix, text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || text || !ref.current) return;
    const from = value > 1000 ? value - 25 : 0;
    const controls = animate(from, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, text]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-extrabold text-gradient">
      {text ?? `${value}${suffix}`}
    </span>
  );
}

function AboutJson() {
  return (
    <pre className="font-mono text-[11px] sm:text-[13px] leading-relaxed whitespace-pre-wrap break-words p-5">
      <span className="tok-com">{"// about.json"}</span>
      {"\n"}
      <span className="tok-pun">{"{"}</span>
      {"\n  "}<span className="tok-prop">"name"</span><span className="tok-pun">: </span><span className="tok-str">"{profile.name}"</span><span className="tok-pun">,</span>
      {"\n  "}<span className="tok-prop">"role"</span><span className="tok-pun">: </span><span className="tok-str">"{profile.title}"</span><span className="tok-pun">,</span>
      {"\n  "}<span className="tok-prop">"based"</span><span className="tok-pun">: </span><span className="tok-str">"{profile.location}"</span><span className="tok-pun">,</span>
      {"\n  "}<span className="tok-prop">"stack"</span><span className="tok-pun">: [</span><span className="tok-str">"MongoDB"</span><span className="tok-pun">, </span><span className="tok-str">"Express"</span><span className="tok-pun">, </span><span className="tok-str">"React"</span><span className="tok-pun">, </span><span className="tok-str">"Node"</span><span className="tok-pun">],</span>
      {"\n  "}<span className="tok-prop">"loves"</span><span className="tok-pun">: [</span><span className="tok-str">"clean APIs"</span><span className="tok-pun">, </span><span className="tok-str">"fast UIs"</span><span className="tok-pun">, </span><span className="tok-str">"secure auth"</span><span className="tok-pun">],</span>
      {"\n  "}<span className="tok-prop">"openToWork"</span><span className="tok-pun">: </span><span className="tok-num">true</span>
      {"\n"}
      <span className="tok-pun">{"}"}</span>
    </pre>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
      aria-label="About me"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 -left-10 w-[360px] h-[360px] rounded-full bg-gradient-to-r from-brand-indigo via-brand-green to-brand-cyan opacity-20 blur-[120px] animate-aurora" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-gradient-to-r from-brand-cyan via-brand-green to-brand-indigo opacity-15 blur-[140px] animate-aurora [animation-delay:-7s]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-24 flex flex-col gap-14">
        <SectionHeading index="01" eyebrow="about" title="Who I Am" subtitle="Frontend polish, backend muscle — one developer, the whole stack." />

        <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-center">
          {/* Photo with rotating conic border */}
          <Reveal x={-40} y={0} className="mx-auto">
            <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-3xl p-[2px] overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute inset-[-50%] animate-spin-slow"
                style={{ background: "conic-gradient(from 0deg, transparent 0 40%, #1CD8D2, #00bf8f, transparent 70%)" }}
              />
              <motion.div
                className="relative h-full w-full rounded-[22px] overflow-hidden bg-black"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <img src={p} alt="Portrait of Ankit Kumar Yadav" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 font-mono text-[11px] text-brand-cyan bg-black/60 px-2 py-0.5 rounded">
                  ● online
                </span>
              </motion.div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 text-center lg:text-left">
            <Reveal>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {profile.name}
                <span className="block mt-1 text-lg sm:text-xl font-mono font-medium text-brand-cyan">
                  {"<"}
                  {profile.title}
                  {" />"}
                </span>
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">{profile.bio}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-gray-400 leading-relaxed text-base sm:text-lg">{profile.bioLong}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-brand-green/90 font-mono text-sm">{"// "}{profile.availability}</p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <MagneticButton href="#architecture">See How I Build</MagneticButton>
                <MagneticButton href="#contact" variant="ghost">
                  Get in Touch
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <SpotlightCard className="rounded-2xl bg-white/[0.03] p-5 h-full">
                <div className="flex flex-col gap-1">
                  <Counter value={s.value} suffix={s.suffix} text={s.text} />
                  <span className="text-xs sm:text-sm text-white/60">{s.label}</span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <SpotlightCard className="rounded-2xl bg-[#05080a]/80 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-white/40">~/ankit/about.json</span>
            </div>
            <AboutJson />
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
