import { useState, useEffect } from 'react';

interface HeroPortraitProps {
  preloaderDone: boolean;
}

export const HeroPortrait = ({ preloaderDone }: HeroPortraitProps) => {
  const [portraitVisible, setPortraitVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState("https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&auto=format&fit=crop&q=85");
  const backupSrc = "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&auto=format&fit=crop&q=85";

  useEffect(() => {
    if (preloaderDone) {
      const timer = setTimeout(() => {
        setPortraitVisible(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [preloaderDone]);

  const handleImageError = () => {
    if (imgSrc !== backupSrc) {
      setImgSrc(backupSrc);
    }
  };

  return (
    <div className={`hero-portrait ${portraitVisible ? 'visible' : ''}`}>
      <div className="hero-portrait-img">
        <img 
          src={imgSrc} 
          alt="The hands of the artisan — Chennai, 2024" 
          onError={handleImageError}
        />
      </div>
      <div className="hero-portrait-overlay" />
      <div className="hero-portrait-caption">
        <span className="hpc-line" />
        <span className="hpc-text">The Maker · Chennai, 2024</span>
      </div>
      <div className="hero-portrait-number" aria-hidden="true">01</div>
    </div>
  );
};

export default HeroPortrait;
