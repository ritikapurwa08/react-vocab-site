import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useConvexAuth } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { MOCK_WORD_LIST } from '@/data/vocabulary';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Icon } from '@/components/ui/MaterialIconHelper';
import { getMasteryColor } from '@/data/data-type';
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { Id } from 'convex/_generated/dataModel';

// ... (rest of imports)

// Inside component render...

                            {/* Hindi Meanings - Responsive Layout */}
                            <div className={cn(
                                // Mobile styles: Horizontal scroll, single line
                                "w-full overflow-x-auto scrollbar-hide flex items-center gap-2",
                                // Desktop styles: No scroll, wrap, centered
                                "md:overflow-visible md:flex-wrap md:justify-center md:w-full"
                            )}>
                                {currentWord.hindiMeanings.map((meaning: string, idx: number) => (
                                    <div
                                        key={idx}
                                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/20 border border-primary/40 text-primary shadow-sm hover:shadow-primary/20 transition-shadow shrink-0"
                                    >
                                        <span className="font-semibold text-sm md:text-base whitespace-nowrap">{meaning}</span>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleOpenDialog('hindi')}
                                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/30 border-dashed text-primary/80 hover:bg-primary/20 hover:border-primary/50 transition-all shrink-0"
                                    title="Add Hindi meaning"
                                >
                                    <span className="font-medium text-sm md:text-base whitespace-nowrap">+ Add</span>
                                </button>
                            </div>

// ...

                            {/* Synonyms - Responsive Layout */}
                            {currentWord.synonyms && currentWord.synonyms.length > 0 && (
                                <div className="w-full mt-3 md:mt-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                                        Synonyms
                                    </span>
                                    <div className={cn(
                                        // Mobile styles: Horizontal scroll, single line
                                        "w-full overflow-x-auto scrollbar-hide flex items-center gap-2",
                                        // Desktop styles: No scroll, wrap, left-aligned
                                        "md:overflow-visible md:flex-wrap md:justify-start md:w-full"
                                    )}>
                                        {currentWord.synonyms.map((synonym: string, idx: number) => (
                                            <div
// ...

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { Id } from 'convex/_generated/dataModel';

export default function WordLearningPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();

  // Dialog state for adding meanings/synonyms
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'hindi' | 'synonym'>('hindi');
  const [inputValue, setInputValue] = useState('');

  // Fetch words from Convex (Smart Resume)
  const wordsData = useQuery(api.words.getNextWords);

  // Fetch user progress for words (needed for UI state)
  const rawProgressData = useQuery(api.wordProgress.getProgress, { contentType: "word" });

  // Fetch user progress for words (already declared)
  const updateProgress = useMutation(api.wordProgress.updateProgress);
  const addContributions = useMutation(api.words.addWordContributions);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  // Map progress data to a lookup map
  const progressMap = useMemo(() => {
    const map = new Map<string, number>();
    (rawProgressData || []).forEach(p => map.set(p.contentId, p.masteryLevel));
    return map;
  }, [rawProgressData]);

  // Compute words for session
  const wordsForSession = useMemo(() => {
    if (!wordsData) return [];

    // Map Convex docs to WordData structure (using _id as id)
    return wordsData
        .map(word => ({
            ...word,
            id: word._id, // Use Convex ID
            masteryLevel: progressMap.get(word._id) || 0,
        }))
        // Filter: Show all words that are not fully mastered (mastery < 3)
        .filter(word => word.masteryLevel < 3);
  }, [progressMap, wordsData]);

  // Current word state
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = wordsForSession[currentIndex];

  // Recalculate index if list shrinks/changes
  if (currentIndex >= wordsForSession.length && wordsForSession.length > 0) {
    setCurrentIndex(0); // Reset if current index is out of bounds
  }

  // Stats calculation based on global progress data (rawProgressData)
  const totalWords = MOCK_WORD_LIST.length;
  const learnedCount = useMemo(() =>
    rawProgressData ? rawProgressData.filter(p => p.masteryLevel >= 3).length : 0
  , [rawProgressData]);

  const wordsToReview = useMemo(() =>
    rawProgressData ? rawProgressData.filter(p => p.masteryLevel >= 1 && p.masteryLevel < 3).length : 0
  , [rawProgressData]);

  const progressPercentage = totalWords > 0 ? Math.round((learnedCount / totalWords) * 100) : 0;

  // Deliberation & Audio Logic
  const [isDeliberating, setIsDeliberating] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    if (currentWord) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsDeliberating(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentWord]);



  const handleAction = useCallback(async (action: 'known' | 'unknown') => {
    if (!currentWord || isDeliberating) return;

    // Reset deliberation for next word
    setIsDeliberating(true);
    setTimeLeft(3);

    await updateProgress({
      contentId: currentWord.id,
      contentType: currentWord.type as "word" | "phrasal" | "idiom",
      contentNumber: currentWord.step,
      action: action,
    });

    // When marking as "known", the word gets filtered out (mastery >= 3)
    // So we DON'T increment the index - the next word will automatically appear at the same index
    // When marking as "unknown", the word stays in the list but we move to the next one
    if (action === 'unknown') {
      setCurrentIndex((prev) => (prev + 1) % wordsForSession.length);
    }
    // For "known", index stays the same - the filtered list will show the next word
  }, [currentWord, isDeliberating, updateProgress, wordsForSession.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentWord || isDeliberating) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleAction('known');
      } else if (e.key.toLowerCase() === 'x') {
        handleAction('unknown');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWord, handleAction, isDeliberating]);

  // Handle opening the add dialog
  const handleOpenDialog = (type: 'hindi' | 'synonym') => {
    setDialogType(type);
    setInputValue('');
    setDialogOpen(true);
  };

  // Handle submitting new meanings/synonyms
  const handleSubmitAddition = async () => {
    if (!inputValue.trim()) {
      toast.error("Please enter at least one word");
      return;
    }

    // Parse comma-separated values
    const newItems = inputValue
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (newItems.length === 0) {
      toast.error("Please enter valid words");
      return;
    }

    if (!currentWord) {
      toast.error("No word selected");
      return;
    }

    try {
      const result = await addContributions({
        wordId: currentWord.id as Id<"words">,
        type: dialogType,
        items: newItems,
      });

      if (result.added > 0) {
        toast.success(`✅ Added ${result.added} ${result.type}`);
      } else {
        toast.info("All items already exist");
      }

      setDialogOpen(false);
      setInputValue('');
    } catch (error) {
      toast.error("Failed to add items");
      console.error(error);
    }
  };

  const isLoadingWords = wordsData === undefined;
  if (isAuthLoading || !isAuthenticated || isLoadingWords) return <div className="flex h-screen items-center justify-center text-white">Loading Vocabulary...</div>;

  if (wordsForSession.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background-dark text-white gap-4">
        <h1 className="text-4xl font-bold text-primary">All Caught Up!</h1>
        <p className="text-xl text-gray-400">You have completed all review and new words for now.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  if (!currentWord) return null;

  return (
    <div className="bg-background-light dark:bg-background-dark h-dvh flex flex-col overflow-hidden">
      <main className="flex-1 flex flex-col p-3 md:p-8 relative z-10 w-full max-w-5xl mx-auto">
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

        {/* Stats - Compact Row for Mobile */}
        <div className="w-full grid grid-cols-3 gap-2 mb-4 shrink-0">
          <div className="flex flex-col items-center justify-center rounded-xl bg-secondary-dark/50 border border-white/5 p-2 backdrop-blur-sm">
             <span className="text-lg md:text-xl font-bold text-blue-400">{learnedCount}</span>
             <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase">Known</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-xl bg-secondary-dark/50 border border-white/5 p-2 backdrop-blur-sm">
             <span className="text-lg md:text-xl font-bold text-red-400">{wordsToReview}</span>
             <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase">Review</span>
          </div>
          <div className="flex flex-col justify-center rounded-xl bg-secondary-dark/50 border border-white/5 p-2 px-3 backdrop-blur-sm relative overflow-hidden">
               <div className="flex justify-between items-end relative z-10 mb-1">
                <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase">Progress</span>
                <span className="text-xs text-primary font-bold">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-1.5 bg-black/40" indicatorClassName="bg-primary/80" />
          </div>
        </div>

        {/* Word Card Content Area - Flex Grow to fill space but allow scroll */}
        <div className="flex-1 min-h-0 w-full perspective-1000 relative flex flex-col mb-4">
          <div className="relative w-full h-full bg-surface-dark rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-radiant flex flex-col md:grid md:grid-cols-2 overflow-hidden">

             {/* Scrollable Content Wrapper */}
             <div className="flex-1 overflow-y-auto scrollbar-hide p-6 md:p-12">
                <div className="flex flex-col gap-6 md:gap-16 md:grid md:grid-cols-1 items-center h-full">

                    {/* Indicators */}
                    <div className="w-full flex justify-between items-center md:absolute md:top-6 md:left-8 md:right-8 md:w-auto">
                        <div className='text-[10px] md:text-xs font-bold text-gray-500'>
                            Word {currentWord.step} / {totalWords}
                        </div>
                        <div className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold ${getMasteryColor(currentWord.masteryLevel)}`}>
                            Lvl {currentWord.masteryLevel}
                        </div>
                    </div>

                    {/* Desktop Split Layout */}
                     <div className="w-full flex flex-col md:grid md:grid-cols-2 md:gap-16 md:items-center">
                        {/* Word Section */}
                        <div className="flex flex-col gap-4 text-center items-center justify-center mt-2 md:mt-0">
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight text-shadow-glow flex flex-col items-center wrap-break-word text-center">
                                <span className="break-all">{currentWord.word}</span>
                            </h1>

                            {/* Hindi Meanings - Scrollable on Mobile, Wrapped on Desktop */}
                            <div className="w-full overflow-x-auto md:overflow-x-visible scrollbar-hide">
                                <div className="flex md:flex-wrap items-center gap-2 w-max md:w-full min-w-full md:min-w-0 justify-center">
                                    {currentWord.hindiMeanings.map((meaning: string, idx: number) => (
                                        <div
                                            key={idx}
                                            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/20 border border-primary/40 text-primary shadow-sm hover:shadow-primary/20 transition-shadow shrink-0"
                                        >
                                            <span className="font-semibold text-sm md:text-base whitespace-nowrap">{meaning}</span>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => handleOpenDialog('hindi')}
                                        className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/30 border-dashed text-primary/80 hover:bg-primary/20 hover:border-primary/50 transition-all shrink-0"
                                        title="Add Hindi meaning"
                                    >
                                        <span className="font-medium text-sm md:text-base whitespace-nowrap">+ Add</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Divider Mobile */}
                        <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent md:hidden shrink-0 my-2"></div>

                        {/* Divider Desktop */}
                        <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-linear-to-b from-transparent via-white/10 to-transparent"></div>

                        {/* Definition Section */}
                        <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left justify-center w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <span className="text-xs md:text-sm font-bold text-primary uppercase tracking-widest hidden md:block">Definition</span>
                                <p className="text-slate-200 text-lg md:text-2xl leading-relaxed font-medium">
                                    {currentWord.meaning}
                                </p>
                            </div>

                            {/* Example */}
                            {currentWord.sentence && (
                                <div className="relative w-full mt-2 p-4 md:p-6 rounded-2xl bg-black/20 border border-white/5">
                                    <p className="relative z-10 text-slate-300 text-base md:text-lg leading-relaxed font-body italic">
                                        <span dangerouslySetInnerHTML={{ __html: currentWord.sentence.replace(new RegExp(currentWord.word, 'gi'), match => `<strong class="text-primary not-italic">${match}</strong>`) }} />
                                    </p>
                                </div>
                            )}

                            {/* Synonyms - Scrollable on Mobile, Wrapped on Desktop */}
                            {currentWord.synonyms && currentWord.synonyms.length > 0 && (
                                <div className="w-full mt-3 md:mt-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                                        Synonyms
                                    </span>
                                    <div className="w-full overflow-x-auto md:overflow-x-visible scrollbar-hide">
                                        <div className="flex md:flex-wrap items-center gap-2 w-max md:w-full min-w-0 md:justify-start">
                                            {currentWord.synonyms.map((synonym: string, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/20 border border-primary/40 text-primary shadow-sm hover:shadow-primary/20 transition-shadow shrink-0"
                                                >
                                                    <span className="font-semibold text-sm md:text-base whitespace-nowrap">{synonym}</span>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => handleOpenDialog('synonym')}
                                                className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 border border-primary/30 border-dashed text-primary/80 hover:bg-primary/20 hover:border-primary/50 transition-all shrink-0"
                                                title="Add synonym"
                                            >
                                                <span className="font-medium text-sm md:text-base whitespace-nowrap">+ Add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Actions - Fixed at Bottom */}
        <div className="w-full shrink-0 flex items-center justify-center gap-3   pb-16  md:pb-0 z-50 bg-background-light/0 dark:bg-background-dark/0 backdrop-blur-none">
          <Button
            variant="outline"
            onClick={() => handleAction('unknown')}
            disabled={isDeliberating}
            className="flex-1 h-12 md:h-14 rounded-full border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all disabled:opacity-50 disabled:cursor-wait text-sm font-bold"
          >
            Review (X)
          </Button>
          <Button
            onClick={() => handleAction('known')}
            variant="glow"
            size="xl"
            disabled={isDeliberating}
            className="flex-[1.5] h-12 md:h-14 transition-all disabled:opacity-50 disabled:cursor-wait text-sm font-bold"
          >
            {isDeliberating ? (
                <span className="flex items-center gap-2">
                    <Icon name="hourglass_empty" className="animate-spin" />
                    {timeLeft}s
                </span>
            ) : (
                <>
                I Know (Space)
                </>
            )}
          </Button>
        </div>
      </main>

      {/* Add Meanings/Synonyms Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="bg-surface-dark border-surface-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl font-bold">
              Add {dialogType === 'hindi' ? 'Hindi Meaning(s)' : 'Synonym(s)'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Enter one or more {dialogType === 'hindi' ? 'Hindi meanings' : 'synonyms'} separated by commas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={dialogType === 'hindi' ? 'e.g., शब्द, अर्थ, परिभाषा' : 'e.g., word, term, expression'}
              className="bg-background-dark border-surface-border text-white placeholder:text-gray-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmitAddition();
                }
              }}
            />
            <p className="text-xs text-gray-500 mt-2">Separate multiple items with commas</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-surface-border hover:bg-surface-highlight text-white border-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmitAddition}
              className="bg-primary hover:bg-primary/90 text-background-dark"
            >
              Add
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
