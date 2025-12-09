import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

interface HomePageProps {
    onStartTracking: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartTracking }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-8 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                Master Your Vocabulary
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Track your progress on new, revised, and learned words. Your entire learning journey is saved locally in your browser.
            </p>

            <div className="flex flex-col gap-4">
                <Button onClick={onStartTracking} size="lg" className="text-lg">
                    Start Tracking Now <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-gray-500">
                    *Data is stored securely in your browser's local storage.
                </p>
            </div>

            <div className="mt-16 w-full max-w-3xl border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">How it Works</h2>
                <ul className="text-left space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                        <span className="font-semibold text-blue-600 shrink-0">1. Learn:</span> Words start in the "Need to Learn" list.
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="font-semibold text-yellow-600 shrink-0">2. Review:</span> Mark words as "Learned & Reviewing" if you need extra practice.
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="font-semibold text-green-600 shrink-0">3. Master:</span> Mark them as "Learned" when you're confident.
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="font-semibold text-gray-900 shrink-0">4. Export:</span> Download your categorized lists anytime as JSON files.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
