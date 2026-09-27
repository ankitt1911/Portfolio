import { useRef } from "react";

// Card whose border and inner glow follow the pointer. Uses CSS variables so
// pointer moves never trigger a React render.
export default function SpotlightCard({ as: Tag = "div", glow = "28, 216, 210", className = "", style, children, ...props }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      className={`spotlight-card ${className}`}
      style={{ "--glow": glow, ...style }}
      {...props}
    >
      <div className="relative z-[2] h-full">{children}</div>
    </Tag>
  );
}
