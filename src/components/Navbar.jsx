import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import OverlayMenu from "./OverlayMenu";
import ScrollProgress from "./ui/ScrollProgress";
import MagneticButton from "./ui/MagneticButton";
import useActiveSection from "../hooks/useActiveSection";
import { sectionIds } from "../data/sections";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const timerId = useRef(null);
  const active = useActiveSection(sectionIds);
  const onHome = active === "home";
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // On the hero the navbar always stays visible
      if (currentScrollY < window.innerHeight * 0.9) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
        // hide again after 3s idle
        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => setVisible(false), 3000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 z-50 transition-all duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${scrolled && !onHome ? "bg-black/50 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}
      >
        {/* Logo + breadcrumb */}
        <div className="flex items-center gap-4 min-w-0">
          <a href="#home" className="font-mono text-lg sm:text-xl font-bold text-white whitespace-nowrap" aria-label="Back to top">
            <span className="text-brand-cyan">&lt;</span>
            Ankit
            <span className="text-brand-cyan"> /&gt;</span>
            <span className="inline-block w-[2px] h-[1em] ml-1 bg-brand-green align-[-0.15em] animate-blink" />
          </a>
          <div className="hidden md:flex font-mono text-xs text-white/40 overflow-hidden">
            <span>~/portfolio/</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                className="text-brand-cyan"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {active}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Menu Button */}
        <div className="block lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="group flex items-center gap-2 text-white text-3xl rounded-full p-1"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <FiMenu className="transition-transform duration-300 group-hover:rotate-90 group-hover:text-brand-cyan" />
          </button>
        </div>

        {/* Contact Button */}
        <div className="hidden lg:block">
          <MagneticButton href="#contact" className="!px-5 !py-2 !text-base">
            Reach Out
          </MagneticButton>
        </div>
      </nav>

      <OverlayMenu isOpen={menuOpen} onClose={closeMenu} active={active} />
    </>
  );
}
