import { Icon } from "@/components/ui/MaterialIconHelper";
import { Link, useNavigate } from "react-router-dom";
import { useConvexAuth, useQuery } from "convex/react";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { api } from '../../convex/_generated/api';
import { MOCK_TEST_QUESTIONS } from '@/data/vocabulary';

export default function TestSelection() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const navigate = useNavigate();

  // Fetch attempted questions for all test types
  const vocabularyAttempted = useQuery(api.testAttempts.getAttemptedQuestions,
    isAuthenticated ? { testType: "vocabulary" } : "skip"
  );
  const phrasalAttempted = useQuery(api.testAttempts.getAttemptedQuestions,
    isAuthenticated ? { testType: "phrasal" } : "skip"
  );
  const idiomsAttempted = useQuery(api.testAttempts.getAttemptedQuestions,
    isAuthenticated ? { testType: "idiom" } : "skip"
  );
  const grammarAttempted = useQuery(api.testAttempts.getAttemptedQuestions,
    isAuthenticated ? { testType: "grammar" } : "skip"
  );

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  if (isAuthLoading) return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;

  const getTestStats = (testType: string) => {
    const allQuestions = MOCK_TEST_QUESTIONS.filter(q => q.testType === testType);
    const totalQuestions = allQuestions.length;

    let attemptedCount = 0;
    switch(testType) {
      case 'vocabulary': attemptedCount = vocabularyAttempted?.length || 0; break;
      case 'phrasal': attemptedCount = phrasalAttempted?.length || 0; break;
      case 'idiom': attemptedCount = idiomsAttempted?.length || 0; break;
      case 'grammar': attemptedCount = grammarAttempted?.length || 0; break;
    }

    const availableQuestions = totalQuestions - attemptedCount;
    const percentComplete = totalQuestions > 0 ? Math.round((attemptedCount / totalQuestions) * 100) : 0;

    return { totalQuestions, attemptedCount, availableQuestions, percentComplete };
  };

  const tests = [
    {
      title: "Vocabulary Test",
      desc: "Test your knowledge of English word meanings.",
      icon: "book_2",
      id: "vocabulary",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
      hoverBorder: "group-hover:border-blue-400/50"
    },
    {
      title: "Phrasal Verb Test",
      desc: "Check your understanding of phrasal verbs.",
      icon: "link",
      id: "phrasal",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      borderColor: "border-orange-400/20",
      hoverBorder: "group-hover:border-orange-400/50"
    },
    {
      title: "Idioms Test",
      desc: "Assess your knowledge of idiomatic expressions.",
      icon: "extension",
      id: "idioms",
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      borderColor: "border-pink-400/20",
      hoverBorder: "group-hover:border-pink-400/50"
    },
    {
      title: "Grammar Test",
      desc: "Evaluate your mastery of sentence structure and rules.",
      icon: "menu_book",
      id: "grammar",
      color: "text-primary",
      bg: "bg-primary/10",
      borderColor: "border-primary/20",
      hoverBorder: "group-hover:border-primary/50"
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display pb-20 md:pb-24">
      <main className="flex-1 px-3 md:px-6 pt-6 md:pt-10 pb-6 md:pb-8 space-y-6 md:space-y-8 max-w-5xl mx-auto w-full">
        <div className="text-center mb-4 md:mb-6">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em] mb-2">Select Your Test</h1>
            <p className="text-gray-400 text-sm md:text-base lg:text-lg">Choose a specific language area to focus on.</p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {tests.map((test, index) => {
            const stats = getTestStats(test.id);
            return (
              <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="block group"
              >
                <Link to={`/test/${test.id}`} className="block">
                  <div className={cn(
                    "bg-surface-dark p-4 md:p-6 rounded-2xl border transition-all",
                    "group-hover:shadow-lg active:scale-[0.98] touch-manipulation",
                    test.borderColor,
                    test.hoverBorder
                  )}>
                    <div className="flex items-start space-x-3 md:space-x-4 mb-3 md:mb-4">
                      <div className={cn(test.bg, test.color, "p-2.5 md:p-3 rounded-xl shrink-0")}>
                        <Icon name={test.icon} className="text-xl md:text-2xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-base md:text-lg font-bold text-white">{test.title}</h2>
                        <p className="text-xs md:text-sm text-gray-400 mt-1 line-clamp-2">{test.desc}</p>
                      </div>
                      <div className={cn("text-gray-500 shrink-0 transition-colors", test.color.replace('text-', 'group-hover:text-'))}>
                        <Icon name="chevron_right" className="text-xl md:text-2xl" />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-surface-border">
                      <div className="flex items-center gap-2">
                        <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", test.bg, test.color)}>
                          {stats.availableQuestions} Available
                        </span>
                        {stats.attemptedCount > 0 && (
                          <span className="inline-flex items-center rounded-full bg-gray-500/10 px-2.5 py-1 text-xs font-medium text-gray-400">
                            {stats.attemptedCount} Done
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {stats.totalQuestions} total
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {stats.attemptedCount > 0 && (
                      <div className="mt-3 md:mt-4">
                        <div className="h-1.5 bg-surface-border rounded-full overflow-hidden">
                          <div
                            className={cn("h-full transition-all", test.bg.replace('/10', '/70'))}
                            style={{ width: `${stats.percentComplete}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Comprehensive Test */}
        <Link to="/test/comprehensive" className="block group mt-6 md:mt-8">
          <div className="bg-surface-dark p-4 md:p-6 rounded-2xl border border-primary/20 transition-all group-hover:border-primary/50 group-hover:shadow-lg active:scale-[0.98]">
            <div className="flex flex-col">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-primary/20 text-primary p-2.5 md:p-3 rounded-xl shrink-0">
                  <Icon name="school" className="text-xl md:text-2xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base md:text-lg font-bold text-white">Comprehensive English Test</h2>
                  <p className="text-xs md:text-sm text-gray-400 mt-1">A mixed-skill assessment covering grammar, vocabulary, and more.</p>
                </div>
                <div className="text-gray-500 group-hover:text-primary shrink-0">
                  <Icon name="chevron_right" className="text-xl md:text-2xl" />
                </div>
              </div>
              <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-surface-border flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between sm:items-center">
                <span className="text-xs text-gray-500">Includes all content types</span>
                <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary w-fit">
                  {MOCK_TEST_QUESTIONS.length} Questions
                </span>
              </div>
            </div>
          </div>
        </Link>
      </main>
    </div>
  );
}
