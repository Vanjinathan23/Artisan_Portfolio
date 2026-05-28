export const HeroCraft = () => {
  return (
    <div className="hidden md:block relative overflow-hidden bg-parch hero-r">
      <img 
        src="/src/assets/images/artisan_man_pose.png" 
        alt="Artisan man posing in ceramic workshop"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-walnut/55 via-walnut/10 to-transparent" />
      <div className="absolute top-[clamp(90px,14vh,130px)] left-5 font-head text-[0.65rem] tracking-[0.3em] uppercase text-ondark/50 [writing-mode:vertical-rl]">Since 2018</div>

      <div className="absolute bottom-[clamp(28px,5vw,52px)] right-10 bg-cream/92 backdrop-blur-md p-[18px_22px] max-w-[200px] border-l-2 border-terra">
        <div className="font-body text-[0.55rem] font-medium tracking-[0.22em] uppercase text-muted mb-1">Currently available</div>
        <div className="font-head text-[1.15rem] text-espresso leading-tight">Commission a Piece</div>
      </div>
    </div>
  );
};

export default HeroCraft;
