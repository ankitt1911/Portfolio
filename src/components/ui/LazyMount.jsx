import { useEffect, useRef, useState } from "react";

// Keeps an anchor target in the DOM and mounts children only as they approach
// the viewport.
export default function LazyMount({ id, minHeight = "100vh", rootMargin = "600px", className = "", children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  if (visible) return children;

  return <section id={id} ref={ref} className={`bg-black ${className}`} style={{ minHeight }} />;
}
