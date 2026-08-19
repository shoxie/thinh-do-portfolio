const ITEMS = [
  "Portrait Photography",
  "Fashion Editorial",
  "Food Photography",
  "Product Photography",
  "Cinematic Framing",
  "Environmental Portraits",
  "Natural Light Only",
  "Backlit Portraits",
  "On-location Shoots",
  "Telephoto Compression",
  "Color Grading",
  "Editorial Storytelling",
];

export function Marquee() {
  const row = (key: string) => (
    <>
      {ITEMS.map((item) => (
        <span key={`${key}-${item}`} style={{ display: "contents" }}>
          <span>{item}</span>
          <span className="s">✦</span>
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
