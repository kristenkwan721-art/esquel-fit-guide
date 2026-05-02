interface Props { num: string; tag: string; title: string; subtitle?: string; }
export const StepHeader = ({ num, tag, title, subtitle }: Props) => (
  <div className="grid grid-cols-12 gap-6 mb-16">
    <div className="col-span-12 md:col-span-4">
      <div className="font-mono-tag text-primary/70 mb-4">{tag}</div>
      <div className="font-display text-7xl md:text-8xl text-primary/20 leading-none">{num}</div>
    </div>
    <div className="col-span-12 md:col-span-7 md:col-start-6">
      <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-balance">{title}</h2>
      {subtitle && <p className="font-cn-serif text-lg text-muted-foreground mt-4 max-w-xl leading-relaxed">{subtitle}</p>}
    </div>
  </div>
);
