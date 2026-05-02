import { useMemo } from "react";
import { useDeterminant } from "@/lib/determinant/store";
import { buildRecommendations, fitLabel, seasonLabel, shapeLabel, classifyBodyShape } from "@/lib/determinant/logic";
import { StepHeader } from "./StepHeader";
import outfitImg from "@/assets/outfit-capsule.jpg";
import { useToast } from "@/hooks/use-toast";

export const Recommendations = () => {
  const { profile, color, season, reset } = useDeterminant();
  const { toast } = useToast();
  const ready = profile && color;

  const recs = useMemo(
    () => (ready ? buildRecommendations(profile!, color!, season) : []),
    [profile, color, season, ready]
  );

  const onShare = async () => {
    const summary = ready ? `溢达十如仕 · 我的穿搭行列式\n体型: ${shapeLabel(classifyBodyShape(profile!))}\n季型: ${seasonLabel(color!.seasonType)}\n推荐: ${recs.map(r => r.title).join(" / ")}` : "";
    try { await navigator.clipboard.writeText(summary); toast({ title: "已复制到剪贴板", description: "可分享给造型师或好友。" }); }
    catch { toast({ title: "复制失败", variant: "destructive" }); }
  };

  return (
    <section id="recommend" className="py-32 md:py-40 border-t border-border/60">
      <div className="container">
        <StepHeader num="04" tag="— Recommendation / 推荐结果" title="Your wardrobe, computed."
          subtitle="基于体型、色彩与季节三个维度的交集，得出唯一行列式：以下是为你计算的四套基础款方案。" />

        {!ready ? (
          <div className="border border-dashed border-border p-16 text-center">
            <div className="font-cn-serif text-xl text-muted-foreground mb-2">请先完成量体与测色。</div>
            <div className="font-mono-tag text-xs text-muted-foreground/70">Complete steps 01–02 to compute your determinant.</div>
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border mb-12">
              {[
                { l: "Body Shape", v: shapeLabel(classifyBodyShape(profile!)) },
                { l: "Fit", v: fitLabel(recs[0].fitType) },
                { l: "Color Season", v: seasonLabel(color!.seasonType) },
                { l: "Current Season", v: ({spring:"春",summer:"夏",autumn:"秋",winter:"冬"} as const)[season] },
              ].map((s, i) => (
                <div key={i} className="bg-background p-6">
                  <div className="font-mono-tag text-[0.6rem] text-muted-foreground mb-2">{s.l}</div>
                  <div className="font-display text-2xl">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-12 gap-6">
              {recs.map((r, i) => (
                <article key={r.id} className="col-span-12 md:col-span-6 bg-card border border-border shadow-card overflow-hidden group animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <img src={outfitImg} alt={r.title} loading="lazy" width={1280} height={960}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      style={{ filter: `hue-rotate(${i * 12}deg) saturate(${0.8 + i * 0.05})` }} />
                    <div className="absolute top-4 left-4 font-mono-tag text-[0.6rem] bg-background/90 px-2 py-1">
                      Look No. 0{i + 1}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-baseline mb-4">
                      <h3 className="font-display text-3xl">{r.title}</h3>
                      <span className="font-mono-tag text-xs text-muted-foreground">{fitLabel(r.fitType)}</span>
                    </div>
                    <div className="flex gap-2 mb-5">
                      {r.colors.map((c, j) => (
                        <div key={j} className="flex-1 group/c">
                          <div className="h-10 border border-border" style={{ backgroundColor: c.hex }} />
                          <div className="font-mono-tag text-[0.55rem] text-muted-foreground mt-1.5 truncate">{c.name.split(" ")[0]}</div>
                        </div>
                      ))}
                    </div>
                    <p className="font-cn-serif text-sm text-foreground/80 leading-relaxed mb-5">{r.description}</p>
                    <ul className="space-y-1.5 mb-5">
                      {r.items.map((it, j) => (
                        <li key={j} className="flex items-baseline gap-3 text-sm">
                          <span className="font-mono-tag text-[0.55rem] text-muted-foreground w-6">0{j + 1}</span>
                          <span className="font-cn-serif">{it}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="hairline pt-4 flex justify-between items-center">
                      <span className="font-mono-tag text-[0.6rem] text-muted-foreground">{r.occasion}</span>
                      <button className="story-link font-mono-tag text-xs text-primary">Save look →</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
              <div className="font-cn-serif text-muted-foreground">不满意结果？随时调整数据重新计算。</div>
              <div className="flex gap-3">
                <button onClick={onShare} className="font-mono-tag text-xs border border-primary/30 px-5 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-500">
                  Share Result ↗
                </button>
                <button onClick={() => { reset(); document.getElementById("smart-fit")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="font-mono-tag text-xs border border-border px-5 py-3 hover:bg-accent transition-colors">
                  ↺ Reset & Restart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
