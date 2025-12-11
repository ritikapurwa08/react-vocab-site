import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Flashcard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex-1 relative group perspective-1000 min-h-[500px]">
      <motion.div
        className="relative w-full h-full min-h-[500px] flex flex-col bg-surface-dark rounded-[2rem] border border-surface-border shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(54,226,123,0.1)]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card Content */}
        <div className="absolute inset-0 backface-hidden flex flex-col z-20">
          <div className="flex justify-between items-center p-6 md:p-8">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-border text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">Common</span>
              <span className="px-3 py-1 bg-surface-border text-gray-400 text-xs font-bold uppercase tracking-wider rounded-full">B2 Level</span>
            </div>
            <div className="flex gap-2">
              <button className="size-10 flex items-center justify-center rounded-full bg-transparent hover:bg-surface-border text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">bookmark</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 md:px-16 gap-6">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-6xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(54,226,123,0.25)]">
                Run <span className="text-primary">into</span>
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl text-gray-400 font-mono tracking-wide">/rʌn ˈɪntuː/</span>
                <button className="size-8 flex items-center justify-center rounded-full bg-surface-border text-primary hover:bg-primary hover:text-black transition-all">
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex justify-center w-full">
            <button
              onClick={() => setIsFlipped(true)}
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-surface-border hover:bg-primary transition-all duration-300 border border-surface-highlight hover:border-primary"
            >
              <span className="material-symbols-outlined text-gray-400 group-hover:text-black transition-colors">visibility</span>
              <span className="text-sm font-bold text-white group-hover:text-black transition-colors">Show Definition</span>
            </button>
          </div>
        </div>

        {/* Back of Card Content (Simulated by simple state toggle logic for this demo as backface-visibility utilities in tw v4 might need setup, using conditional verify logic typically)
                Actually with framer-motion rotateY 180, we need a backface side.
            */}

        <motion.div
          className="absolute inset-0 backface-hidden flex flex-col bg-surface-dark z-20"
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-center p-6 md:p-8">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-border text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">Definition</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 md:px-16 gap-6">
            <div className="mt-4 max-w-lg space-y-4">
              <p className="text-2xl font-medium text-white leading-relaxed">
                To meet someone you know when you are not expecting to.
              </p>
              <p className="text-gray-400 italic text-lg">
                "I <span className="text-primary not-italic font-bold">ran into</span> my old math teacher at the grocery store yesterday."
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8 flex justify-center w-full">
            <button
              onClick={() => setIsFlipped(false)}
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-surface-border hover:bg-primary transition-all duration-300 border border-surface-highlight hover:border-primary"
            >
              <span className="material-symbols-outlined text-gray-400 group-hover:text-black transition-colors">visibility_off</span>
              <span className="text-sm font-bold text-white group-hover:text-black transition-colors">Hide Definition</span>
            </button>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}
