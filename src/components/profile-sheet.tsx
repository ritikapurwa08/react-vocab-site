

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { type WordData } from '@/types/data';
import { TrophyIcon, FlameIcon, TargetIcon } from 'lucide-react';

interface ProfileSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  words: WordData[];
}

export function ProfileSheet({ isOpen, onOpenChange, words }: ProfileSheetProps) {
  // Calculate daily progress
  const today = new Date().toDateString();
  const wordsAddedToday = words.filter(w => new Date(w.dateAdded).toDateString() === today).length;
  const learnedCount = words.filter(w => w.status === 'unknown').length;
  const totalWords = words.length;
  const dailyGoal = 200;
  const progressPercentage = Math.min((wordsAddedToday / dailyGoal) * 100, 100);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-white dark:bg-gray-900 border-l dark:border-gray-800">
        <SheetHeader className="mb-8 text-left">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16 border-2 border-blue-500">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-2xl font-bold">Vocabulary Master</SheetTitle>
              <SheetDescription>Level: {totalWords > 500 ? 'Lexicon Legend' : 'Word Apprentice'}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-8">
          {/* Daily Goal Section */}
          <div className="bg-blue-50 dark:bg-blue-950/30 p-5 rounded-xl border border-blue-100 dark:border-blue-900">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <TargetIcon className="h-5 w-5" /> Daily Goal
              </h3>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-300">
                {wordsAddedToday} / {dailyGoal} words
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-blue-200 dark:bg-blue-900" />
            <p className="text-xs text-blue-500 mt-2">
              Add {Math.max(0, dailyGoal - wordsAddedToday)} more words to reach your goal today!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center justify-center text-center border dark:border-gray-700">
              <TrophyIcon className="h-8 w-8 text-yellow-500 mb-2" />
              <span className="text-2xl font-bold">{learnedCount}</span>
              <span className="text-xs text-muted-foreground">Words Learned</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex flex-col items-center justify-center text-center border dark:border-gray-700">
              <FlameIcon className="h-8 w-8 text-orange-500 mb-2" />
              <span className="text-2xl font-bold">{totalWords}</span>
              <span className="text-xs text-muted-foreground">Total Collection</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

