import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useConvexAuth } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { MOCK_WORD_LIST } from '@/data/vocabulary';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Icon } from '@/components/ui/MaterialIconHelper';
import { getMasteryColor } from '@/data/data-type';

export default function WordLearningPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();

  // Fetch user progress for words
  const rawProgressData = useQuery(api.wordProgress.getProgress, { contentType: "word" });

  // Calculate start step for smart resume (find max learned step + 1)
  const startStep = useMemo(() => {
      if (!rawProgressData) return 1;
      const learned = rawProgressData.filter(p => p.masteryLevel >= 3);
      if (learned.length === 0) return 1;
      return Math.max(...learned.map(p => p.contentNumber)) + 1;
  }, [rawProgressData]);

  // Fetch words from Convex
  const wordsData = useQuery(api.words.getWords, { limit: 100, startStep });

  // Fetch user progress for words (already declared)
  const updateProgress = useMutation(api.wordProgress.updateProgress);

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

  // Stats calculation based on loaded words
  const totalWords = wordsData ? wordsData.length : 0; // Currently only loaded batch
  const learnedCount = wordsData ? wordsData.filter(word => (progressMap.get(word._id) || 0) >= 3).length : 0;
  const wordsToReview = wordsData ? wordsData.filter(word => (progressMap.get(word._id) || 0) >= 1 && (progressMap.get(word._id) || 0) < 3).length : 0;
  // Note: progressPercentage here is only for the *loaded batch*, not global.
  // For global, we might need a separate query for total count.
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

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleAction = async (action: 'known' | 'unknown') => {
    if (!currentWord || isDeliberating) return;

    // Reset deliberation for next word
    setIsDeliberating(true);
    setTimeLeft(3);

    await updateProgress({
      contentId: currentWord.id,
      contentType: currentWord.type,
      contentNumber: currentWord.step,
      action: action,
    });

    // Move to next word (simplistic circular logic for now)
    // The list is reactive, so we update the local index.
    setCurrentIndex((prev) => (prev + 1) % wordsForSession.length);
  };

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
  }, [currentWord, isDeliberating]);

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
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-8 relative z-10 pt-10">
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Stats */}
        <div className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-secondary-dark/50 border border-white/5 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-blue-400">
              <Icon name="library_books" />
              <span className="text-xl font-bold">{learnedCount}</span>
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Words Known</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-secondary-dark/50 border border-white/5 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-red-400">
              <Icon name="priority_high" />
              <span className="text-xl font-bold">{wordsToReview}</span>
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">To Review</span>
          </div>
          <div className="col-span-2 flex flex-col justify-center gap-2 rounded-2xl bg-secondary-dark/50 border border-white/5 p-4 backdrop-blur-sm">
            <div className="flex justify-between items-end">
              <span className="text-xs text-gray-300 font-medium">Total Vocabulary Progress</span>
              <span className="text-xs text-primary font-bold">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-black/40" indicatorClassName="shadow-[0_0_10px_#36e27b]" />
          </div>
        </div>

        {/* Word Card */}
        <div className="w-full max-w-lg md:max-w-5xl perspective-1000">
          <div className="relative w-full bg-surface-dark rounded-[2.5rem] border border-white/10 shadow-radiant p-8 md:p-12 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center transform transition-transform duration-300">

            {/* Word Step Indicator */}
            <div className='absolute top-6 left-8 text-xs font-bold text-gray-500'>
                Word {currentWord.step} of {MOCK_WORD_LIST.length}
            </div>

            {/* Mastery Level Indicator */}
            <div className={`absolute top-6 right-8 px-3 py-1 rounded-full text-xs font-bold ${getMasteryColor(currentWord.masteryLevel)}`}>
                Mastery: {currentWord.masteryLevel}/5
            </div>

            {/* Left Column: Word & Identity */}
            <div className="flex flex-col gap-6 text-center items-center justify-center h-full">
              <div className="flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight text-shadow-glow mb-4 flex items-center gap-4">
                    {currentWord.word}
                    <button
                        onClick={() => playAudio(currentWord.word)}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all transform hover:scale-110 active:scale-95"
                        title="Listen to pronunciation"
                    >
                        <Icon name="volume_up" className="text-3xl" />
                    </button>
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-2">
                    {currentWord.hindiMeanings.map((meaning: string, idx: number) => (
                      <div key={idx} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-200">
                          {idx === 0 && <Icon name="translate" className="text-sm text-slate-400" />}
                          <span className="font-medium text-lg">{meaning}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Divider for Mobile Only */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent md:hidden"></div>

            {/* Divider for Desktop (Vertical) */}
            <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

             {/* Right Column: Meaning & Context */}
            <div className="flex flex-col gap-6 items-center text-center md:items-start md:text-left h-full justify-center">
              <div className="flex flex-col gap-3">
                  <span className="text-sm font-bold text-primary uppercase tracking-widest">Definition</span>
                  <p className="text-slate-200 text-xl md:text-2xl leading-relaxed font-medium">
                    {currentWord.meaning}
                  </p>
              </div>

              {/* Examples */}
              {currentWord.sentence && (
                  <div className="relative w-full mt-2 p-6 rounded-2xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors">
                    <Icon name="format_quote" className="absolute top-4 left-4 text-primary/30 text-3xl select-none" />
                    <p className="relative z-10 text-slate-300 text-lg leading-relaxed font-body pl-6 italic">
                        "{currentWord.sentence.replace(currentWord.word, `<strong class="text-primary not-italic">${currentWord.word}</strong>`)}"
                    </p>
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */ }
        <div className="w-full max-w-lg md:max-w-3xl flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => handleAction('unknown')}
            disabled={isDeliberating}
            className="flex-1 h-14 rounded-full border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all disabled:opacity-50 disabled:cursor-wait"
          >
            <Icon name="close" />
            I need review (X)
          </Button>
          <Button
            onClick={() => handleAction('known')}
            variant="glow"
            size="xl"
            disabled={isDeliberating}
            className="flex-[1.5] transition-all disabled:opacity-50 disabled:cursor-wait"
          >
            {isDeliberating ? (
                <span className="flex items-center gap-2">
                    <Icon name="hourglass_empty" className="animate-spin" />
                    Wait {timeLeft}s...
                </span>
            ) : (
                <>
                <Icon name="check" />
                I know this word (Space)
                </>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}
