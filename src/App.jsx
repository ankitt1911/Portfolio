import { useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import CircularGallery from "./components/CircularGallery";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Certification from "./sections/Certification";
import Testimonials from "./sections/Testimonials";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative animated-gradient text-white">
      <CustomCursor />
      <Navbar />
      <MusicPlayer />

      {/* Intro always on top until it finishes */}
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {/* Homepage always present (masked reveal) */}
      <Home introDone={introDone} />

      <About />
      <Skills />
       <Experience />
      <Education />
      <Certification />
       {/* <Testimonials /> */}
      <Achievements />
         <div style={{ height: '600px', position: 'relative' }} className="bg-black">
        <CircularGallery
          bend={0}
          textColor="#ffffff"
          borderRadius={0}
          scrollSpeed={3.3}
          scrollEase={0.11}
        />
      </div>
      <Contact />
      <Footer />
    </div>
  );
}
