import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import SpotlightCard from "../components/ui/SpotlightCard";
import Confetti from "../components/ui/Confetti";
import { complete, execute } from "./terminal/commands";
import { scrollToSection } from "../lib/scroll";

const PROMPT_USER = "ankit@portfolio";
const quickCommands = ["help", "whoami", "skills", "experience", "neofetch", "resume", "contact", "sudo hire-me", "clear"];

const bootScript = [
  { type: "dim", text: `Last login: ${new Date().toDateString()} on ttys001` },
  { type: "accent", text: "Welcome to ankit-os v2.0 (MERN x86_64)" },
  { type: "out", text: "Type 'help' to see what I can do, or tap a command below." },
];

const typeStyles = {
  out: "text-white/85",
  dim: "text-white/40",
  accent: "text-brand-cyan font-bold",
  ok: "text-brand-green",
  err: "text-red-400",
  pre: "text-white/85 whitespace-pre",
  link: "text-[#82aaff] underline decoration-dotted underline-offset-4 hover:text-brand-cyan",
};

let lineId = 0;
const withIds = (lines) => lines.map((l) => ({ ...l, id: ++lineId }));

function Prompt() {
  return (
    <span className="shrink-0">
      <span className="text-brand-green">{PROMPT_USER}</span>
      <span className="text-white/50">:</span>
      <span className="text-[#82aaff]">~</span>
      <span className="text-white/50">$ </span>
    </span>
  );
}

export default function Terminal() {
  const windowRef = useRef(null);
  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);
  const historyIdx = useRef(-1);
  const inView = useInView(windowRef, { once: true, amount: 0.35 });

  const [lines, setLines] = useState([]);
  const [booted, setBooted] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false);
  const [burst, setBurst] = useState(0);

  const later = useCallback((fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Boot sequence: type each boot line out character by character.
  const finishBoot = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLines(withIds(bootScript));
    setBooted(true);
  }, []);

  useEffect(() => {
    if (!inView || booted) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      finishBoot();
      return;
    }

    let t = 200;
    bootScript.forEach((line, li) => {
      for (let c = 1; c <= line.text.length; c += 2) {
        const partial = line.text.slice(0, c);
        later(() => {
          setLines((prev) => {
            const next = prev.slice(0, li);
            next[li] = { ...line, text: partial, id: `boot-${li}` };
            return next;
          });
        }, t);
        t += 14;
      }
      t += 180;
    });
    later(finishBoot, t);
  }, [inView, booted, later, finishBoot]);

  // Keep output pinned to the bottom
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, input]);

  const ctx = {
    clear: () => later(() => setLines([]), 0),
    scrollTo: (id, delay = 600) => later(() => scrollToSection(id), delay),
    download: (url) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = url.split("/").pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    celebrate: () => setBurst((b) => b + 1),
  };

  const run = (raw) => {
    const cmd = raw.trim();
    const echo = { type: "cmd", text: raw, id: ++lineId };
    if (!cmd) {
      setLines((prev) => [...prev, echo]);
      return;
    }
    setHistory((h) => (h[h.length - 1] === cmd ? h : [...h, cmd].slice(-50)));
    historyIdx.current = -1;
    const result = execute(cmd, ctx);
    setLines((prev) => [...prev, echo, ...withIds(result)].slice(-200));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      if (!history.length) return;
      let idx = historyIdx.current;
      if (e.key === "ArrowUp") idx = idx === -1 ? history.length - 1 : Math.max(0, idx - 1);
      else idx = idx === -1 ? -1 : idx + 1 >= history.length ? -1 : idx + 1;
      historyIdx.current = idx;
      setInput(idx === -1 ? "" : history[idx]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const options = complete(input);
      if (options.length === 1) setInput(options[0].endsWith("/") ? options[0] : `${options[0]} `);
      else if (options.length > 1) {
        setLines((prev) => [
          ...prev,
          { type: "cmd", text: input, id: ++lineId },
          { type: "out", text: options.map((o) => o.split(" ").pop()).join("   "), id: ++lineId },
        ]);
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setLines([]);
    } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      setLines((prev) => [...prev, { type: "cmd", text: `${input}^C`, id: ++lineId }]);
      setInput("");
    }
  };

  // Chip: type the command into the prompt, then run it.
  const typeAndRun = (cmd) => {
    if (busy) return;
    if (!booted) finishBoot();
    setBusy(true);
    setInput("");
    [...cmd].forEach((_, i) => later(() => setInput(cmd.slice(0, i + 1)), 40 + i * 35));
    later(() => {
      run(cmd);
      setInput("");
      setBusy(false);
    }, 40 + cmd.length * 35 + 200);
  };

  const focusInput = () => {
    if (!booted) finishBoot();
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <section id="terminal" className="relative w-full bg-black text-white py-24 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-brand-cyan/10 blur-[150px] animate-aurora" />
      </div>

      <SectionHeading
        index="08"
        eyebrow="terminal"
        title="Talk to My Terminal"
        subtitle="An interactive shell about me. Type a command — or just tap one."
        className="mb-12"
      />

      <motion.div
        ref={windowRef}
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50, rotateX: 12 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1200 }}
      >
        <SpotlightCard className="rounded-2xl bg-[#05080a]/95 shadow-[0_0_80px_rgba(28,216,210,0.12)] overflow-hidden">
          <Confetti burstKey={burst} />

          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="flex-1 text-center font-mono text-xs text-white/40 -ml-12">{PROMPT_USER}: ~ — zsh</span>
          </div>

          {/* Output */}
          <div
            ref={outputRef}
            data-lenis-prevent
            role="log"
            aria-live="polite"
            onClick={focusInput}
            className="relative h-[380px] md:h-[440px] overflow-y-auto px-4 sm:px-5 py-4 font-mono text-[12.5px] sm:text-sm leading-relaxed cursor-text"
          >
            {/* scanlines */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 3px)" }}
            />

            {lines.map((line) =>
              line.type === "cmd" ? (
                <div key={line.id} className="flex flex-wrap break-all">
                  <Prompt />
                  <span className="text-white">{line.text}</span>
                </div>
              ) : line.type === "link" ? (
                <div key={line.id}>
                  <a
                    href={line.href}
                    target={line.href.startsWith("#") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={typeStyles.link}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {line.text}
                  </a>
                </div>
              ) : (
                <div key={line.id} className={`${typeStyles[line.type] || typeStyles.out} break-words min-h-[1.5em]`}>
                  {line.text}
                </div>
              )
            )}

            {/* Live prompt */}
            {booted && (
              <label className="group flex items-center">
                <Prompt />
                <span className="relative flex-1 min-w-0">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    aria-label="Terminal command input"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="send"
                    className="w-full bg-transparent text-white caret-transparent outline-none focus-visible:outline-none"
                  />
                  <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 whitespace-pre text-transparent">
                    {input}
                    <span className="inline-block w-[0.6em] h-[1.1em] -mb-[0.2em] bg-brand-cyan/40 group-focus-within:bg-brand-cyan animate-blink" />
                  </span>
                </span>
              </label>
            )}
          </div>

          {/* Quick commands */}
          <div className="border-t border-white/10 px-3 py-3 flex gap-2 overflow-x-auto no-scrollbar">
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => typeAndRun(cmd)}
                disabled={busy}
                className="shrink-0 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/70 transition-all hover:border-brand-cyan/60 hover:text-brand-cyan hover:shadow-[0_0_14px_rgba(28,216,210,0.3)] disabled:opacity-50"
              >
                <span className="text-brand-green">$</span> {cmd}
              </button>
            ))}
          </div>
        </SpotlightCard>
      </motion.div>
    </section>
  );
}
