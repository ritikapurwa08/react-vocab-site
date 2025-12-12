import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMutation, useConvexAuth } from 'convex/react';
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
  const saveTestResult = useMutation(api.wordProgress.saveTestResult);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false); // To show correct/incorrect after submission

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthLoading, isAuthenticated, navigate]);




  // Filter questions based on the testId parameter
  const testQuestions = useMemo(() => {
    if (testId === 'comprehensive') return MOCK_TEST_QUESTIONS;
    return MOCK_TEST_QUESTIONS.filter(q => q.testType === testId);
  }, [testId]);

  if (isAuthLoading) return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;

  const currentQuestion = testQuestions[currentQuestionIndex];
  const totalQuestions = testQuestions.length;
  const progressValue = Math.round((currentQuestionIndex / totalQuestions) * 100);
  const selectedAnswer = userAnswers[currentQuestion?.id] || '';

  const handleOptionSelect = (value: string) => {
    if (!showResult) {
      setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      toast.warning("Please select an answer first.");
      return;
    }

    // Check answer and show result
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowResult(false);
      // Automatically move to next word and forget the selection for the next question
    } else {
      // Test finished - calculate score and navigate to results/profile
      const correctAnswers = testQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;

      saveTestResult({
        testType: testId as "phrasal" | "idiom" | "grammar" | "vocabulary",
        totalQuestions,
        correctAnswers,
      }).then(() => {
        toast.success("Test Completed! Results saved.");
        navigate('/profile', { state: { score: correctAnswers, total: totalQuestions, testType: testId } });
      }).catch(e => {
        console.error("Failed to save test result:", e);
        toast.error("Test finished but failed to save results.");
        navigate('/profile');
      });
    }
  };

  if (!testId || testQuestions.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background-dark text-white gap-4">
        <h1 className="text-4xl font-bold text-red-500">Test Not Found</h1>
        <p className="text-xl text-gray-400">No questions available for test type: {testId}.</p>
        <Button onClick={() => navigate('/tests')}>Select a Different Test</Button>
      </div>
    );
  }



  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      {/* Header - Simplified to rely on global Navbar */}

      <main className="flex-1 flex flex-col items-center justify-start w-full px-4 md:px-6 lg:px-40 py-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10"></div>

        <div className="w-full max-w-[960px] flex flex-col gap-8">
          {/* Progress */}
          <div className="flex flex-col gap-3">
            <div className="flex items-end justify-between px-2">
              <div className="flex flex-col">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-1">Topic: {testId}</span>
                <p className="text-white text-xl font-bold">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
              </div>
              <div className="flex items-center gap-2 bg-surface-dark px-3 py-1 rounded-full border border-surface-border">
                <Icon name="timer" className="text-primary text-sm" />
                <span className="text-white text-sm font-mono">04:12 (Mock)</span>
              </div>
            </div>
            <Progress value={progressValue} className="h-2 rounded-full" indicatorClassName="shadow-[0_0_10px_#36e27b]" />
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion.id} // Key ensures motion remounts on question change
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="glass-panel p-6 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden bg-surface-dark/60 backdrop-blur-lg border border-surface-border"
          >
            <div className="flex flex-col gap-8 relative z-10">
              <div className="space-y-4">
                <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                  {currentQuestion.questionText.includes('**') ? (
                    <span dangerouslySetInnerHTML={{ __html: currentQuestion.questionText.replace(/\*\*(.*?)\*\*/g, '<span class="text-primary underline decoration-2 underline-offset-4">$1</span>') }} />
                  ) : (
                    currentQuestion.questionText
                  )}
                </h1>
                {currentQuestion.contextWord && (
                    <p className="text-gray-400 text-lg">Context: This question tests {currentQuestion.contextWord}</p>
                )}
              </div>

              {/* Options */}
              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleOptionSelect}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
              >
                {currentQuestion.options.map((option, idx) => (
                  <Label
                    key={idx}
                    htmlFor={option}
                    className={cn(
                      'relative flex cursor-pointer items-center justify-between p-6 rounded-full border-2 transition-all duration-200 group hover:border-white/50',
                      selectedAnswer === option
                        ? 'border-primary bg-surface-dark shadow-[0_0_20px_rgba(54,226,123,0.1)]' // Selected state (Green border)
                        : 'border-white/20 bg-transparent', // Default state (White outline)
                      showResult && option === currentQuestion.correctAnswer && 'border-green-500 bg-green-500/10',
                      showResult && selectedAnswer === option && selectedAnswer !== currentQuestion.correctAnswer && 'border-red-500 bg-red-500/10'
                    )}
                  >
                    {/* Letter Label (A, B, C...) - Absolute Left or just flex item */}
                    <span className={cn(
                        "text-lg font-bold w-8 text-center",
                        selectedAnswer === option ? 'text-primary' : 'text-gray-600 group-hover:text-gray-400'
                    )}>
                        {String.fromCharCode(65 + idx)}
                    </span>

                    {/* Option Text - Centered */}
                    <span className="text-white text-lg md:text-xl font-bold text-center flex-1 px-4">
                        {option}
                    </span>

                    {/* Radio Circle - Right */}
                    <div className="w-8 flex justify-end">
                         <div className={cn(
                             "size-6 rounded-full border-2 flex items-center justify-center transition-all",
                             selectedAnswer === option ? "border-primary" : "border-gray-500 group-hover:border-white"
                         )}>
                             {selectedAnswer === option && (
                                 <div className="size-3 rounded-full bg-primary shadow-[0_0_10px_#36e27b]" />
                             )}
                         </div>
                    </div>

                    {/* Hidden actual radio input for accessibility */}
                    <RadioGroupItem
                      value={option}
                      id={option}
                      className='sr-only'
                      disabled={showResult}
                    />
                  </Label>
                ))}
              </RadioGroup>

              <div className="flex flex-col md:flex-row items-center justify-between mt-10 pt-8 border-t border-surface-border gap-4">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  <Icon name="flag" />
                  Report Issue
                </Button>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Button variant="outline" className="hidden md:flex rounded-full border-surface-border hover:border-white px-8 transition-colors" disabled={showResult} onClick={() => handleNextQuestion()}>
                    Skip
                  </Button>
                  <Button
                    variant="glow"
                    size="xl"
                    className="flex-1 md:flex-none px-10"
                    disabled={!selectedAnswer || showResult}
                    onClick={handleSubmitAnswer}
                  >
                    Submit Answer
                  </Button>
                  {showResult && (
                    <Button
                        size="lg"
                        className="flex-1 md:flex-none rounded-full font-bold px-10 bg-blue-500 hover:bg-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all"
                        onClick={handleNextQuestion}
                    >
                        {currentQuestionIndex === totalQuestions - 1 ? 'Finish Test' : 'Next Question'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section for next challenges - remove this complexity for now to simplify UI */}
        </div>
      </main>
    </div>
  );
}
