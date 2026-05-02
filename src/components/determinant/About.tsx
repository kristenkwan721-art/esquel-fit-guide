import fabric from "@/assets/fabric-texture.jpg";
import field from "@/assets/cotton-field.jpg";

const timeline = [
  { year: "1978", t: "香港启航", d: "溢达集团于香港成立，以纺织出口起步。" },
  { year: "1995", t: "垂直整合", d: "建立从棉花育种到成衣的全产业链。" },
  { year: "2014", t: "创办十如", d: "于桂林打造可持续生产社区，零排废试点。" },
  { year: "2024", t: "Determinant", d: "以算法量体与色彩，为亚洲男士定义新基础。" },
];

const pillars = [
  { tag: "01 / Material", t: "面料即克制", d: "新疆长绒棉、再生棉、Tencel™ 莱赛尔，以最少元素呈现最高触感。" },
  { tag: "02 / Process", t: "工艺即透明", d: "从棉田到衣橱可全程追溯。每一件衣服均附面料溯源标签。" },
  { tag: "03 / Algorithm", t: "推荐即合身", d: "结合体型分类、色彩季型与应季气候，给出唯一推荐组合。" },
];

export const About = () => (
  <section id="about" className="py-32 md:py-40 border-t border-border/60">
    <div className="container">
      <div className="grid grid-cols-12 gap-6 mb-24">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono-tag text-primary/70 mb-6">— About / 品牌</div>
          <h2 className="font-display text-5xl md:text-6xl leading-[1] text-balance">
            From cotton<br/>to <em className="italic">conscience.</em>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 font-cn-serif text-lg leading-relaxed text-foreground/80 pt-8">
          <p>
            溢达十如仕（<span className="font-display italic">Determinant</span>）来自溢达集团旗下的可持续基础款实验室。
            「十如」取意《金刚经》之十种"如是"——本性、相、用、因、缘、果、报、本末究竟。
          </p>
          <p className="text-muted-foreground">
            We design the smallest wardrobe that holds the most life. Every shirt is
            traceable from seed to seam, and every recommendation is computed —
            never copied.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-12 gap-px bg-border mb-24 border border-border">
        {pillars.map((p, i) => (
          <div key={i} className="col-span-12 md:col-span-4 bg-background p-10 md:p-12 group hover:bg-accent/40 transition-colors duration-700">
            <div className="font-mono-tag text-muted-foreground mb-8">{p.tag}</div>
            <h3 className="font-display text-3xl mb-4">{p.t}</h3>
            <p className="font-cn-serif text-foreground/70 leading-relaxed">{p.d}</p>
            <div className="mt-8 h-px bg-primary/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
          </div>
        ))}
      </div>

      {/* Image diptych */}
      <div className="grid grid-cols-12 gap-6 mb-24">
        <figure className="col-span-12 md:col-span-7 aspect-[4/3] overflow-hidden bg-muted">
          <img src={field} alt="Sustainable cotton field at sunrise" width={1280} height={800} loading="lazy" className="w-full h-full object-cover" />
        </figure>
        <figure className="col-span-12 md:col-span-5 aspect-[4/3] overflow-hidden bg-muted">
          <img src={fabric} alt="Premium organic cotton fabric texture" width={1280} height={900} loading="lazy" className="w-full h-full object-cover" />
        </figure>
      </div>

      {/* Timeline */}
      <div>
        <div className="font-mono-tag text-primary/70 mb-8">— Heritage / 时间线</div>
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
          {timeline.map((m) => (
            <li key={m.year} className="bg-background p-8">
              <div className="font-display text-4xl text-primary">{m.year}</div>
              <div className="font-cn-serif text-lg mt-3">{m.t}</div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{m.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
