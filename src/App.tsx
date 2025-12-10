// src/App.tsx
import React, { useState, useEffect } from 'react';
import {type  WordData, initialVocabulary, WORDS_PER_SET } from '@/types/data';

import { WordCard } from '@/components/word-card';
import { ManualEntryDialog } from '@/components/manual-entry-dialog';
// You can reuse your existing navbar but simplified
import { Button } from '@/components/ui/button'
import { ArrowLeft, PlusIcon } from 'lucide-react';
import { SetsPage } from './pages/sets-page';

const App = () => {
  // 1. Data State
  const [words, setWords] = useState<WordData[]>(() => {
    const saved = localStorage.getItem('vocab_manual_v1');
    return saved ? JSON.parse(saved) : initialVocabulary;
  });

  // 2. Navigation State
  const [activeSet, setActiveSet] = useState<number | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('vocab_manual_v1', JSON.stringify(words));
  }, [words]);

  // Handlers
  const handleUpdateStatus = (id: number, status: WordData['status']) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, status } : w));
  };

  const handleAddWord = (newWord: Partial<WordData>) => {
    setWords(prev => [
      ...prev,
      {
        id: Date.now(),
        word: newWord.word!,
        meaning: newWord.meaning!,
        status: 'unknown',
        dateAdded: new Date().toISOString(),
        // Auto-assign to the last set or a new one
        setId: Math.floor(prev.length / WORDS_PER_SET) + 1,
        ...newWord
      }
    ]);
  };

  // Filter words for the active set view
  const activeWords = activeSet
    ? words.slice((activeSet - 1) * WORDS_PER_SET, activeSet * WORDS_PER_SET)
    : [];

  return (
    <div className="min-h-screen bg-background text-text-main font-sans selection:bg-primary/30">

      {/* Simple Top Bar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface-highlight h-14 flex items-center px-4 justify-between">
        {activeSet ? (
          <Button variant="ghost" onClick={() => setActiveSet(null)} className="text-text-muted hover:text-primary pl-0 gap-2">
            <ArrowLeft className="h-5 w-5" /> Back to Sets
          </Button>
        ) : (
          <span className="font-black text-xl text-primary tracking-tight">VocabMaster</span>
        )}

        <Button size="icon" variant="ghost" onClick={() => setIsAddOpen(true)} className="text-primary bg-primary/10 hover:bg-primary/20 rounded-full">
          <PlusIcon className="h-5 w-5" />
        </Button>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto min-h-[calc(100vh-3.5rem)]">

        {!activeSet ? (
          // View 1: List of Sets
          <SetsPage words={words} onSelectSet={setActiveSet} />
        ) : (
          // View 2: Learning Mode (List of Cards in the set)
          <div className="p-4 space-y-8 pb-24">
            <header className="text-center mb-6">
              <h2 className="text-2xl font-bold text-text-main">Set {activeSet}</h2>
              <p className="text-text-dim text-sm">{activeWords.length} Words to Review</p>
            </header>

            {/* List of cards for this set */}
            {activeWords.length > 0 ? (
              activeWords.map((word) => (
                <WordCard
                  key={word.id}
                  word={word}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))
            ) : (
              <div className="text-center py-20 text-text-muted">
                This set is empty. Add more words!
              </div>
            )}

            {/* Navigation footer for the set could go here (Next Set, etc) */}
          </div>
        )}
      </main>

      <ManualEntryDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddWord}
      />
    </div>
  );
};

export default App;
