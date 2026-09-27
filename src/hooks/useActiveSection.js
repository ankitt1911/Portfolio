import { useEffect, useState } from "react";

// Tracks which section currently crosses the middle band of the viewport.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    // Lazily mounted sections may appear later, so re-scan briefly.
    const observed = new Set();
    const scan = () =>
      key.split(",").forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observer.observe(el);
          observed.add(el);
        }
      });
    scan();
    const interval = setInterval(scan, 1500);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [key]);

  return active;
}
