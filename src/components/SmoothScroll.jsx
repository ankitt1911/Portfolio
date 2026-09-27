import { useEffect } from "react";
import Lenis from "lenis";
import { lockScroll, scrollToSection, setLenis } from "../lib/scroll";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

export default function SmoothScroll({ paused = false }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  // Smooth-scroll every in-page "#id" link without the native jump.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      scrollToSection(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    lockScroll(paused);
  }, [paused, reducedMotion]);

  return null;
}
