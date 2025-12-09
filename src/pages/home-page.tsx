import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, BrainCircuitIcon, TrendingUpIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HomePageProps {
    onStartTracking: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartTracking }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-4 sm:p-8 text-center bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* Main Header with Gradient */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-in fade-in-0 duration-500">
                <span className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Vocab AI: Master Your Words
                </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl">
                Generate instant mnemonics and practical sentences for any word to lock it into your long-term memory.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col gap-4">
                <Button onClick={onStartTracking} size="lg" className="text-lg shadow-lg hover:shadow-xl transition-all">
                    Start Learning Now <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    *Your progress is securely saved in your browser.
                </p>
            </div>

            {/* Feature Cards */}
            <div className="mt-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1: AI Mnemonic Generation */}
                <Card className="p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl border-purple-300/50 dark:border-purple-700/50">
                    <CardContent className="p-0 flex flex-col items-start text-left">
                        <BrainCircuitIcon className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            AI Mnemonic Creator
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Let the Gemini model create witty, personal memory aids that make complex words instantly unforgettable.
                        </p>
                    </CardContent>
                </Card>

                {/* Feature 2: Progress Tracking */}
                <Card className="p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl border-blue-300/50 dark:border-blue-700/50">
                    <CardContent className="p-0 flex flex-col items-start text-left">
                        <TrendingUpIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Effortless Tracking
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Easily categorize words into 'New', 'Reviewing', and 'Learned' lists. Download your mastery portfolio anytime.
                        </p>
                    </CardContent>
                </Card>
            </div>

             {/* Footer Note */}
             <div className="mt-16 text-xs text-gray-400 dark:text-gray-600">
                Powered by Gemini.
            </div>
        </div>
    );
};

export default HomePage;
