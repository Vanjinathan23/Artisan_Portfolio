export const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-walnut border-t border-white/[0.06] pt-15 pb-8 sm:pt-25">
      <div className="wrap">
        <div className="font-head text-[clamp(4rem,10vw,10rem)] tracking-[0.15em] text-white/[0.05] leading-none mb-9 sm:mb-15 select-none text-center pl-[0.15em]">
          ARTISANA
        </div>
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-7 sm:gap-15 mb-11 sm:mb-16">
          <div className="footer-col">
            <h4 className="font-head text-[1.05rem] text-ondark mb-3.5">Artisana</h4>
            <p className="font-body text-[0.78rem] font-light text-white/35 leading-[1.8]">A living philosophy of craft. Handmade with intention. Made to last a lifetime and carry a story worth telling to whoever asks.</p>
          </div>
          <div className="footer-col">
            <h4 className="font-head text-[1.05rem] text-ondark mb-3.5">Navigate</h4>
            <ul className="flex flex-col gap-2.5">
              {['Story', 'Craft', 'Gallery', 'Philosophy', 'Contact'].map(item => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }}
                    className="font-body text-[0.75rem] text-white/32 hover:text-sand transition-colors cursor-none"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="font-head text-[1.05rem] text-ondark mb-3.5">Connect</h4>
            <ul className="flex flex-col gap-2.5">
              {['Instagram', 'Pinterest', 'YouTube', 'Behance'].map(item => (
                <li key={item}><a href="#" className="font-body text-[0.75rem] text-white/32 hover:text-sand transition-colors cursor-none">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.07] pt-6.5 flex flex-col sm:flex-row justify-between items-center gap-2.5 text-center sm:text-left">
          <p className="font-body text-[0.63rem] tracking-[0.1em] text-white/20">© 2024 Artisana Studio. All rights reserved.</p>
          <a href="#" className="font-body text-[0.63rem] tracking-[0.1em] text-white/20 hover:text-sand transition-colors cursor-none">Privacy Policy</a>
          <a href="/journal" className="font-body text-[0.63rem] tracking-[0.1em] text-white/[0.04] hover:text-sand/30 transition-colors duration-500 cursor-none">for those who stay until the end</a>
          <p className="font-body text-[0.63rem] tracking-[0.1em] text-white/20">Crafted with Soul · Chennai, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
