import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMutation, useQuery, useConvexAuth } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { MOCK_TEST_QUESTIONS } from '@/data/vocabulary';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Icon } from '@/components/ui/MaterialIconHelper';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function TestPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();

  // Mutations & Queries
  const saveTestResult = useMutation(api.wordProgress.saveTestResult);
  const saveQuestionAttempt = useMutation(api.testAttempts.saveQuestionAttempt);
  const attemptedQuestionIds = useQuery(
    api.testAttempts.getAttemptedQuestions,
    testId ? { testType: testId as "phrasal" | "idiom" | "grammar" | "vocabulary" } : "skip"
  );

  // Generate unique test session ID on mount
  const [testSessionId] = useState(() => crypto.randomUUID());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [showUnattemptedOnly, setShowUnattemptedOnly] = useState(true); // Toggle for filtering

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  // Filter questions based on testId and attempt status
  const { availableQuestions, attemptedCount } = useMemo(() => {
    if (!testId) return { availableQuestions: [], attemptedCount: 0 };

    let questions = testId === 'comprehensive'
      ? MOCK_TEST_QUESTIONS
      : MOCK_TEST_QUESTIONS.filter(q => q.testType === testId);

    const attemptedSet = new Set(attemptedQuestionIds || []);
    const attemptedCount = questions.filter(q => attemptedSet.has(q.id)).length;

    // Filter to unattempted only if toggle is on
    if (showUnattemptedOnly && attemptedQuestionIds) {
      questions = questions.filter(q => !attemptedSet.has(q.id));
    }

    return { availableQuestions: questions, attemptedCount };
  }, [testId, attemptedQuestionIds, showUnattemptedOnly]);

  if (isAuthLoading) return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;

  const currentQuestion = availableQuestions[currentQuestionIndex];
  const totalQuestions = availableQuestions.length;
  const progressValue = totalQuestions > 0 ? Math.round((currentQuestionIndex / totalQuestions) * 100) : 0;
  const selectedAnswer = currentQuestion ? userAnswers[currentQuestion.id] || '' : '';

  const handleOptionSelect = (value: string) => {
    if (!showResult && currentQuestion) {
      setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion) {
      toast.warning("Please select an answer first.");
      return;
    }

    // Save individual question attempt
    try {
      await saveQuestionAttempt({
        questionId: currentQuestion.id,
        testType: testId as any,
        selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        testSessionId,
      });
    } catch (error) {
      console.error("Failed to save attempt:", error);
    }

    setShowResult(true);
  };

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowResult(false);
    } else {
      // Test finished - calculate score and save session
      const correctAnswers = availableQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;

      try {
        await saveTestResult({
          testType: testId as "phrasal" | "idiom" | "grammar" | "vocabulary",
          totalQuestions,
          correctAnswers,
          testSessionId,
        });
        toast.success("Test Completed! Results saved.");
        navigate('/profile', { state: { score: correctAnswers, total: totalQuestions, testType: testId } });
      } catch (error) {
        console.error("Failed to save test result:", error);
        toast.error("Test finished but failed to save results.");
        navigate('/profile');
      }
    }
  };

  if (!testId || totalQuestions === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background-dark text-white gap-4 p-4">
        <Icon name="quiz" className="text-6xl text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          {attemptedCount > 0 ? 'All Questions Attempted!' : 'Test Not Found'}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 text-center max-w-md">
          {attemptedCount > 0
            ? `You've completed all ${attemptedCount} questions for ${testId}. Great work!`
            : `No questions available for test type: ${testId}.`
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button onClick={() => navigate('/tests')} variant="outline">
            <Icon name="arrow_back" className="mr-2" />
            Select Different Test
          </Button>
          {attemptedCount > 0 && (
            <Button onClick={() => setShowUnattemptedOnly(false)} variant="glow">
              <Icon name="refresh" className="mr-2" />
              Practice All Questions
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-start w-full px-3 md:px-6 lg:px-40 py-4 md:py-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-primary/5 to-transparent pointer-events-none -z-10"></div>

        <div className="w-full max-w-[960px] flex flex-col gap-6 md:gap-8">
          {/* Progress Header */}
          <div className="flex flex-col gap-3">
            <div className="flex items-end justify-between px-2">
              <div className="flex flex-col">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-1">
                  {testId} • {showUnattemptedOnly ? 'New Questions' : 'All Questions'}
                </span>
                <p className="text-white text-lg md:text-xl font-bold">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </p>
                {attemptedCount > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    {attemptedCount} questions already attempted
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 bg-surface-dark px-3 py-1 rounded-full border border-surface-border">
                <Icon name="check_circle" className="text-primary text-sm" />
                <span className="text-white text-xs md:text-sm font-mono">
                  {Object.keys(userAnswers).length}/{totalQuestions}
                </span>
              </div>
            </div>
            <Progress value={progressValue} className="h-2 rounded-full" indicatorClassName="shadow-[0_0_10px_#36e27b]" />
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion.id}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="glass-panel p-6 md:p-10 rounded-4xl shadow-2xl relative overflow-hidden bg-surface-dark/60 backdrop-blur-lg border border-surface-border"
          >
            <div className="flex flex-col gap-6 md:gap-8 relative z-10">
              <div className="space-y-4">
                <h1 className="text-white text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  {currentQuestion.questionText.includes('**') ? (
                    <span dangerouslySetInnerHTML={{ __html: currentQuestion.questionText.replace(/\*\*(.*?)\*\*/g, '<span class="text-primary underline decoration-2 underline-offset-4">$1</span>') }} />
                  ) : (
                    currentQuestion.questionText
                  )}
                </h1>
                {currentQuestion.contextWord && (
                  <p className="text-gray-400 text-sm md:text-lg">Context: {currentQuestion.contextWord}</p>
                )}
              </div>

              {/* Options */}
              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleOptionSelect}
                className="flex flex-col gap-3 md:gap-4 mt-4"
              >
                {currentQuestion.options.map((option, idx) => (
                  <Label
                    key={idx}
                    htmlFor={option}
                    className={cn(
                      'relative flex cursor-pointer items-center justify-between p-4 md:p-6 rounded-2xl md:rounded-full border-2 transition-all duration-200 group hover:border-white/50',
                      selectedAnswer === option
                        ? 'border-primary bg-surface-dark shadow-[0_0_20px_rgba(54,226,123,0.1)]'
                        : 'border-white/20 bg-transparent',
                      showResult && option === currentQuestion.correctAnswer && 'border-green-500 bg-green-500/10',
                      showResult && selectedAnswer === option && selectedAnswer !== currentQuestion.correctAnswer && 'border-red-500 bg-red-500/10'
                    )}
                  >
                    <span className={cn(
                      "text-base md:text-lg font-bold w-6 md:w-8 text-center shrink-0",
                      selectedAnswer === option ? 'text-primary' : 'text-gray-600 group-hover:text-gray-400'
                    )}>
                      {String.fromCharCode(65 + idx)}
                    </span>

                    <span className="text-white text-base md:text-lg lg:text-xl font-bold text-center flex-1 px-3 md:px-4">
                      {option}
                    </span>

                    <div className="w-6 md:w-8 flex justify-end shrink-0">
                      <div className={cn(
                        "size-5 md:size-6 rounded-full border-2 flex items-center justify-center transition-all",
                        selectedAnswer === option ? "border-primary" : "border-gray-500 group-hover:border-white"
                      )}>
                        {selectedAnswer === option && (
                          <div className="size-2.5 md:size-3 rounded-full bg-primary shadow-[0_0_10px_#36e27b]" />
                        )}
                      </div>
                    </div>

                    <RadioGroupItem
                      value={option}
                      id={option}
                      className='sr-only'
                      disabled={showResult}
                    />
                  </Label>
                ))}
              </RadioGroup>

              <div className="flex flex-col md:flex-row items-center justify-between mt-6 md:mt-10 pt-6 md:pt-8 border-t border-surface-border gap-4">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white hidden md:flex"
                  onClick={() => navigate('/tests')}
                >
                  <Icon name="arrow_back" className="mr-2" />
                  Exit Test
                </Button>
                <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                  <Button
                    variant="outline"
                    className="flex-1 md:flex-none rounded-full border-surface-border hover:border-white px-6 md:px-8 transition-colors"
                    disabled={showResult}
                    onClick={handleNextQuestion}
                  >
                    Skip
                  </Button>
                  <Button
                    variant="glow"
                    size="xl"
                    className="flex-[1.5] md:flex-none px-8 md:px-10 text-sm md:text-base"
                    disabled={!selectedAnswer || showResult}
                    onClick={handleSubmitAnswer}
                  >
                    Submit Answer
                  </Button>
                  {showResult && (
                    <Button
                      size="lg"
                      className="flex-1 md:flex-none rounded-full font-bold px-8 md:px-10 bg-blue-500 hover:bg-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all text-sm md:text-base"
                      onClick={handleNextQuestion}
                    >
                      {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
