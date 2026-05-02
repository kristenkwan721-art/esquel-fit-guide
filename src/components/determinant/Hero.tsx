import heroImg from "@/assets/hero-model.jpg";

export const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-end pt-16 overflow-hidden">
    <div className="absolute inset-0 grain opacity-60" />
    <div className="container grid grid-cols-12 gap-6 pb-20 pt-32 relative">
      <div className="col-span-12 md:col-span-7 space-y-10 animate-fade-in">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="h-px w-10 bg-foreground/40" />
          <span className="font-mono-tag">Esquel · Est. 1978 · Hong Kong</span>
        </div>
        <h1 className="font-display text-[clamp(3.5rem,9vw,9rem)] leading-[0.92] text-balance">
          The <em className="italic text-primary">determinant</em><br/>
          of how you <span className="italic">dress.</span>
        </h1>
        <p className="font-cn-serif text-lg md:text-xl text-foreground/80 max-w-xl text-balance leading-relaxed">
          溢达十如仕——以可持续科技面料与算法量体，为东方男士定义高级基础款。<br/>
          <span className="text-muted-foreground text-base">三步：量体 · 测色 · 应季，得出唯一属于你的穿搭行列式。</span>
        </p>
        <div className="flex items-center gap-6 pt-4">
          <a href="#smart-fit" onClick={(e)=>{e.preventDefault();document.getElementById('smart-fit')?.scrollIntoView({behavior:'smooth'});}}
             className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 font-mono-tag hover:bg-primary-glow transition-colors duration-500">
            Begin Fitting <span aria-hidden>→</span>
          </a>
          <a href="#about" onClick={(e)=>{e.preventDefault();document.getElementById('about')?.scrollIntoView({behavior:'smooth'});}}
             className="story-link font-cn-serif text-sm text-foreground/70">
            了解品牌哲学
          </a>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 relative animate-fade-in-slow">
        <div className="aspect-[3/4] overflow-hidden bg-muted relative shadow-card">
          <img src={heroImg} alt="溢达十如仕 model wearing premium white cotton shirt" width={1080} height={1440} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
            <div className="flex justify-between items-end">
              <div>
                <div className="font-mono-tag text-muted-foreground">FW · No. 014</div>
                <div className="font-display text-2xl mt-1">Cotton Poplin Shirt</div>
              </div>
              <div className="text-right font-cn-serif text-sm text-foreground/70">
                100% 长绒棉<br/>新疆 · 阿克苏
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono-tag text-muted-foreground animate-pulse">
      Scroll ↓
    </div>
  </section>
);
