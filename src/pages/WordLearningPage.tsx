import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { useConvexAuth } from "convex/react";
import { api } from '../../convex/_generated/api';
import { vocabularyListPart1 } from '@/data/vocabulary';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function WordLearningPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const progressData = useQuery(api.wordProgress.getProgress) || [];
  const updateProgress = useMutation(api.wordProgress.updateProgress);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  // Compute learned words set
  const learnedWords = useMemo(() => {
    return new Set((progressData || []).filter(p => p.status === 'known').map(p => p.word));
  }, [progressData]);

  // Compute remaining words
  const wordsToLearn = useMemo(() => {
    return vocabularyListPart1.filter(word => !learnedWords.has(word.mainWord));
  }, [learnedWords]);

  // Current word state
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = wordsToLearn[currentIndex];

  // Progress stats
  const totalWords = vocabularyListPart1.length;
  const learnedCount = learnedWords.size;
  const progressPercentage = Math.round((learnedCount / totalWords) * 100);

  const handleAction = async (action: 'known' | 'unknown') => {
// ... existing generic handler code ...

    if (!currentWord) return;

    // Optimistic update or just wait for Convex?
    // For smoothness, we can just move to next word immediately,
    // but actual removal from list depends on Convex query update.
    // However, since `wordsToLearn` is derived from `progressData`,
    // it will update automatically when mutation finishes.

    // To prevent jitter, we can optimistically increment local index?
    // Actually, if we mark as 'known', it disappears from 'wordsToLearn'.
    // If we mark "unknown", it stays but maybe we shuffle?
    // For now, simple implementation: Mark and let reactivity handle it.

    // If 'unknown', we basically skip it for now.
    // If 'known', it gets removed from the list.

    if (action === 'known') {
       await updateProgress({ word: currentWord.mainWord, status: 'known' });
       // No need to increment index, as array shrinks.
    } else {
       await updateProgress({ word: currentWord.mainWord, status: 'unknown' });
       setCurrentIndex((prev) => (prev + 1) % wordsToLearn.length);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleAction('known');
      } else if (e.key.toLowerCase() === 'x') {
        handleAction('unknown');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWord]); // Re-bind when word changes

  if (isAuthLoading) return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;

  if (wordsToLearn.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background-dark text-white gap-4">
        <h1 className="text-4xl font-bold text-primary">All Caught Up!</h1>
        <p className="text-xl text-gray-400">You have learned all available words.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  if (!currentWord) return null; // Should be handled by empty check

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col overflow-hidden">
      {/* Header handled by Navbar Layout now, but we might want specific stats bar below it or just rely on main content */}

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-8 relative z-10 pt-10">
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Stats */}
        <div className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-surface-dark border border-surface-border p-3">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-xl fill">local_fire_department</span>
              <span className="text-xl font-bold">12</span>
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Day Streak</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-surface-dark border border-surface-border p-3">
            <div className="flex items-center gap-2 text-blue-400">
              <span className="material-symbols-outlined text-xl">library_books</span>
              <span className="text-xl font-bold">{learnedCount}</span>
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Words Learned</span>
          </div>
          <div className="col-span-2 flex flex-col justify-center gap-2 rounded-2xl bg-surface-dark border border-surface-border p-4">
            <div className="flex justify-between items-end">
              <span className="text-xs text-gray-300 font-medium">Total Progress</span>
              <span className="text-xs text-primary font-bold">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-black/40" />
          </div>
        </div>

        {/* Main Word Card */}
        <div className="w-full max-w-lg perspective-1000">
          <div className="relative w-full bg-surface-dark rounded-[2.5rem] border border-surface-border shadow-2xl p-8 md:p-10 flex flex-col gap-6 transform transition-transform duration-300">
            <div className="flex flex-col gap-2 text-center items-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-shadow-glow mb-2">{currentWord.mainWord}</h1>
              {/* Audio button placeholder */}
              <div className="flex items-center gap-3">
                 {/* Phonetic could go here if available */}
                <button className="flex items-center justify-center size-8 rounded-full bg-white/5 hover:bg-primary/20 text-white hover:text-primary transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center flex-wrap gap-2">
               {currentWord.hindimeanings.slice(0, 3).map((mean, i) => (
                  <div key={i} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200">
                    <span className="material-symbols-outlined text-sm text-slate-400">translate</span>
                    <span className="font-medium">{mean}</span>
                  </div>
               ))}
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

             {/* English Meanings */}
            <div className="flex flex-col gap-3 items-center text-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Meaning</span>
              <p className="text-slate-300 text-lg leading-relaxed">
                {currentWord.englishmeanings[0]}
              </p>
            </div>

            {/* Examples */}
            {currentWord.examples.length > 0 && (
                <div className="relative mt-2 p-5 rounded-2xl bg-black/20 border border-white/5">
                <span className="absolute top-3 left-3 material-symbols-outlined text-primary/30 text-3xl select-none">format_quote</span>
                <p className="relative z-10 text-slate-300 text-center leading-relaxed font-body">
                    {currentWord.examples[0][0]}
                    <br/>
                    <span className="text-sm text-slate-500 mt-1 block">{currentWord.examples[0][1]}</span>
                </p>
                </div>
            )}

            {/* Mnemonics */}
            {currentWord.mnemonics && (
                 <div className="text-xs text-orange-300/80 text-center italic mt-1">
                    💡 {currentWord.mnemonics}
                 </div>
            )}

            {/* Keyboard hint */}
             <div className="absolute top-4 right-6 text-[10px] text-slate-600 font-mono hidden md:block">
                SPACE = KNOWN
             </div>
          </div>
        </div>

        {/* Actions */ }
        <div className="w-full max-w-lg flex items-center justify-center gap-4 mt-2">
          <Button
            variant="outline"
            onClick={() => handleAction('unknown')}
            className="flex-1 h-14 rounded-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <span className="material-symbols-outlined mr-2">close</span>
            I don't know (X)
          </Button>
          <Button
            onClick={() => handleAction('known')}
            className="flex-[1.5] h-14 rounded-full bg-primary text-background-dark font-bold hover:bg-[#4ff590]"
          >
            <span className="material-symbols-outlined mr-2">check</span>
            I know this word (Space)
          </Button>
        </div>
      </main>
    </div>
  );
}
