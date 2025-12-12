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

// Stat Card Component
interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: string;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, color }) => (
    <Card className="bg-surface-dark border-surface-border p-5 border flex flex-col gap-4 relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-4 opacity-10`}>
            <Icon name={icon} className={`text-6xl text-[${color}]`} />
        </div>
        <div className="flex items-center gap-3 text-gray-400">
            <Icon name={icon} className={`text-[${color}]`} />
            <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="text-4xl font-black text-white">{value}</div>
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
        weeklyActivity: []
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col p-4 md:p-8">
            <main className="w-full max-w-[1200px] mx-auto flex flex-col gap-8">
                {/* Page Heading */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">My Profile</h1>
                    <p className="text-gray-400 text-base md:text-lg font-normal">Track your progress and customize your learning identity.</p>
                </div>

                {/* Profile Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: User Identity (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Card className="bg-surface-dark border-surface-border p-6 md:p-8 flex flex-col items-center text-center shadow-glow border">
                            <div className="relative group cursor-pointer mb-4">
                                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary shadow-lg shadow-primary/20">
                                    {isLoading ? (
                                        <Skeleton className="h-full w-full rounded-full" />
                                    ) : (
                                        <AvatarImage src={stats.image} alt={stats.name} />
                                    )}
                                    <AvatarFallback className="text-3xl font-bold">{(stats.name || "?")[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <h2 className="text-white text-2xl font-bold mb-1">{stats.name}</h2>
                            <p className="text-gray-400 text-sm mb-6">{stats.email}</p>

                            <div className="w-full flex flex-col gap-3">
                                <Button className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-surface-dark border border-surface-border text-white font-bold hover:bg-surface-border">
                                    <Icon name="settings" className="text-lg" />
                                    Account Settings
                                </Button>
                                <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2 rounded-full border-surface-border hover:bg-surface-border text-gray-400 hover:text-white font-medium">
                                    <Icon name="share" className="text-lg" />
                                    Share Profile
                                </Button>
                            </div>
                        </Card>

                        {/* Summary of Mastery */}
                        <Card className="bg-surface-dark border-surface-border p-6 border flex flex-col gap-4">
                            <CardTitle className="text-white text-lg font-bold">Content Mastery</CardTitle>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span>Vocabulary Words</span>
                                    <span className="font-bold text-primary">{stats.wordsKnown}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span>Phrasal Verbs</span>
                                    <span className="font-bold text-primary">{stats.phrasalKnown}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span>Idioms</span>
                                    <span className="font-bold text-primary">{stats.idiomsKnown}</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Stats & Charts (8 cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

                        {/* Next Learning Step */}
                        <Card className="bg-surface-dark border-surface-border p-6 border flex flex-col gap-4">
                            <CardTitle className="text-white text-lg font-bold">Your Next Step</CardTitle>
                            <div className='flex items-center justify-between p-4 bg-background-dark/50 rounded-xl border border-surface-border'>
                                <p className='text-gray-300 text-sm'>Start learning from **Word {stats.nextWordNumber}** in your list.</p>
                                <Button size="sm" onClick={() => navigate('/learn')} className="bg-primary hover:bg-primary/90 text-background-dark">
                                    <Icon name="arrow_forward" />
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
