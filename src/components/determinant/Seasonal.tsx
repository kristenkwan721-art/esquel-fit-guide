import { useDeterminant } from "@/lib/determinant/store";
import type { Season } from "@/lib/determinant/types";
import { StepHeader } from "./StepHeader";

const seasons: { key: Season; cn: string; en: string; hex: string; note: string }[] = [
  { key: "spring", cn: "春", en: "Spring", hex: "#A8C29A", note: "轻盈层叠 · 12–22°C" },
  { key: "summer", cn: "夏", en: "Summer", hex: "#B7C7D1", note: "凉感速干 · 22–35°C" },
  { key: "autumn", cn: "秋", en: "Autumn", hex: "#C28A3A", note: "针织叠穿 · 10–22°C" },
  { key: "winter", cn: "冬", en: "Winter", hex: "#2E4A3A", note: "羊绒长大衣 · -5–10°C" },
];

export const Seasonal = () => {
  const { season, setSeason } = useDeterminant();
  return (
    <section id="seasonal" className="py-32 md:py-40 border-t border-border/60 bg-gradient-ivory">
      <div className="container">
        <StepHeader num="03" tag="— Seasonal Styling / 应季" title="Pick the air around you."
          subtitle="选择当下季节，我们会结合气候特征调整面料、廓形与配色。" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
          {seasons.map(s => {
            const active = season === s.key;
            return (
              <button key={s.key} onClick={() => {
                setSeason(s.key);
                setTimeout(() => document.getElementById("recommend")?.scrollIntoView({ behavior: "smooth" }), 300);
              }}
                className={`group p-10 md:p-12 text-left transition-all duration-700 ${active ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent/40"}`}>
                <div className="flex justify-between items-start mb-12">
                  <div className={`font-display text-7xl md:text-8xl leading-none ${active ? "" : "text-primary"}`}>{s.cn}</div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.hex }} />
                </div>
                <div className="font-mono-tag text-xs opacity-70 mb-2">{s.en}</div>
                <div className={`font-cn-serif text-sm ${active ? "opacity-90" : "text-muted-foreground"}`}>{s.note}</div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
