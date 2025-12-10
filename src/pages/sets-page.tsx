// src/pages/sets-page.tsx

import {type  WordData, WORDS_PER_SET } from '@/types/data';
import { cn } from '@/lib/utils';
import {  PlayCircleIcon } from 'lucide-react';

interface SetsPageProps {
  words: WordData[];
  onSelectSet: (setNumber: number) => void;
}

export function SetsPage({ words, onSelectSet }: SetsPageProps) {
  // Calculate total sets based on word count
  const totalSets = Math.ceil(words.length / WORDS_PER_SET);

  // Create an array of set objects [1, 2, 3...]
  const sets = Array.from({ length: totalSets }, (_, i) => i + 1);

  return (
    <div className="p-4 space-y-6 pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-text-main">Word Sets</h1>
        <p className="text-text-dim">Master 20 words at a time.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sets.map((setNum) => {
          // Get words in this set
          const start = (setNum - 1) * WORDS_PER_SET;
          const setWords = words.slice(start, start + WORDS_PER_SET);

          // Calculate progress
          const knownCount = setWords.filter(w => w.status === 'known').length;
          const progress = Math.round((knownCount / setWords.length) * 100);

          // Determine if "Locked" (Example logic: Must finish previous set to unlock next? Optional.)
          // For now, all are unlocked.
          const isComplete = progress === 100;

          return (
            <div
              key={setNum}
              onClick={() => onSelectSet(setNum)}
              className="group relative bg-surface border border-surface-highlight hover:border-primary/50 rounded-xl p-6 cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg",
                    isComplete ? "bg-success/20 text-success" : "bg-surface-highlight text-text-main"
                  )}>
                    {setNum}
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main">Set {setNum}</h3>
                    <span className="text-xs text-text-dim">{setWords.length} Words</span>
                  </div>
                </div>

                {/* Play Icon */}
                <PlayCircleIcon className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-right text-xs text-text-dim font-mono">
                {progress}% Mastered
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
