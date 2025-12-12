import { Link, useNavigate } from 'react-router-dom';
import Flashcard from '../features/phrasal/components/Flashcard';
import { Icon } from '@/components/ui/MaterialIconHelper';
import { Progress } from '@/components/ui/progress';
import { MOCK_PHRASAL_VERBS } from '@/data/vocabulary';
import { useQuery, useMutation, useConvexAuth } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Simplified Flashcard component logic needs update to fetch its data and handle logic
// For now, we will keep Flashcard.tsx as a simple presentation component and handle the data flow here.

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
      <div className="flex h-screen flex-col items-center justify-center bg-background-dark text-white gap-4">
        <h1 className="text-4xl font-bold text-primary">Phrasal Verb Master!</h1>
        <p className="text-xl text-gray-400">You have mastered all available phrasal verbs.</p>
        <Button onClick={() => navigate('/tests')}>Start a Test</Button>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-background-dark dark:text-white min-h-screen flex flex-col">
      {/* Navbar is now handled in App.tsx */}

      <main className="flex-grow flex flex-col items-center px-6 py-4 relative h-[calc(100vh-80px)] max-h-[900px]">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-[1200px] w-full flex flex-col gap-6 h-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 w-full flex-shrink-0">
            <div className="flex flex-col gap-1">
              <Link className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium" to="/">
                <Icon name="arrow_back" className="text-[18px]" /> Back to Home
              </Link>
              <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                <span className="text-primary">Phrasal</span> Verbs
              </h1>
            </div>

            <div className="w-full md:w-64 flex flex-col gap-2 bg-surface-dark/50 p-3 rounded-xl border border-surface-border backdrop-blur-sm">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white font-medium">Session Progress</span>
                <span className="text-primary font-bold">{currentIndex + 1} <span className="text-gray-400 font-normal">/ {verbsToLearn.length}</span></span>
              </div>
              <Progress value={sessionProgress} className="h-2 bg-surface-border" indicatorClassName="shadow-[0_0_10px_var(--color-primary)]" />
            </div>
          </div>

          {/* Flashcard Area */}
          <div className="flex flex-col md:flex-row gap-6 h-full min-h-0 flex-1 pb-4">
            {/* The Flashcard component should now receive the verb data */}
            <div className="flex-1 min-h-0">
                <Flashcard verbData={currentVerb} />
            </div>

            {/* Controls */}
            <div className="w-full md:w-24 flex md:flex-col items-center justify-center gap-4 flex-shrink-0">
              <button
                onClick={() => handleAction('known')}
                className="size-14 md:size-16 rounded-full bg-surface-dark border border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400 transition-all shadow-[0_0_15px_rgba(74,222,128,0.1)]">
                <Icon name="check" className="text-3xl" />
              </button>
              <button
                onClick={() => handleAction('unknown')}
                className="size-14 md:size-16 rounded-full bg-surface-dark border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all shadow-[0_0_15px_rgba(248,113,113,0.1)]">
                <Icon name="close" className="text-3xl" />
              </button>
              <div className="hidden md:block flex-grow"></div>
              <div className="flex md:flex-col gap-4">
                <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + verbsToLearn.length) % verbsToLearn.length)}
                    disabled={verbsToLearn.length <= 1}
                    className="size-14 md:size-16 rounded-full bg-surface-border text-white flex items-center justify-center hover:bg-surface-highlight active:scale-95 transition-all disabled:opacity-50">
                    <Icon name="arrow_upward" className="text-3xl" />
                </button>
                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % verbsToLearn.length)}
                    disabled={verbsToLearn.length <= 1}
                    className="size-20 rounded-full bg-primary text-black flex items-center justify-center hover:bg-[#2ecc71] hover:shadow-[0_0_20px_var(--color-primary)] active:scale-95 transition-all shadow-[0_0_15px_rgba(54,226,123,0.4)] disabled:opacity-50">
                    <Icon name="arrow_downward" className="text-4xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
