import { useState } from "react";
import { useDeterminant } from "@/lib/determinant/store";
import { classifyBodyShape, suggestFit, fitLabel, shapeLabel } from "@/lib/determinant/logic";
import type { Gender, BodyShape } from "@/lib/determinant/types";
import { StepHeader } from "./StepHeader";

const fields = [
  { key: "height", label: "身高 Height", unit: "cm", min: 150, max: 200, def: 175 },
  { key: "weight", label: "体重 Weight", unit: "kg", min: 40, max: 120, def: 68 },
  { key: "chest",  label: "胸围 Chest",  unit: "cm", min: 70,  max: 130, def: 96 },
  { key: "waist",  label: "腰围 Waist",  unit: "cm", min: 55,  max: 120, def: 78 },
  { key: "hip",    label: "臀围 Hip",    unit: "cm", min: 70,  max: 130, def: 94 },
] as const;

const shapes: { key: BodyShape; label: string }[] = [
  { key: "rectangle", label: "长方形" },
  { key: "triangle", label: "三角形" },
  { key: "inverted", label: "倒三角" },
  { key: "hourglass", label: "沙漏" },
  { key: "oval", label: "椭圆" },
];

export const SmartFit = () => {
  const { profile, setProfile } = useDeterminant();
  const [vals, setVals] = useState<Record<string, number>>(() =>
    Object.fromEntries(fields.map(f => [f.key, profile?.[f.key as keyof typeof profile] as number ?? f.def]))
  );
  const [gender, setGender] = useState<Gender>(profile?.gender ?? "male");
  const [shape, setShape] = useState<BodyShape | undefined>(profile?.bodyShape);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = {
      height: vals.height, weight: vals.weight,
      chest: vals.chest, waist: vals.waist, hip: vals.hip,
      gender, bodyShape: shape,
    };
    setProfile(p);
    setTimeout(() => document.getElementById("color-test")?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const computed = profile ? { shape: classifyBodyShape(profile), fit: suggestFit(profile) } : null;

  return (
    <section id="smart-fit" className="py-32 md:py-40 border-t border-border/60 bg-gradient-ivory">
      <div className="container">
        <StepHeader num="01" tag="— Smart Fit / 智能量体" title="Numbers become a silhouette."
          subtitle="输入你的身体数据，我们将以体型分类与 BMI 推算你的合身版型。所有数据仅在本地浏览器中处理。" />
        <form onSubmit={onSubmit} className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-7 space-y-10">
            {fields.map(f => (
              <div key={f.key}>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="font-cn-serif text-foreground/80">{f.label}</label>
                  <span className="font-display text-3xl text-primary tabular-nums">
                    {vals[f.key]}<span className="font-mono-tag text-xs text-muted-foreground ml-1">{f.unit}</span>
                  </span>
                </div>
                <input type="range" min={f.min} max={f.max} value={vals[f.key]}
                  onChange={(e) => setVals(v => ({ ...v, [f.key]: +e.target.value }))}
                  className="w-full accent-primary cursor-pointer" />
                <div className="flex justify-between font-mono-tag text-[0.6rem] text-muted-foreground mt-1">
                  <span>{f.min}</span><span>{f.max}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9 space-y-10">
            <div>
              <div className="font-cn-serif text-foreground/80 mb-3">性别 Gender</div>
              <div className="grid grid-cols-3 gap-px bg-border border border-border">
                {(["male", "female", "neutral"] as Gender[]).map(g => (
                  <button key={g} type="button" onClick={() => setGender(g)}
                    className={`py-3 text-sm transition-colors ${gender === g ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent"}`}>
                    {g === "male" ? "男" : g === "female" ? "女" : "中性"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-cn-serif text-foreground/80 mb-3">体型 Body Shape <span className="text-xs text-muted-foreground">(可选)</span></div>
              <div className="space-y-px bg-border border border-border">
                {shapes.map(s => (
                  <button key={s.key} type="button" onClick={() => setShape(shape === s.key ? undefined : s.key)}
                    className={`w-full px-4 py-3 text-left text-sm flex justify-between items-center transition-colors ${shape === s.key ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent"}`}>
                    <span className="font-cn-serif">{s.label}</span>
                    <span className="font-mono-tag text-[0.6rem] opacity-70">{s.key}</span>
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-4 font-mono-tag hover:bg-primary-glow transition-colors duration-500">
              Compute → 计算合身
            </button>
          </div>

          {computed && (
            <div className="col-span-12 mt-8 border border-primary/30 p-8 md:p-10 bg-background animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="font-mono-tag text-muted-foreground mb-2">Detected Shape</div>
                  <div className="font-display text-3xl">{shapeLabel(computed.shape)}</div>
                </div>
                <div>
                  <div className="font-mono-tag text-muted-foreground mb-2">Recommended Fit</div>
                  <div className="font-display text-3xl">{fitLabel(computed.fit)}</div>
                </div>
                <div>
                  <div className="font-mono-tag text-muted-foreground mb-2">BMI Index</div>
                  <div className="font-display text-3xl tabular-nums">
                    {(profile!.weight / Math.pow(profile!.height/100, 2)).toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
