import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { FiMonitor, FiShield, FiServer, FiDatabase, FiCloud, FiPlay } from "react-icons/fi";
import SectionHeading from "../components/ui/SectionHeading";
import SpotlightCard from "../components/ui/SpotlightCard";
import MagneticButton from "../components/ui/MagneticButton";
import { skillsByLayer } from "../data/skills";
import useIsMobile from "../hooks/useIsMobile";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const layers = {
  client: { title: "Client", role: "React UI · state · routing", icon: FiMonitor, color: "28, 216, 210" },
  auth: { title: "Auth", role: "JWT · bcrypt · validation", icon: FiShield, color: "199, 146, 234" },
  api: { title: "API Server", role: "Node.js + Express REST", icon: FiServer, color: "0, 191, 143" },
  db: { title: "Database", role: "MongoDB · SQL · Firebase", icon: FiDatabase, color: "71, 162, 72" },
  deploy: { title: "Deploy & Tools", role: "Git · CI · Vercel", icon: FiCloud, color: "130, 170, 255" },
};

// Desktop diagram, laid out in a 1000 × 440 coordinate space.
const VIEW = { w: 1000, h: 440 };
const nodePos = {
  client: { x: 115, y: 220 },
  auth: { x: 500, y: 70 },
  api: { x: 500, y: 220 },
  db: { x: 885, y: 220 },
  deploy: { x: 500, y: 375 },
};
const edges = [
  { id: "client-api", d: "M 195 220 C 280 160, 330 280, 415 220", req: "GET /api/users", res: "200 OK · json" },
  { id: "api-auth", d: "M 470 180 C 440 150, 440 130, 470 105", req: "verify(jwt)", res: "✓ user" },
  { id: "api-db", d: "M 585 220 C 670 280, 720 160, 805 220", req: "db.users.find()", res: "[ docs ]" },
  { id: "api-deploy", d: "M 530 262 C 560 290, 560 315, 530 340", dashed: true },
];

// Mobile: a vertical chain.
const mobileOrder = ["client", "auth", "api", "db", "deploy"];
const mobileLinks = ["Bearer <jwt>", "req.user ✓", "db.users.find()", "git push → deploy"];

const demoSteps = [
  { node: "client", log: "→ POST /auth/login  { email, password }" },
  { node: "api", log: "  router → authController.login()" },
  { node: "db", log: "✓ mongo: users.findOne() · 1 doc (12ms)" },
  { node: "auth", log: "✓ bcrypt.compare() ok · jwt.sign() → token" },
  { node: "client", log: "← 200 OK  { token }" },
  { node: "api", log: "→ GET /api/profile  Authorization: Bearer eyJ…" },
  { node: "auth", log: "✓ jwt.verify() → user 64f2…a91" },
  { node: "db", log: "✓ mongo: profiles.findById() (8ms)" },
  { node: "client", log: "← 200 OK (48ms) · UI rendered ✨" },
];

function NodeCard({ id, active, lit, onSelect, compact }) {
  const layer = layers[id];
  const Icon = layer.icon;
  const count = skillsByLayer(id).length;
  const highlighted = active || lit;

  return (
    <SpotlightCard
      as="button"
      type="button"
      glow={layer.color}
      onMouseEnter={() => onSelect(id)}
      onFocus={() => onSelect(id)}
      onClick={() => onSelect(id)}
      aria-pressed={active}
      className={`rounded-2xl text-left bg-black/80 backdrop-blur-md transition-all duration-300 ${
        compact ? "w-full" : "w-[190px]"
      } ${highlighted ? "scale-105" : ""}`}
      style={{
        boxShadow: highlighted ? `0 0 34px rgba(${layer.color}, ${lit ? 0.75 : 0.4})` : "0 0 0 rgba(0,0,0,0)",
      }}
    >
      <div className="flex items-center gap-3 p-3.5">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl"
          style={{ background: `rgba(${layer.color}, 0.12)`, color: `rgb(${layer.color})` }}
        >
          <Icon />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-bold text-white">{layer.title}</span>
          <span className="block font-mono text-[10px] leading-snug text-white/50">{layer.role}</span>
        </span>
      </div>
      <span className="absolute top-2 right-3 font-mono text-[9px] text-white/30">{count}</span>
      {lit && (
        <span
          className="absolute -inset-px rounded-2xl border-2 animate-pulse pointer-events-none"
          style={{ borderColor: `rgb(${layer.color})` }}
        />
      )}
    </SpotlightCard>
  );
}

function Edge({ edge, index, progress, showPackets }) {
  const start = index * 0.15;
  const pathLength = useTransform(progress, [start, start + 0.35], [0, 1]);
  const pathId = `arch-edge-${edge.id}`;

  return (
    <g>
      <path d={edge.d} stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path id={pathId} d={edge.d} fill="none" stroke="none" />
      <motion.path
        d={edge.d}
        stroke="url(#arch-gradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={edge.dashed ? "6 8" : undefined}
        style={{ pathLength }}
        filter="url(#arch-glow)"
      />

      {edge.req && (
        <text className="font-mono" fontSize="11" fill="rgba(28,216,210,0.75)" dy="-12">
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {edge.req}
          </textPath>
        </text>
      )}
      {edge.res && (
        <text className="font-mono" fontSize="11" fill="rgba(0,191,143,0.7)" dy="22">
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {edge.res}
          </textPath>
        </text>
      )}

      {showPackets && (
        <>
          {[0, 1].map((k) => (
            <circle key={`req-${k}`} r="4.5" fill="#1cd8d2" filter="url(#arch-glow)">
              <animateMotion dur="2.4s" begin={`${index * 0.3 + k * 1.2}s`} repeatCount="indefinite" rotate="auto">
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
          ))}
          {!edge.dashed && (
            <circle r="3.5" fill="#00bf8f" filter="url(#arch-glow)">
              <animateMotion
                dur="2.4s"
                begin={`${index * 0.3 + 0.6}s`}
                repeatCount="indefinite"
                keyPoints="1;0"
                keyTimes="0;1"
                calcMode="linear"
              >
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
          )}
        </>
      )}
    </g>
  );
}

