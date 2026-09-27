let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const getLenis = () => lenis;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Accepts a section id ("contact"), a selector ("#contact") or a number (px).
export function scrollToSection(target, options = {}) {
  if (typeof target === "number") {
    if (lenis) lenis.scrollTo(target, { duration: 1.4, ...options });
    else window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    return;
  }

  const id = String(target).replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    // Lazily mounted sections can change the page height mid-flight, so
    // re-aim once the first scroll lands.
    lenis.scrollTo(el, {
      duration: 1.4,
      ...options,
      onComplete: () => {
        if (Math.abs(el.getBoundingClientRect().top) > 4) lenis?.scrollTo(el, { duration: 0.5 });
      },
    });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
}

export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
