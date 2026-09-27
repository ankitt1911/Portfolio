import { lazy, Suspense, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import MusicPlayer from "./components/MusicPlayer";
import SmoothScroll from "./components/SmoothScroll";
import LazyMount from "./components/ui/LazyMount";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Architecture from "./sections/Architecture";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Achievements from "./sections/Achievements";
import Terminal from "./sections/Terminal";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

// Heavy, below-the-fold sections load on demand (react-pageflip, ogl).
const Certification = lazy(() => import("./sections/Certification"));
const CircularGallery = lazy(() => import("./components/CircularGallery"));

function Placeholder({ id, height }) {
  return <section id={id} className="bg-black" style={{ minHeight: height }} />;
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative bg-black text-white">
        <SmoothScroll paused={!introDone} />
        <CustomCursor />
        <Navbar />
        <MusicPlayer />

        {/* Boot loader stays on top until it finishes */}
        {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

        <main>
          <Home introDone={introDone} />
          <About />
          <Skills />
          <Architecture />
          <Experience />
          <Education />

          <LazyMount id="certifications" minHeight="900px">
            <Suspense fallback={<Placeholder id="certifications" height="900px" />}>
              <Certification />
            </Suspense>
          </LazyMount>

          <Achievements />

          <LazyMount id="gallery" minHeight="600px">
            <section id="gallery" className="relative bg-black" style={{ height: "600px" }} aria-label="Engineering highlights gallery">
              <Suspense fallback={null}>
                <CircularGallery bend={0} textColor="#ffffff" borderRadius={0} scrollSpeed={3.3} scrollEase={0.11} />
              </Suspense>
            </section>
          </LazyMount>

          <Terminal />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
