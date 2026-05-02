export const Footer = () => (
  <footer className="border-t border-border bg-foreground text-background">
    <div className="container py-20">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <div className="font-display text-5xl md:text-6xl leading-none mb-3">Determinant</div>
          <div className="font-cn-serif text-xl text-background/70">溢达十如仕 · ESQUEL Group</div>
          <p className="font-cn-serif text-background/50 mt-8 max-w-md leading-relaxed">
            克制的衣橱 · 透明的供应链 · 计算的合身。<br/>
            A small wardrobe, traceable from seed to seam.
          </p>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="font-mono-tag text-background/50 mb-4">Studio</div>
          <ul className="space-y-2 font-cn-serif text-background/80 text-sm">
            <li>香港 · 中环</li><li>桂林 · 十如</li><li>上海 · 静安</li>
          </ul>
        </div>
        <div className="col-span-6 md:col-span-3">
          <div className="font-mono-tag text-background/50 mb-4">Contact</div>
          <ul className="space-y-2 font-cn-serif text-background/80 text-sm">
            <li>determinant@esquel.com</li><li>+852 2828 3333</li><li>WeChat · esquel_det</li>
          </ul>
        </div>
      </div>
      <div className="mt-20 pt-8 border-t border-background/20 flex flex-wrap justify-between gap-3 font-mono-tag text-[0.65rem] text-background/50">
        <span>© 2026 Esquel Determinant — A demonstration interface.</span>
        <span>Computed in your browser · No data stored.</span>
      </div>
    </div>
  </footer>
);
