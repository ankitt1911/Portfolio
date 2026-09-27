import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const bootLines = [
  { prompt: true, text: "npm run dev" },
  { dim: true, text: "> ankit-portfolio@2.0.0 dev" },
  { dim: true, text: "> vite --host" },
  { ok: true, text: "compiling client", meta: "react@19 · tailwind@4" },
  { ok: true, text: "starting api server", meta: "express → :5000" },
  { ok: true, text: "connecting mongodb", meta: "cluster0 … connected" },
  { ok: true, text: "verifying auth", meta: "jwt · bcrypt" },
  { ok: true, text: "loading modules", meta: "skills, experience, architecture, terminal" },
];

export default function IntroAnimation({ onFinish }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const barRef = useRef(null);
  const percentRef = useRef(null);
  const readyRef = useRef(null);
  const onFinishRef = useRef(onFinish);

  useLayoutEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("introSeen") === "1";
    } catch {
      /* storage unavailable */
    }
    const finish = () => {
      try {
        sessionStorage.setItem("introSeen", "1");
      } catch {
        /* storage unavailable */
      }
      onFinishRef.current?.();
    };

    let tl;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".boot-line");
      const progress = { value: 0 };

      if (reduced) {
        tl = gsap.timeline({ onComplete: finish });
        tl.set(lines, { opacity: 1 }).to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.4 });
        return;
      }

      tl = gsap.timeline({ onComplete: finish });

      tl.from(cardRef.current, { opacity: 0, y: 30, scale: 0.96, duration: 0.45, ease: "power3.out" })
        .fromTo(
          lines,
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.18, stagger: 0.17, ease: "power2.out" },
          "-=0.1"
        )
        .to(
          progress,
          {
            value: 100,
            duration: lines.length * 0.17 + 0.2,
            ease: "power1.inOut",
            onUpdate: () => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${progress.value / 100})`;
              if (percentRef.current) percentRef.current.textContent = `${Math.round(progress.value)}%`;
            },
          },
          "<"
        )
        .add(() => {
          if (readyRef.current) {
            readyRef.current.querySelector("[data-ms]").textContent = Math.round(performance.now());
          }
        })
        .fromTo(readyRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 })
        .to({}, { duration: 0.45 })
        .to(cardRef.current, { opacity: 0, scale: 0.94, y: -20, duration: 0.4, ease: "power2.in" })
        .to(overlayRef.current, { y: "-100vh", duration: 1.3, ease: "power4.inOut" }, "-=0.1")
        .to(
          overlayRef.current.querySelector("path"),
          { morphSVG: "M0,0 L0,300 Q720,900 1440,300 L1440,0 Z", duration: 1.3, ease: "power4.inOut" },
          "<"
        );

      if (seen) tl.timeScale(2.5);
    }, overlayRef);

    const skip = () => {
      if (tl && tl.progress() < 0.8) tl.timeScale(6);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center text-white overflow-hidden"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <path fill="black" d="M0,0 L0,900 L1440,900 L1440,0 Z" />
      </svg>

      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" aria-hidden="true" />

      <div
        ref={cardRef}
        className="relative z-10 w-[min(92vw,640px)] rounded-xl border border-brand-cyan/25 bg-[#05080a]/90 shadow-[0_0_60px_rgba(28,216,210,0.15)] font-mono text-[11px] sm:text-sm"
      >
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-white/40 text-xs">ankit@portfolio: ~/dev</span>
        </div>

        <div className="px-4 sm:px-5 py-4 space-y-1.5 min-h-[260px]">
          {bootLines.map((line, i) => (
            <div key={i} className="boot-line opacity-0 flex flex-wrap gap-x-2">
              {line.prompt && <span className="text-brand-green">$</span>}
              {line.ok && <span className="text-brand-green">✓</span>}
              <span className={line.dim ? "text-white/40" : "text-white/90"}>{line.text}</span>
              {line.meta && <span className="text-brand-cyan/70">{line.meta}</span>}
            </div>
          ))}

          <div ref={readyRef} className="opacity-0 pt-3">
            <span className="text-brand-cyan font-bold">VITE v7</span>
            <span className="text-white/70"> ready in </span>
            <span className="text-white font-bold" data-ms>
              0
            </span>
            <span className="text-white/70"> ms</span>
            <div className="text-white/50 mt-1">
              ➜ <span className="text-white/80">Local:</span>{" "}
              <span className="text-brand-cyan">ankit.dev/portfolio</span>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-5 pb-4">
          <div className="flex justify-between text-[10px] text-white/40 mb-1.5">
            <span>building</span>
            <span ref={percentRef}>0%</span>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              ref={barRef}
              className="h-full origin-left bg-gradient-to-r from-brand-cyan via-brand-green to-brand-indigo shadow-[0_0_10px_#1cd8d2]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>

      <p className="absolute bottom-6 left-0 right-0 text-center font-mono text-[10px] sm:text-xs text-white/30 z-10">
        press any key to skip
      </p>
    </div>
  );
}
