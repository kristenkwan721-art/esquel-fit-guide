import { useState } from "react";
import { useDeterminant } from "@/lib/determinant/store";
import { buildColorProfile, seasonLabel } from "@/lib/determinant/logic";
import type { Undertone, Contrast } from "@/lib/determinant/types";
import { StepHeader } from "./StepHeader";

type Answer = { undertone?: Undertone; contrast?: Contrast };

const questions: { q: string; opts: { label: string; sub: string; v: Partial<Answer> }[] }[] = [
  {
    q: "Q1 · 你手腕静脉的颜色更接近？",
    opts: [
      { label: "偏蓝紫", sub: "Cool · 冷调", v: { undertone: "cool" } },
      { label: "偏绿", sub: "Warm · 暖调", v: { undertone: "warm" } },
      { label: "蓝绿混合", sub: "Neutral · 中性", v: { undertone: "neutral" } },
    ],
  },
  {
    q: "Q2 · 阳光下肌肤反光？",
    opts: [
      { label: "偏粉白", sub: "Cool", v: { undertone: "cool" } },
      { label: "偏金黄", sub: "Warm", v: { undertone: "warm" } },
      { label: "偏橄榄", sub: "Neutral", v: { undertone: "neutral" } },
    ],
  },
  {
    q: "Q3 · 你的发色与肤色对比？",
    opts: [
      { label: "强烈对比", sub: "黑发白肤 / High", v: { contrast: "high" } },
      { label: "柔和对比", sub: "棕发暖肤 / Medium", v: { contrast: "medium" } },
      { label: "几乎一致", sub: "Low contrast", v: { contrast: "low" } },
    ],
  },
  {
    q: "Q4 · 哪种基础色让你看上去最有精神？",
    opts: [
      { label: "纯白 + 墨黑", sub: "High contrast", v: { contrast: "high" } },
      { label: "米白 + 驼色", sub: "Low / soft", v: { contrast: "low" } },
      { label: "灰白 + 中灰", sub: "Medium", v: { contrast: "medium" } },
    ],
  },
];

export const ColorTest = () => {
  const { setColor, color } = useDeterminant();
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Answer>({});
  const [done, setDone] = useState(!!color);

  const choose = (v: Partial<Answer>) => {
    const next = { ...ans, ...v };
    setAns(next);
    if (step < questions.length - 1) setStep(step + 1);
    else if (next.undertone && next.contrast) {
      const profile = buildColorProfile(next.undertone, next.contrast);
      setColor(profile);
      setDone(true);
      setTimeout(() => document.getElementById("seasonal")?.scrollIntoView({ behavior: "smooth" }), 600);
    }
  };

  const reset = () => { setStep(0); setAns({}); setDone(false); };

  return (
    <section id="color-test" className="py-32 md:py-40 border-t border-border/60">
      <div className="container">
        <StepHeader num="02" tag="— Color Analysis / 色彩季型测试" title="Your skin holds a season."
          subtitle="四个简短问题，将你映射到春 / 夏 / 秋 / 冬四种季型，并生成专属调色板。" />

        {!done ? (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono-tag text-muted-foreground mb-4">Progress · 进度</div>
              <div className="font-display text-7xl tabular-nums text-primary">{step + 1}<span className="text-muted-foreground/40">/{questions.length}</span></div>
              <div className="mt-6 h-px bg-border relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-primary transition-all duration-700" style={{ width: `${((step) / questions.length) * 100}%` }} />
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-8 animate-fade-in" key={step}>
              <h3 className="font-cn-serif text-2xl md:text-3xl text-balance leading-snug">{questions[step].q}</h3>
              <div className="space-y-px bg-border border border-border">
                {questions[step].opts.map((o, i) => (
                  <button key={i} onClick={() => choose(o.v)}
                    className="w-full text-left bg-background px-6 py-5 hover:bg-accent transition-colors duration-300 group flex justify-between items-center">
                    <span className="font-cn-serif text-lg">{o.label}</span>
                    <span className="font-mono-tag text-muted-foreground group-hover:text-primary transition-colors">{o.sub} →</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : color && (
          <div className="grid grid-cols-12 gap-6 animate-fade-in">
            <div className="col-span-12 md:col-span-5">
              <div className="font-mono-tag text-primary/70 mb-4">Result · 季型</div>
              <div className="font-display text-6xl md:text-7xl text-primary leading-none">{seasonLabel(color.seasonType).split(" · ")[0]}</div>
              <div className="font-cn-serif text-xl text-muted-foreground mt-3">{seasonLabel(color.seasonType).split(" · ")[1]}</div>
              <p className="font-cn-serif text-foreground/70 mt-6 leading-relaxed max-w-md">
                Undertone: <span className="text-primary">{color.undertone}</span> · Contrast: <span className="text-primary">{color.contrast}</span>
              </p>
              <button onClick={reset} className="mt-8 font-mono-tag text-muted-foreground hover:text-primary story-link">↺ 重新测试</button>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="font-mono-tag text-muted-foreground mb-4">Palette · 专属色板</div>
              <div className="grid grid-cols-5 gap-px bg-border border border-border">
                {color.palette.map((c, i) => (
                  <div key={i} className="bg-background animate-scale-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <div className="aspect-square" style={{ backgroundColor: c.hex }} />
                    <div className="p-3">
                      <div className="font-cn-serif text-xs leading-tight">{c.name.split(" ")[0]}</div>
                      <div className="font-mono-tag text-[0.55rem] text-muted-foreground mt-1">{c.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
