import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface GalleryModalProps {
  modalData: {
    title: string;
    desc: string;
    cat: string;
    full: string;
    id: string;
  } | null;
  onClose: () => void;
}

export const GalleryModal = ({ modalData, onClose }: GalleryModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (modalData) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalData, onClose]);

  return (
    <AnimatePresence>
      {modalData && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60000] bg-walnut/[0.97] flex items-center justify-center p-5"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-transparent border border-white/[0.15] text-ondark w-[42px] h-[42px] flex items-center justify-center hover:bg-terra hover:border-terra transition-all cursor-none"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="grid md:grid-cols-[1.25fr_1fr] max-w-[1000px] w-full max-h-[90vh] overflow-hidden rounded-sm"
          >
            <div className="bg-black relative min-h-[260px] md:min-h-0">
              <img src={modalData.full} alt={modalData.title} className="w-full h-full object-cover" />
            </div>
            <div className="bg-parch p-7 md:p-13 flex flex-col justify-center relative overflow-y-auto">
              <div className="font-head text-[5rem] font-light text-espresso/[0.1] leading-none mb-[-20px] select-none">
                {modalData.id.padStart(2, '0')}
              </div>
              <div className="font-body text-[0.6rem] font-medium tracking-[0.25em] uppercase text-terra mb-3">
                {modalData.cat}
              </div>
              <h2 className="font-head text-[clamp(1.7rem,3vw,2.6rem)] text-espresso mb-4 leading-[1.1]">
                {modalData.title}
              </h2>
              <p className="font-body text-[0.87rem] font-light text-umber leading-[1.85] mb-8">
                {modalData.desc}
              </p>
              <button 
                onClick={() => {
                  window.openApprentice?.(`Hello, I am interested in the ${modalData.title} piece.`);
                  onClose();
                }}
                className="inline-block bg-terra text-white px-8 py-3.5 font-body text-[0.68rem] font-medium tracking-[0.2em] uppercase text-center cursor-none w-full border-none outline-none"
              >
                Enquire About This Piece
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
