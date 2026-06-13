import { useState, useMemo, useEffect } from 'react';
    import { motion } from 'motion/react';
    import { galleryItems, GalleryItem } from '../data/galleryItems';

interface GalleryProps {
  onSelectItem: (item: GalleryItem) => void;
}

export const Gallery = ({ onSelectItem }: GalleryProps) => {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const handleReset = () => {
      setActiveFilter('all');
    };
    window.addEventListener('artisana:reset-gallery-filter', handleReset);
    return () => {
      window.removeEventListener('artisana:reset-gallery-filter', handleReset);
    };
  }, []);

  const filteredItems = useMemo(() => {
    return activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.cat === activeFilter);
  }, [activeFilter]);

  return (
    <section id="gallery" className="sec bg-linen">
      <div className="wrap">
        <div className="flex justify-between items-end flex-wrap gap-6 mb-10 sm:mb-14">
          <div>
            <div className="tag-label">The Collection</div>
            <h2 className="sec-h2 mt-2">Works That<br /><i>Hold Memory</i></h2>
          </div>
          <div className="flex gap-[3px] flex-wrap">
            {['all', 'pottery', 'jewelry', 'painting', 'textile'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-body text-[0.6rem] font-medium tracking-[0.18em] uppercase px-[18px] py-[9px] border border-border transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-terra border-terra text-white'
                    : 'bg-transparent text-umber hover:bg-terra hover:border-terra hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 sm:gap-[4px]">
          {filteredItems.map((item) => {
            const titleToIdx: Record<string, number> = {
              'Morning Calm': 0,
              'Ember Ring': 1,
              'Rainy Season': 2,
              'Woven Dusk': 3,
              'Earth Vessel': 4,
              'Silver Drift': 5,
              'Ochre Mind': 6,
              'Midnight Cup': 7
            };
            const idx = titleToIdx[item.title];
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={item.id}
                onClick={() => onSelectItem(item)}
                data-idx={idx !== undefined ? idx : undefined}
                data-title={item.title}
                className={`gi relative group overflow-hidden cursor-none ${item.className} 
                ${item.className === 'g-big' ? 'col-span-12 md:col-span-12 lg:col-span-5 row-span-1 lg:row-span-2 min-h-[280px] md:min-h-[380px] lg:min-h-[440px]' : ''}
                ${item.className === 'g-med' ? 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[240px] md:min-h-[210px]' : ''}
                ${item.className === 'g-tall' ? 'col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 lg:row-span-2 min-h-[300px] md:min-h-[440px]' : ''}
                ${item.className === 'g-wide' ? 'col-span-12 md:col-span-12 lg:col-span-8 min-h-[260px] md:min-h-[230px]' : ''}
                ${item.className === 'g-sm' ? 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[220px] md:min-h-[230px]' : ''}
              `}
            >
              <img
                src={item.thumb}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-750 ease-custom group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/[0.88] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-custom flex flex-col justify-end p-[18px]">
                <div className="font-head text-[1.2rem] text-ondark">{item.title}</div>
                <div className="font-body text-[0.58rem] font-medium tracking-[0.18em] uppercase text-sand mt-1">
                  {item.cat}
                </div>
              </div>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