function MobileLink({ label, showPackets }) {
  return (
    <div className="relative flex h-16 items-center justify-center">
      <svg viewBox="0 0 20 64" className="h-16 w-5" aria-hidden="true">
        <path d="M 10 0 L 10 64" stroke="rgba(28,216,210,0.5)" strokeWidth="2" strokeDasharray="4 4" />
        {showPackets && (
          <circle r="3.5" cx="0" cy="0" fill="#1cd8d2">
            <animateMotion dur="1.4s" repeatCount="indefinite" path="M 10 0 L 10 64" />
          </circle>
        )}
      </svg>
      <span className="absolute left-1/2 ml-5 font-mono text-[10px] text-brand-cyan/70">{label}</span>
    </div>
  );
}

function Inspector({ id }) {
  const layer = layers[id];
  const tech = skillsByLayer(id);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
      >
        <p className="font-mono text-xs text-white/40 mb-3">
          <span className="text-brand-green">inspect</span> ./{id} <span className="text-white/30">— {layer.role}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.span
                key={t.name}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs text-white/85"
                style={{ borderColor: `rgba(${layer.color}, 0.35)`, background: `rgba(${layer.color}, 0.06)` }}
              >
                <Icon style={{ color: `rgb(${layer.color})` }} />
                {t.name}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Architecture() {
  const diagramRef = useRef(null);
  const consoleRef = useRef(null);
  const timers = useRef([]);
  const isMobile = useIsMobile(1024);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(diagramRef, { amount: 0.2 });
  const showPackets = inView && !reduced;

  const [active, setActive] = useState("api");
  const [lit, setLit] = useState(null);
  const [logs, setLogs] = useState(["$ ready — press “Send request” to trace a full-stack round trip"]);
  const [running, setRunning] = useState(false);

  const { scrollYProgress } = useScroll({ target: diagramRef, offset: ["start 85%", "center 55%"] });

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const el = consoleRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  const runDemo = () => {
    if (running) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setLogs(["$ curl -X POST https://api.ankit.dev/auth/login"]);

    demoSteps.forEach((step, i) => {
      timers.current.push(
        setTimeout(() => {
          setLit(step.node);
          setLogs((l) => [...l, step.log].slice(-10));
        }, 450 + i * 650)
      );
    });
    timers.current.push(
      setTimeout(() => {
        setLit(null);
        setRunning(false);
      }, 450 + demoSteps.length * 650 + 400)
    );
  };

  return (
    <section id="architecture" className="relative w-full bg-black text-white py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-green/10 blur-[140px] animate-aurora" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-indigo/30 blur-[140px] animate-aurora [animation-delay:-9s]" />
      </div>

      <SectionHeading
        index="03"
        eyebrow="architecture"
        title="How I Build"
        subtitle="Full stack, end to end — hover a layer to inspect it, or fire a request and watch it travel."
        className="px-6"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mt-14">
        {/* Shared SVG defs */}
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id="arch-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1cd8d2" />
              <stop offset="50%" stopColor="#00bf8f" />
              <stop offset="100%" stopColor="#6d63ff" />
            </linearGradient>
            <filter id="arch-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        <div ref={diagramRef}>
          {isMobile ? (
            <div className="mx-auto max-w-sm">
              {mobileOrder.map((id, i) => (
                <div key={id}>
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <NodeCard id={id} active={active === id} lit={lit === id} onSelect={setActive} compact />
                  </motion.div>
                  {i < mobileLinks.length && <MobileLink label={mobileLinks[i]} showPackets={showPackets} />}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative w-full" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
              <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
                {edges.map((edge, i) => (
                  <Edge key={edge.id} edge={edge} index={i} progress={scrollYProgress} showPackets={showPackets} />
                ))}
              </svg>

              {Object.entries(nodePos).map(([id, pos], i) => (
                <motion.div
                  key={id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${(pos.x / VIEW.w) * 100}%`, top: `${(pos.y / VIEW.h) * 100}%` }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18, delay: i * 0.1 }}
                >
                  <NodeCard id={id} active={active === id} lit={lit === id} onSelect={setActive} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Inspector + request console */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <SpotlightCard className="rounded-2xl bg-black/70 backdrop-blur-md p-5 min-h-[180px]">
            <Inspector id={active} />
          </SpotlightCard>

          <SpotlightCard className="rounded-2xl bg-[#05080a]/90 overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[11px] text-white/40">request.log</span>
              </div>
              <MagneticButton as="button" onClick={runDemo} disabled={running} strength={0.2} className="!px-4 !py-1.5 !text-xs font-mono">
                <FiPlay /> {running ? "running…" : "Send request"}
              </MagneticButton>
            </div>
            <div
              ref={consoleRef}
              data-lenis-prevent
              role="log"
              aria-live="polite"
              className="h-[180px] overflow-y-auto px-4 py-3 font-mono text-[11px] sm:text-xs leading-relaxed"
            >
              {logs.map((line, i) => (
                <motion.p
                  key={`${i}-${line}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    line.startsWith("✓")
                      ? "text-brand-green"
                      : line.startsWith("←")
                      ? "text-brand-cyan"
                      : line.startsWith("$")
                      ? "text-white/50"
                      : "text-white/85"
                  }
                >
                  {line}
                </motion.p>
              ))}
              {running && <span className="inline-block h-3.5 w-2 bg-brand-cyan animate-blink" />}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
