import * as React from 'react';
import { useMemo, useState } from 'react';
import {type  WordData } from '@/types/data';
import WordCard from '@/components/word-card';
import { cn } from '@/lib/utils'; // Import cn utility to resolve potential scope issues

// Assuming shadcn components are available
import { Card } from '@/components/ui/card';

interface TrackerPageProps {
    words: WordData[];
    handleStatusChange: (wordId: number, newStatus: WordData['status']) => void;
}

// 1. Define TabButtonProps interface outside the main component
interface TabButtonProps {
    name: 'New' | 'Revised' | 'Learned';
    count: number;
    activeTab: 'New' | 'Revised' | 'Learned';
    setActiveTab: React.Dispatch<React.SetStateAction<'New' | 'Revised' | 'Learned'>>;
}

// 2. Define the TabButton component OUTSIDE the main component
const TabButton: React.FC<TabButtonProps> = ({ name, count, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(name)}
        className={cn(
            "px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md",
            name === activeTab
            ? 'bg-white text-gray-900 shadow-md border-b-2 border-blue-500' // Active state style
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100' // Inactive state style
        )}
        data-state={name === activeTab ? 'active' : 'inactive'}
    >
      {name} ({count})
    </button>
);

const TrackerPage: React.FC<TrackerPageProps> = ({ words, handleStatusChange }) => {
    // State for the currently active tab/filter
    const [activeTab, setActiveTab] = useState<'New' | 'Revised' | 'Learned'>('New');

    // Filtered Lists (Computed state for efficiency)
    const { newWords, revisedWords, learnedWords } = useMemo(() => {
        const newW = words.filter(w => w.status === 'have to learn');
        const revisedW = words.filter(w => w.status === 'revised');
        const learnedW = words.filter(w => w.status === 'learned');
        return {
            newWords: newW,
            revisedWords: revisedW,
            learnedWords: learnedW,
        };
    }, [words]);

    // Map tab keys to their corresponding word lists
    const tabContent: Record<typeof activeTab, WordData[]> = {
        New: newWords,
        Revised: revisedWords,
        Learned: learnedWords,
    };

    const activeWords = tabContent[activeTab] || [];

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <h1 className="text-4xl font-black text-gray-900 mb-6">Vocabulary Progress Tracker</h1>

            {/* Tabs for Filtering (Shadcn-style Tabs List) */}
            <div className="flex items-center space-x-1 rounded-md bg-gray-100 p-1 mb-6">
                <TabButton name="New" count={newWords.length} activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton name="Revised" count={revisedWords.length} activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton name="Learned" count={learnedWords.length} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Word List */}
            <div className="pb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{activeTab} Words</h2>

                {activeWords.length === 0 ? (
                    <Card className="p-8 text-center border-dashed bg-white/70">
                        <p className="text-lg font-medium text-gray-600">
                            {activeTab === 'Learned' ? 'Great job! You\'ve mastered all the words in this list!' :
                             activeTab === 'Revised' ? 'All clear! No words currently flagged for revision.' :
                             'You\'ve moved all your words to a different list. Try adding more!'}
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {activeWords.map(word => (
                            <WordCard key={word.id} wordData={word} handleStatusChange={handleStatusChange} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackerPage;
