import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import SpotlightCard from "../components/ui/SpotlightCard";
import Marquee from "../components/ui/Marquee";
import { allSkills, skillCategories } from "../data/skills";

const tabs = [{ key: "all", title: "All" }, ...skillCategories.map(({ key, title }) => ({ key, title }))];

const half = Math.ceil(allSkills.length / 2);
const marqueeRows = [allSkills.slice(0, half), allSkills.slice(half)];

function MarqueeChip({ skill }) {
  const Icon = skill.icon;
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-sm text-white/70 whitespace-nowrap">
      <Icon className="text-brand-cyan text-lg" />
      {skill.name}
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState("all");

  const visible = useMemo(
    () => (active === "all" ? allSkills : allSkills.filter((s) => s.category === active)),
    [active]
  );

  return (
    <section id="skills" className="w-full py-24 flex flex-col items-center relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-brand-indigo via-brand-green to-brand-cyan opacity-20 blur-[120px] animate-aurora" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-brand-indigo via-brand-green to-brand-cyan opacity-20 blur-[120px] animate-aurora [animation-delay:-8s]" />
      </div>

      <SectionHeading
        index="02"
        eyebrow="skills"
        title="My Tech Stack"
        subtitle="Modern applications, modern technologies — from pixel to database."
        className="px-6"
      />

      {/* Marquees */}
      <div className="relative z-10 w-full mt-12 flex flex-col gap-4">
        <Marquee items={marqueeRows[0]} duration={45} renderItem={(s) => <MarqueeChip skill={s} />} />
        <Marquee items={marqueeRows[1]} duration={50} reverse renderItem={(s) => <MarqueeChip skill={s} />} />
      </div>

      {/* Tabs */}
      <div className="relative z-10 w-full max-w-5xl px-4 sm:px-8 mt-14">
        <div role="tablist" aria-label="Skill categories" className="flex gap-2 overflow-x-auto no-scrollbar justify-start sm:justify-center pb-2">
          {tabs.map((t) => {
            const selected = active === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(t.key)}
                className={`relative shrink-0 rounded-full px-5 py-2 font-mono text-sm transition-colors ${
                  selected ? "text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-cyan to-brand-green shadow-[0_0_20px_rgba(28,216,210,0.5)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.title}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={`${s.category}-${s.name}`}
                  layout
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.4) }}
                >
                  <SpotlightCard className="group rounded-2xl bg-white/[0.03] h-full" title={s.name}>
                    <div className="flex flex-col items-center justify-center gap-2 px-2 py-5">
                      <Icon className="text-4xl sm:text-5xl text-brand-cyan transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_14px_rgba(28,216,210,0.8)]" />
                      <p className="text-[11px] sm:text-sm text-white/80 text-center leading-tight">{s.name}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
