import { Link, useNavigate } from 'react-router-dom';
import Flashcard from '../features/phrasal/components/Flashcard';
import { Icon } from '@/components/ui/MaterialIconHelper';
import { Progress } from '@/components/ui/progress';
import { MOCK_PHRASAL_VERBS } from '@/data/vocabulary';
import { useQuery, useMutation, useConvexAuth } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function PhrasalVerbsPage() {
    const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
    const navigate = useNavigate();

    // Fetch user progress for phrasal verbs
    const rawProgressData = useQuery(api.wordProgress.getProgress, { contentType: "phrasal" });
    const updateProgress = useMutation(api.wordProgress.updateProgress);

    // Redirect if not authenticated
    useEffect(() => {
      if (!isAuthLoading && !isAuthenticated) {
        navigate('/auth?mode=login');
      }
    }, [isAuthLoading, isAuthenticated, navigate]);

    // Filter out mastered verbs (masteryLevel >= 5) and handle the list
    const progressMap = useMemo(() => {
        const map = new Map<string, number>();
        (rawProgressData || []).forEach(p => map.set(p.contentId, p.masteryLevel));
        return map;
    }, [rawProgressData]);

    const verbsToLearn = useMemo(() => {
        return MOCK_PHRASAL_VERBS
            .map(verb => ({
                ...verb,
                masteryLevel: progressMap.get(verb.id) || 0,
            }))
            .filter(verb => verb.masteryLevel < 5); // Only show unmastered verbs
    }, [progressMap]);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset index if out of bounds (safe render pattern)
    if (currentIndex >= verbsToLearn.length && verbsToLearn.length > 0) {
      setCurrentIndex(0);
    }

    const currentVerb = verbsToLearn[currentIndex];

    // Progress stats
    const sessionProgress = Math.min(Math.round((currentIndex / verbsToLearn.length) * 100), 100) || 0;


    const handleAction = async (action: 'known' | 'unknown') => {
        if (!currentVerb) return;

        await updateProgress({
          contentId: currentVerb.id,
          contentType: currentVerb.type,
          contentNumber: MOCK_PHRASAL_VERBS.findIndex(v => v.id === currentVerb.id) + 1, // Simple index for now
          action: action,
        });

        // Move to next (or previous) word in the list
        if (verbsToLearn.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % verbsToLearn.length);
        } else {
             // Edge case: Finished all verbs, navigate back
             navigate('/tests');
        }
    };

  if (isAuthLoading) return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;
  if (!isAuthenticated) return null; // Redirect handled by useEffect

  if (verbsToLearn.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background-dark text-white gap-4 p-4">
        <Icon name="workspace_premium" className="text-7xl md:text-8xl text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">Phrasal Verb Master!</h1>
        <p className="text-base md:text-xl text-gray-400 text-center max-w-md">You have mastered all available phrasal verbs.</p>
        <Button onClick={() => navigate('/tests')} variant="glow" className="mt-4">
          <Icon name="quiz" className="mr-2" />
          Start a Test
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-background-dark dark:text-white min-h-screen flex flex-col">
      <main className="grow flex flex-col items-center px-3 md:px-6 py-4 md:py-6 relative h-dvh md:h-[calc(100vh-80px)] max-h-[900px]">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-[1200px] w-full flex flex-col gap-4 md:gap-6 h-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 w-full shrink-0">
            <div className="flex flex-col gap-1">
              <Link className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-xs md:text-sm font-medium" to="/">
                <Icon name="arrow_back" className="text-base md:text-[18px]" /> Back to Home
              </Link>
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                <span className="text-primary">Phrasal</span> Verbs
              </h1>
            </div>

            <div className="w-full md:w-64 flex flex-col gap-2 bg-surface-dark/50 p-2.5 md:p-3 rounded-xl border border-surface-border backdrop-blur-sm">
              <div className="flex justify-between items-center text-xs md:text-sm">
                <span className="text-white font-medium">Session Progress</span>
                <span className="text-primary font-bold">{currentIndex + 1} <span className="text-gray-400 font-normal">/ {verbsToLearn.length}</span></span>
              </div>
              <Progress value={sessionProgress} className="h-1.5 md:h-2 bg-surface-border" indicatorClassName="shadow-[0_0_10px_var(--color-primary)]" />
            </div>
          </div>

          {/* Flashcard Area */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-full min-h-0 flex-1 pb-4">
            {/* The Flashcard component */}
            <div className="flex-1 min-h-0">
                <Flashcard verbData={currentVerb} />
            </div>

            {/* Controls */}
            <div className="w-full md:w-20 lg:w-24 flex md:flex-col items-center justify-center gap-3 md:gap-4 shrink-0">
              <button
                onClick={() => handleAction('known')}
                className="size-12 md:size-14 lg:size-16 rounded-full bg-surface-dark border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all shadow-[0_0_15px_rgba(74,222,128,0.1)] touch-manipulation active:scale-95">
                <Icon name="check" className="text-2xl md:text-3xl" />
              </button>
              <button
                onClick={() => handleAction('unknown')}
                className="size-12 md:size-14 lg:size-16 rounded-full bg-surface-dark border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all shadow-[0_0_15px_rgba(248,113,113,0.1)] touch-manipulation active:scale-95">
                <Icon name="close" className="text-2xl md:text-3xl" />
              </button>
              <div className="hidden md:block grow"></div>
              <div className="flex md:flex-col gap-3 md:gap-4">
                <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + verbsToLearn.length) % verbsToLearn.length)}
                    disabled={verbsToLearn.length <= 1}
                    className="size-12 md:size-14 lg:size-16 rounded-full bg-surface-border text-white flex items-center justify-center hover:bg-surface-highlight active:scale-95 transition-all disabled:opacity-50 touch-manipulation">
                    <Icon name="arrow_upward" className="text-2xl md:text-3xl" />
                </button>
                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % verbsToLearn.length)}
                    disabled={verbsToLearn.length <= 1}
                    className="size-16 md:size-18 lg:size-20 rounded-full bg-primary text-black flex items-center justify-center hover:bg-[#2ecc71] hover:shadow-[0_0_20px_var(--color-primary)] active:scale-95 transition-all shadow-[0_0_15px_rgba(54,226,123,0.4)] disabled:opacity-50 touch-manipulation">
                    <Icon name="arrow_downward" className="text-3xl md:text-4xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
