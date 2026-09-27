export default function Marquee({ items, reverse = false, duration = 40, renderItem }) {
  return (
    <div
      className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      style={{ "--marquee-duration": `${duration}s` }}
    >
      <div
        className="flex w-max shrink-0 animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} aria-hidden={i >= items.length ? "true" : undefined}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
