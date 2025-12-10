import * as React from 'react';
import {type  WordData,type  LearningStatus } from '@/types/data';
import { cn } from '@/lib/utils';
import { CheckIcon, HelpCircleIcon, XIcon, EyeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, } from '@/components/ui/card';

interface WordCardProps {
  word: WordData;
  onUpdateStatus: (id: number, status: LearningStatus) => void;
}

export function WordCard({ word, onUpdateStatus }: WordCardProps) {
  const [isRevealed, setIsRevealed] = React.useState(false);

  // Reset state when the specific word instance changes
  React.useEffect(() => {
    setIsRevealed(false);
  }, [word.id]);

  return (
    <Card className="w-full max-w-md mx-auto bg-card border-border shadow-2xl overflow-hidden flex flex-col min-h-[400px]">

      {/* 1. Card Face (Click to Reveal) */}
      <div
        onClick={() => setIsRevealed(!isRevealed)}
        className="flex-1 flex flex-col items-center justify-center p-8 cursor-pointer relative group transition-colors hover:bg-accent/10"
      >
        <span className="absolute top-4 right-4 text-xs font-mono text-muted-foreground opacity-50 flex items-center gap-1">
          <EyeIcon className="h-3 w-3" /> Tap to reveal
        </span>

        {/* Word Display */}
        <h2 className="text-4xl font-black text-foreground mb-6 text-center tracking-tight drop-shadow-md">
          {word.word}
        </h2>

        {/* Meaning Display (Animated) */}
        <div className={cn(
          "transition-all duration-500 ease-in-out text-center overflow-hidden flex flex-col items-center",
          isRevealed ? "opacity-100 max-h-48 translate-y-0" : "opacity-0 max-h-0 translate-y-4"
        )}>
          <div className="w-12 h-1 bg-primary/30 rounded-full mb-4" />
          <p className="text-lg text-foreground/90 leading-relaxed font-medium">
            {word.meaning}
          </p>
          {word.sentence && (
            <div className="mt-4 p-3 bg-secondary/30 rounded-lg border-l-2 border-primary">
              <p className="text-sm text-muted-foreground italic">
                "{word.sentence}"
              </p>
            </div>
          )}
        </div>

        {/* Current Status Dot */}
        <div className={cn(
          "absolute top-4 left-4 w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]",
          word.status === 'known' ? 'bg-green-500 shadow-green-500/50' :
          word.status === 'review' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-red-500 shadow-red-500/50'
        )} />
      </div>

      {/* 2. Action Buttons */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-background/50 border-t border-border backdrop-blur-md">

        {/* Unknown Button */}
        <Button
          variant="outline"
          onClick={() => onUpdateStatus(word.id, 'unknown')}
          className="h-auto py-3 flex-col gap-1 border-red-900/30 hover:bg-red-950/30 hover:text-red-400 text-red-500/80"
        >
          <XIcon className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Unknown</span>
        </Button>

        {/* Review Button */}
        <Button
          variant="outline"
          onClick={() => onUpdateStatus(word.id, 'review')}
          className="h-auto py-3 flex-col gap-1 border-amber-900/30 hover:bg-amber-950/30 hover:text-amber-400 text-amber-500/80"
        >
          <HelpCircleIcon className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Review</span>
        </Button>

        {/* Known Button */}
        <Button
          variant="outline"
          onClick={() => onUpdateStatus(word.id, 'known')}
          className="h-auto py-3 flex-col gap-1 border-green-900/30 hover:bg-green-950/30 hover:text-green-400 text-green-500/80"
        >
          <CheckIcon className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Known</span>
        </Button>

      </div>
    </Card>
  );
}
