import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useConvexAuth } from "convex/react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SimpleBarChart } from '@/components/ui/BarChart';
import { Icon } from '@/components/ui/MaterialIconHelper';
import { Skeleton } from '@/components/ui/skeleton';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { format } from 'date-fns';

// Stat Card Component
interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, color }) => (
    <Card className="bg-surface-dark border-surface-border p-4 md:p-5 border flex flex-col gap-3 md:gap-4 relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-4 opacity-10`}>
            <Icon name={icon} className={`text-5xl md:text-6xl text-[${color}]`} />
        </div>
        <div className="flex items-center gap-2 md:gap-3 text-gray-400">
            <Icon name={icon} className={`text-lg md:text-xl text-[${color}]`} />
            <span className="text-xs md:text-sm font-medium">{title}</span>
        </div>
        <div className="text-3xl md:text-4xl font-black text-white">{value}</div>
        <div className="text-xs text-gray-400">{description}</div>
    </Card>
);

export default function UserProfilePage() {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();

    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            navigate('/auth?mode=login');
        }
    }, [isAuthLoading, isAuthenticated, navigate]);

    // Use a conditional query based on authentication state
    const profileStats = useQuery(
        api.wordProgress.getUserProfileStats,
        isAuthenticated ? {} : "skip"
    );

    // Fetch recent test history (limit 5)
    const recentTests = useQuery(
        api.testAttempts.getTestHistory,
        isAuthenticated ? { limit: 5 } : "skip"
    );

    // Fetch all progress to show words needing review
    const allProgress = useQuery(
        api.wordProgress.getProgress,
        isAuthenticated ? { contentType: "word" } : "skip"
    );

    if (isAuthLoading || !isAuthenticated) {
        // Handle unauthenticated state (redirect or loading skeleton)
        return (
            <div className="flex h-screen items-center justify-center text-white">
                <Icon name="progress_activity" className="animate-spin mr-2" /> Loading Profile...
            </div>
        );
    }

    // Fallback if auth is ready but data isn't, or data fetch failed.
    const isLoading = !profileStats;
    const stats = profileStats || {
        name: "Loading...", email: "...", image: "",
        totalTestsCovered: 0, wordsKnown: 0, phrasalKnown: 0, idiomsKnown: 0,
        averageAccuracy: 0, totalQuestionsAttempted: 0, needsReviewCount: 0, nextWordNumber: 1,
        weeklyActivity: [], currentStreak: 0
    };

    // Words that need review (mastery 1-2)
    const wordsToReview = allProgress ? allProgress.filter(p => p.masteryLevel >= 1 && p.masteryLevel < 3).slice(0, 10) : [];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col p-3 md:p-8">
            <main className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 md:gap-8">
                {/* Page Heading */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em]">My Profile</h1>
                    <p className="text-gray-400 text-sm md:text-lg font-normal">Track your progress and customize your learning identity.</p>
                </div>

                {/* Profile Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                    {/* Left Column: User Identity (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
                        <Card className="bg-surface-dark border-surface-border p-6 md:p-8 flex flex-col items-center text-center shadow-glow border">
                            <div className="relative group cursor-pointer mb-4">
                                <Avatar className="w-24 h-24 md:w-32 lg:w-40 md:h-32 lg:h-40 border-4 border-primary shadow-lg shadow-primary/20">
                                    {isLoading ? (
                                        <Skeleton className="h-full w-full rounded-full" />
                                    ) : (
                                        <AvatarImage src={stats.image} alt={stats.name} />
                                    )}
                                    <AvatarFallback className="text-2xl md:text-3xl font-bold">{(stats.name || "?")[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <h2 className="text-white text-xl md:text-2xl font-bold mb-1">{stats.name}</h2>
                            <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6">{stats.email}</p>

                            <div className="w-full flex flex-col gap-2 md:gap-3">
                                <Button className="w-full h-10 md:h-12 flex items-center justify-center gap-2 rounded-full bg-surface-dark border border-surface-border text-white text-sm md:text-base font-bold hover:bg-surface-border">
                                    <Icon name="settings" className="text-base md:text-lg" />
                                    Account Settings
                                </Button>
                                <Button variant="outline" className="w-full h-10 md:h-12 flex items-center justify-center gap-2 rounded-full border-surface-border hover:bg-surface-border text-gray-400 hover:text-white text-sm md:text-base font-medium">
                                    <Icon name="share" className="text-base md:text-lg" />
                                    Share Profile
                                </Button>
                            </div>
                        </Card>

                        {/* Summary of Mastery */}
                        <Card className="bg-surface-dark border-surface-border p-4 md:p-6 border flex flex-col gap-4">
                            <CardTitle className="text-white text-base md:text-lg font-bold">Content Mastery</CardTitle>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <span className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                        {stats?.wordsKnown || 0}
                                        <span className="text-xs font-normal text-gray-400 self-end mb-1">words</span>
                                    </span>
                                    <span className="text-xs text-primary font-medium">Vocabulary</span>
                                </div>

                                {/* Streak Bit */}
                                <div className="flex items-center gap-1 bg-orange-500/10 px-3 py-1.5 md:py-1 rounded-full border border-orange-500/20 w-fit">
                                    <Icon name="local_fire_department" className="text-orange-500 text-lg md:text-xl animate-pulse" />
                                    <span className="text-orange-400 text-sm md:text-base font-bold">{stats?.currentStreak || 0} Day Streak</span>
                                </div>

                                <div className="grid grid-cols-2 gap-3 md:gap-4 w-full mt-2 md:mt-4 border-t border-white/5 pt-3 md:pt-4">
                                    <div className="flex justify-between items-center text-xs md:text-sm text-gray-300">
                                        <span>Phrasal Verbs</span>
                                        <span className="font-bold text-primary">{stats.phrasalKnown}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs md:text-sm text-gray-300">
                                        <span>Idioms</span>
                                        <span className="font-bold text-primary">{stats.idiomsKnown}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Stats & Charts (8 cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                            <StatCard
                                title="Total Tests"
                                value={stats.totalTestsCovered}
                                description="Completed test sessions"
                                icon="checklist"
                                color="#36e27b" // primary
                            />
                             <StatCard
                                title="Questions Attempted"
                                value={stats.totalQuestionsAttempted}
                                description="Across all test types"
                                icon="quiz"
                                color="#a0aec0" // gray/slate
                            />
                            <StatCard
                                title="Average Accuracy"
                                value={`${stats.averageAccuracy}%`}
                                description={`Next word to learn: ${stats.nextWordNumber}`}
                                icon="percent"
                                color="#60a5fa" // blue-400
                            />
                        </div>

                        {/* Weekly Activity Chart */}
                        <SimpleBarChart
                            title="Weekly Activity Score"
                            description="Based on engagement and test performance."
                            data={stats.weeklyActivity || []}
                        />

                        {/* Test History Summary */}
                        {recentTests && recentTests.length > 0 && (
                            <Card className="bg-surface-dark border-surface-border p-4 md:p-6 border flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white text-base md:text-lg font-bold flex items-center gap-2">
                                        <Icon name="history" className="text-primary" />
                                        Recent Tests
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => navigate('/test-history')}
                                        className="text-primary hover:text-primary/80 text-xs md:text-sm"
                                    >
                                        View All
                                        <Icon name="arrow_forward" className="ml-1" />
                                    </Button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {recentTests.slice(0, 5).map((test) => (
                                        <div
                                            key={test._id}
                                            className="flex items-center justify-between p-3 md:p-4 bg-black/20 rounded-xl hover:bg-black/30 transition-colors cursor-pointer"
                                            onClick={() => navigate('/test-history')}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 md:size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                                    <Icon name="quiz" className="text-primary text-lg md:text-xl" />
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm md:text-base font-bold capitalize">{test.testType}</p>
                                                    <p className="text-gray-400 text-xs">{format(new Date(test.date), 'MMM dd, yyyy')}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-xl md:text-2xl font-black ${test.score >= 80 ? 'text-green-400' : test.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                    {test.score}%
                                                </p>
                                                <p className="text-xs text-gray-500">{test.correctAnswers}/{test.totalQuestions}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Words to Review Section */}
                        {stats.needsReviewCount > 0 && (
                            <Card className="bg-surface-dark border-surface-border p-4 md:p-6 border flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white text-base md:text-lg font-bold flex items-center gap-2">
                                        <Icon name="sync" className="text-yellow-400" />
                                        Words to Review
                                    </CardTitle>
                                    <span className="text-yellow-400 font-bold text-sm md:text-base">{stats.needsReviewCount} words</span>
                                </div>
                                <p className="text-gray-400 text-xs md:text-sm">
                                    These words need more practice to master.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {wordsToReview.map((word) => (
                                        <div
                                            key={word._id}
                                            className="px-3 py-1.5 md:px-4 md:py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs md:text-sm text-yellow-200 font-medium"
                                        >
                                            {word.contentId}
                                        </div>
                                    ))}
                                    {stats.needsReviewCount > 10 && (
                                        <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-500/10 border border-gray-500/20 rounded-full text-xs md:text-sm text-gray-400 font-medium">
                                            +{stats.needsReviewCount - 10} more
                                        </div>
                                    )}
                                </div>
                                <Button
                                    onClick={() => navigate('/learn')}
                                    variant="outline"
                                    className="w-full rounded-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 text-sm md:text-base"
                                >
                                    <Icon name="play_arrow" className="mr-2" />
                                    Start Review Session
                                </Button>
                            </Card>
                        )}

                        {/* Next Learning Step */}
                        <Card className="bg-surface-dark border-surface-border p-4 md:p-6 border flex flex-col gap-4">
                            <CardTitle className="text-white text-base md:text-lg font-bold">Your Next Step</CardTitle>
                            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-background-dark/50 rounded-xl border border-surface-border'>
                                <p className='text-gray-300 text-sm md:text-base'>Start learning from <strong className="text-primary">Word {stats.nextWordNumber}</strong> in your list.</p>
                                <Button size="sm" onClick={() => navigate('/learn')} className="bg-primary hover:bg-primary/90 text-background-dark text-sm md:text-base shrink-0 w-full sm:w-auto">
                                    <Icon name="arrow_forward" className="mr-1" />
                                    Go to Word {stats.nextWordNumber}
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
