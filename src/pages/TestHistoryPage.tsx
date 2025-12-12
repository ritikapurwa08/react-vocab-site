import { useState } from 'react';
import { useQuery, useConvexAuth } from 'convex/react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/MaterialIconHelper';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function TestHistoryPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const testHistory = useQuery(api.testAttempts.getTestHistory, { limit: 50 });
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <Icon name="progress_activity" className="animate-spin mr-2" />
        Loading Test History...
      </div>
    );
  }

  const getTestTypeIcon = (testType: string) => {
    switch (testType) {
      case 'vocabulary': return 'abc';
      case 'grammar': return 'menu_book';
      case 'phrasal': return 'chat';
      case 'idiom': return 'lightbulb';
      default: return 'quiz';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <main className="flex-1 w-full px-4 md:px-8 py-6 md:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
              Test History
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-normal mt-2">
              Review your past test performance and track progress
            </p>
          </div>
          <Button onClick={() => navigate('/tests')} variant="outline">
            <Icon name="add" className="mr-2" />
            Take New Test
          </Button>
        </div>

        {/* Stats Summary */}
        {testHistory && testHistory.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="bg-surface-dark border-surface-border p-4 md:p-6 border">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="quiz" className="text-primary" />
                <span className="text-white text-2xl md:text-3xl font-bold">
                  {testHistory.length}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-400">Total Tests Taken</p>
            </Card>

            <Card className="bg-surface-dark border-surface-border p-4 md:p-6 border">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="trending_up" className="text-blue-400" />
                <span className="text-white text-2xl md:text-3xl font-bold">
                  {Math.round(testHistory.reduce((sum, t) => sum + t.score, 0) / testHistory.length)}%
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-400">Average Score</p>
            </Card>

            <Card className="bg-surface-dark border-surface-border p-4 md:p-6 border">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="workspace_premium" className="text-yellow-400" />
                <span className="text-white text-2xl md:text-3xl font-bold">
                  {Math.max(...testHistory.map(t => t.score))}%
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-400">Best Score</p>
            </Card>
          </div>
        )}

        {/* Test History List */}
        {!testHistory || testHistory.length === 0 ? (
          <Card className="bg-surface-dark border-surface-border p-12 border flex flex-col items-center justify-center text-center">
            <Icon name="history" className="text-6xl text-gray-600 mb-4" />
            <h2 className="text-white text-2xl font-bold mb-2">No Test History Yet</h2>
            <p className="text-gray-400 mb-6">Take your first test to start tracking your progress!</p>
            <Button onClick={() => navigate('/tests')} variant="glow">
              <Icon name="play_arrow" className="mr-2" />
              Start a Test
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {testHistory.map((test, index) => (
              <motion.div
                key={test._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-surface-dark border-surface-border border hover:border-primary/30 transition-all cursor-pointer">
                  <div
                    className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    onClick={() => setExpandedSession(expandedSession === test._id ? null : test._id)}
                  >
                    {/* Left: Test Info */}
                    <div className="flex items-start md:items-center gap-4 flex-1">
                      <div className="flex items-center justify-center size-12 md:size-14 rounded-2xl bg-primary/10 shrink-0">
                        <Icon name={getTestTypeIcon(test.testType)} className="text-2xl md:text-3xl text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white text-lg md:text-xl font-bold capitalize">
                            {test.testType} Test
                          </h3>
                          {test.score >= 80 && (
                            <Icon name="verified" className="text-primary text-lg" />
                          )}
                        </div>
                        <p className="text-gray-400 text-xs md:text-sm">
                          {format(new Date(test.date), 'MMM dd, yyyy • hh:mm a')}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {test.correctAnswers}/{test.totalQuestions} questions correct
                        </p>
                      </div>
                    </div>

                    {/* Right: Score Badge */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-3xl md:text-4xl font-black ${getScoreColor(test.score)}`}>
                          {test.score}%
                        </div>
                        {test.score >= 80 && <p className="text-xs text-green-400 font-bold">Excellent!</p>}
                        {test.score >= 60 && test.score < 80 && <p className="text-xs text-yellow-400 font-bold">Good</p>}
                        {test.score < 60 && <p className="text-xs text-red-400 font-bold">Needs Practice</p>}
                      </div>
                      <Icon
                        name={expandedSession === test._id ? "expand_less" : "expand_more"}
                        className="text-gray-400 text-2xl"
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedSession === test._id && test.testSessionId && (
                    <SessionDetails sessionId={test.testSessionId} />
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Component to show detailed session results
function SessionDetails({ sessionId }: { sessionId: string }) {
  const sessionDetails = useQuery(api.testAttempts.getTestSessionDetails, { testSessionId: sessionId });

  if (!sessionDetails || !sessionDetails.attempts) {
    return (
      <div className="border-t border-surface-border p-6 flex items-center justify-center">
        <Icon name="progress_activity" className="animate-spin text-primary mr-2" />
        <span className="text-gray-400">Loading details...</span>
      </div>
    );
  }

  return (
    <div className="border-t border-surface-border p-4 md:p-6 bg-black/20">
      <h4 className="text-white font-bold mb-4 flex items-center gap-2">
        <Icon name="list" className="text-primary" />
        Question Breakdown ({sessionDetails.attempts.length} questions)
      </h4>
      <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
        {sessionDetails.attempts.map((attempt, idx) => (
          <div
            key={idx}
            className={`p-3 md:p-4 rounded-xl border ${
              attempt.isCorrect
                ? 'bg-green-500/5 border-green-500/20'
                : 'bg-red-500/5 border-red-500/20'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-white text-sm md:text-base font-medium mb-1">
                  Question {idx + 1}
                </p>
                <p className="text-xs md:text-sm text-gray-400">
                  Your answer: <span className="text-white font-mono">{attempt.selectedAnswer}</span>
                </p>
              </div>
              <div className="shrink-0">
                {attempt.isCorrect ? (
                  <div className="flex items-center gap-1 text-green-400">
                    <Icon name="check_circle" className="text-lg" />
                    <span className="text-xs font-bold">Correct</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-400">
                    <Icon name="cancel" className="text-lg" />
                    <span className="text-xs font-bold">Wrong</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
