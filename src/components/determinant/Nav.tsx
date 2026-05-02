import { useState } from "react";

const links = [
  { id: "home", label: "首页", en: "Home" },
  { id: "about", label: "品牌", en: "About" },
  { id: "smart-fit", label: "量体", en: "Smart Fit" },
  { id: "color-test", label: "测色", en: "Color" },
  { id: "seasonal", label: "应季", en: "Season" },
  { id: "recommend", label: "推荐", en: "Result" },
];

export const Nav = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60">
      <nav className="container flex items-center justify-between h-16">
        <button onClick={() => scrollTo("home")} className="flex items-baseline gap-2 group">
          <span className="font-display text-2xl tracking-tight">Determinant</span>
          <span className="font-cn-serif text-sm text-muted-foreground">溢达十如仕</span>
        </button>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                onMouseEnter={() => setHovered(l.id)}
                onMouseLeave={() => setHovered(null)}
                className="story-link text-sm tracking-wide text-foreground/70 hover:text-primary transition-colors"
              >
                <span className="font-cn-serif">{l.label}</span>
                <span className="ml-1.5 font-mono-tag text-[0.6rem] text-muted-foreground/70">
                  {hovered === l.id ? l.en : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => scrollTo("smart-fit")}
          className="hidden md:inline-flex items-center gap-2 text-xs font-mono-tag border border-primary/30 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all duration-500"
        >
          Begin
          <span aria-hidden>→</span>
        </button>
      </nav>
    </header>
  );
};
