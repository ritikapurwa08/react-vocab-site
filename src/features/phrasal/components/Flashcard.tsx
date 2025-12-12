import { motion } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@/components/ui/MaterialIconHelper';
import type { PhrasalVerbData } from '@/data/data-type';


interface FlashcardProps {
    verbData: PhrasalVerbData;
}

export default function Flashcard({ verbData }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Example placeholders for examples (since mock data only provides one)
  const formalExample = verbData.example.replace(/\*\*(.*?)\*\*/g, '<span class="text-primary font-bold">$1</span>');
  const casualExample = verbData.example.replace(/\*\*(.*?)\*\*/g, '<span class="text-primary font-bold">$1</span>');

  return (
    <div className="flex-1 relative group perspective-1000 min-h-[500px]">
      <motion.div
        className="relative w-full h-full min-h-[500px] flex flex-col bg-surface-dark rounded-4xl border border-surface-border shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(54,226,123,0.1)]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of Card Content */}
        <div className="absolute inset-0 backface-hidden flex flex-col z-20" style={{ backfaceVisibility: 'hidden' }}>
          <div className="flex justify-between items-center p-6 md:p-8">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-border text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/20">{verbData.category}</span>
              <span className="px-3 py-1 bg-surface-border text-gray-400 text-xs font-bold uppercase tracking-wider rounded-full">{verbData.level} Level</span>
            </div>
            <div className="flex gap-2">
              <button className="size-10 flex items-center justify-center rounded-full bg-transparent hover:bg-surface-border text-gray-400 hover:text-primary transition-colors">
                <Icon name="bookmark" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 md:px-16 gap-6">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-6xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(54,226,123,0.25)]">
                {verbData.verb}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                {/* Phonetic placeholder */}
                <span className="text-xl text-gray-400 font-mono tracking-wide">/rʌn ˈɪntuː/</span>
                <button className="size-8 flex items-center justify-center rounded-full bg-surface-border text-primary hover:bg-primary hover:text-black transition-all">
                  <Icon name="volume_up" className="text-[20px]" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 flex justify-center w-full">
            <button
              onClick={() => setIsFlipped(true)}
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-surface-border hover:bg-primary transition-all duration-300 border border-surface-highlight hover:border-primary"
            >
              <Icon name="visibility" className="text-gray-400 group-hover:text-black" />
              <span className="text-sm font-bold text-white group-hover:text-black transition-colors">Show Definition</span>
            </button>
          </div>
        </div>

        {/* Back of Card Content - Definition/Example Side */}
        <motion.div
          className="absolute inset-0 flex flex-col bg-surface-dark z-20"
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
                {verbData.definition}
              </p>
              <p className="text-gray-400 italic text-lg" dangerouslySetInnerHTML={{ __html: formalExample }} />
            </div>
          </div>

          <div className="p-6 md:p-8 flex justify-center w-full">
            <button
              onClick={() => setIsFlipped(false)}
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-surface-border hover:bg-primary transition-all duration-300 border border-surface-highlight hover:border-primary"
            >
              <Icon name="visibility_off" className="text-gray-400 group-hover:text-black" />
              <span className="text-sm font-bold text-white group-hover:text-black transition-colors">Hide Definition</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
       {/* Contextual Examples Section (fixed below the card, not part of flip) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full">
            {/* Example 1 */}
            <div className="bg-surface-dark p-6 rounded-2xl border border-surface-border flex flex-col gap-3 hover:border-primary/30 transition-colors cursor-default group">
              <div className="flex items-center gap-3 mb-1">
                <div className="size-8 rounded-full bg-surface-border flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors text-white">
                  <Icon name="school" className="text-sm" />
                </div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Formal Context</span>
              </div>
              <p className="text-white leading-snug" dangerouslySetInnerHTML={{ __html: formalExample }}></p>
            </div>
            {/* Example 2 */}
            <div className="bg-surface-dark p-6 rounded-2xl border border-surface-border flex flex-col gap-3 hover:border-primary/30 transition-colors cursor-default group">
              <div className="flex items-center gap-3 mb-1">
                <div className="size-8 rounded-full bg-surface-border flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors text-white">
                  <Icon name="forum" className="text-sm" />
                </div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Casual Chat</span>
              </div>
              <p className="text-white leading-snug" dangerouslySetInnerHTML={{ __html: casualExample }}></p>
            </div>
            {/* Related Phrasal Verbs/Synonyms - Placeholder for full list (API needed for real synonyms) */}
            <div className="bg-surface-dark p-6 rounded-2xl border border-surface-border flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-1">
                <div className="size-8 rounded-full bg-surface-border flex items-center justify-center text-white">
                  <Icon name="hub" className="text-sm" />
                </div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Related Verbs</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Mock Synonyms based on Run into */}
                <span className="px-3 py-1.5 rounded-lg bg-surface-border text-sm text-white hover:bg-surface-highlight cursor-pointer transition-colors">Bump into</span>
                <span className="px-3 py-1.5 rounded-lg bg-surface-border text-sm text-white hover:bg-surface-highlight cursor-pointer transition-colors">Come across</span>
              </div>
            </div>
          </div>
    </div>
  );
}
