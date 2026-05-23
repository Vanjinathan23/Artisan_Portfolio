export const Philosophy = () => {
  const principles = [
    { icon: '◉', title: 'Handmade Always', text: 'No machines. No shortcuts. Every curve is the result of hands that chose slowness over efficiency.' },
    { icon: '◈', title: 'Sustainable Materials', text: 'Earth-sourced, responsibly gathered. The materials leave the land as whole as they found it.' },
    { icon: '⬡', title: 'Traditional Techniques', text: 'Methods passed through generations. The knowledge of ancestors lives in every movement.' },
  ];

  return (
    <section id="philosophy" className="sec bg-walnut relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-head text-[clamp(8rem,20vw,24rem)] font-light text-white/[0.018] whitespace-nowrap pointer-events-none select-none tracking-[0.08em]">CRAFT</div>
      <div className="wrap relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center mb-12 sm:mb-20">
          <div>
            <div className="tag-label light">The Philosophy</div>
            <h2 className="sec-h2 light mt-2">What This<br />Craft <i>Believes</i></h2>
          </div>
          <p className="font-body text-[clamp(0.84rem,1.2vw,0.95rem)] font-light text-white/48 leading-[1.9]">
            Craft is not a style. It is a conviction. A daily act of resistance against the disposable and the fast. Each piece is a small argument for permanence in a world that celebrates speed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-[2px]">
          {principles.map((phil, i) => (
            <div key={i} className="bg-white/[0.025] border border-white/[0.06] p-7 sm:p-12 relative overflow-hidden group transition-all duration-400 hover:bg-white/[0.045]">
              <div className="font-head text-[2.8rem] font-light text-sand opacity-38 mb-[22px] leading-none">{phil.icon}</div>
              <div className="absolute top-[18px] right-[18px] font-body text-[0.55rem] font-medium tracking-[0.2em] text-white/12">0{i+1}</div>
              <h3 className="font-head text-[1.45rem] text-ondark mb-3">{phil.title}</h3>
              <p className="font-body text-[0.8rem] font-light text-white/42 leading-[1.8]">{phil.text}</p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-terra scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 md:mt-20 p-9 sm:p-16 border border-white/[0.07] relative">
          <div className="font-head text-[9rem] font-light text-white/[0.05] absolute top-0 left-7 leading-none select-none">"</div>
          <p className="font-head italic text-[clamp(1.6rem,3.5vw,2.8rem)] font-light text-ondark leading-[1.35] relative z-10">
            "Every imperfection tells a story more interesting than perfection ever could."
          </p>
          <cite className="font-body text-[0.62rem] font-medium tracking-[0.2em] uppercase text-muted mt-4.5 block not-italic">— Studio Artisana, 2024</cite>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
