import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FiSkipForward } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const playlist = [
  "/iwasneverthere.mp3",
  "/escapism.mp3",
  "/blue.mp3",
  "/YAD.mp3",
  "/stars.mp3",
];

const isEditable = (el) =>
  el instanceof HTMLElement &&
  (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));

const MusicPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef(null);
  const lastTapTime = useRef(0);
  const clickTimeout = useRef(null);
  const isPlayingRef = useRef(false); // mirror of isPlaying to use inside callbacks

  // Keep ref in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Hide the hint after a while even if nobody interacts
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 12000);
    return () => clearTimeout(t);
  }, []);

  // Helper: reliably set src and optionally play
  const setSourceAndMaybePlay = (src, shouldPlay) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = src;
    audio.load();
    audio.muted = false;
    if (audio.volume === 0) audio.volume = 0.5;

    if (!shouldPlay) return;

    // Wait for canplay before calling play to avoid errors
    const onCanPlay = () => {
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => setIsPlaying(false));
      }
      audio.removeEventListener("canplay", onCanPlay);
    };
    audio.addEventListener("canplay", onCanPlay);
  };

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setShowHint(false);

    if (isPlayingRef.current) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setSourceAndMaybePlay(playlist[currentTrackIndex], true);
      setIsPlaying(true);
    }
  };

  // Shuffle to next random track, preserve play/pause state
  const shuffleNextTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlayingRef.current;
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } while (nextIndex === currentTrackIndex && playlist.length > 1);

    setCurrentTrackIndex(nextIndex);
    setSourceAndMaybePlay(playlist[nextIndex], wasPlaying);
  };

  // Initial setup: volume, preload
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = "auto";
    audio.volume = 0.6;
    audio.muted = false;

    const onError = () => console.warn("Audio error loading/playing:", audio.error);
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  // Volume with up/down keys — only while music plays and never while typing,
  // so page scrolling and the terminal's history keys keep working.
  useEffect(() => {
    const handleVolumeKeys = (e) => {
      const audio = audioRef.current;
      if (!audio || !isPlayingRef.current || !e.shiftKey || isEditable(e.target)) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        audio.volume = Math.min(1, Math.round((audio.volume + 0.05) * 100) / 100);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        audio.volume = Math.max(0, Math.round((audio.volume - 0.05) * 100) / 100);
      }
    };
    window.addEventListener("keydown", handleVolumeKeys);
    return () => window.removeEventListener("keydown", handleVolumeKeys);
  }, []);

  // Mobile double tap to change music
  const handleDoubleTapMobile = () => {
    const now = Date.now();
    if (now - lastTapTime.current < 400) shuffleNextTrack();
    lastTapTime.current = now;
  };

  // Unified single vs double click on desktop
  const handleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      shuffleNextTrack();
    } else {
      clickTimeout.current = setTimeout(() => {
        togglePlay();
        clickTimeout.current = null;
      }, 250);
    }
  };

  const trackName = playlist[currentTrackIndex].replace("/", "");

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showHint && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="hidden sm:block font-mono text-[11px] text-white/70 bg-black/70 border border-white/10 rounded-md px-2 py-1 backdrop-blur"
          >
            ♪ play some music while scrolling?
          </motion.p>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onEnded={shuffleNextTrack}
        preload="auto"
      />

      <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-brand-cyan/30 bg-black/60 backdrop-blur-md pl-1.5 pr-2 sm:pr-3 py-1.5 shadow-[0_0_20px_rgba(28,216,210,0.15)]">
        <button
          onClick={handleClick}
          onTouchStart={handleDoubleTapMobile}
          className="relative grid place-items-center h-9 w-9 sm:h-10 sm:w-10 rounded-full text-black bg-gradient-to-br from-brand-cyan to-brand-green shadow-[0_0_14px_rgba(28,216,210,0.6)] transition-transform hover:scale-110"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          aria-pressed={isPlaying}
          title="Click to play/pause · double-click to shuffle"
        >
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-brand-cyan animate-ping opacity-40" />
          )}
          {isPlaying ? <FaPause className="w-3.5 h-3.5" /> : <FaPlay className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        {/* Equalizer */}
        <div className="flex items-end gap-[3px] h-4" aria-hidden="true">
          {[0, 0.2, 0.4, 0.1].map((delay, i) => (
            <span
              key={i}
              className={`w-[3px] h-full rounded-full bg-brand-cyan origin-bottom ${isPlaying ? "animate-equalizer" : "scale-y-[0.3]"}`}
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>

        <span className="hidden sm:block font-mono text-[11px] text-white/70 max-w-[110px] truncate">
          {trackName}
        </span>

        <button
          onClick={shuffleNextTrack}
          className="text-white/60 hover:text-brand-cyan transition-colors"
          aria-label="Next track"
        >
          <FiSkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
