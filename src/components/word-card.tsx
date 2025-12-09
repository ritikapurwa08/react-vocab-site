import * as React from 'react';
import { cn } from '@/lib/utils';
import {type  WordData , STATUS_OPTIONS, type StatusOption } from '@/types/data';

// Assuming you have shadcn components in these paths:
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WordCardProps {
    wordData: WordData;
    handleStatusChange: (wordId: number, newStatus: WordData['status']) => void;
}

const WordCard: React.FC<WordCardProps> = ({ wordData, handleStatusChange }) => {
    const currentStatus: StatusOption | undefined = STATUS_OPTIONS.find(opt => opt.key === wordData.status);

    return (
      <Card className="mb-4 transition-all hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
            {wordData.word}
          </h2>
          <span className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            Level: {wordData.level}
          </span>
        </CardHeader>

        <CardContent className="space-y-4 text-gray-700">
          <div className="border-l-4 border-yellow-400 pl-3">
            <p className="text-sm font-semibold text-gray-800">Webster's Definition</p>
            <p>{wordData.websterMeaning}</p>
          </div>
          <div className="border-l-4 border-blue-400 pl-3">
            <p className="text-sm font-semibold text-gray-800">Hindi Meaning</p>
            <p>{wordData.hindiMeaning}</p>
          </div>
          <p className="italic text-gray-600 border-t border-gray-100 pt-3">
            <span className="font-medium text-gray-500">Sentence:</span> "{wordData.sentence}"
          </p>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm font-medium text-gray-600 whitespace-nowrap">
            Current Status: <span className={cn("font-bold", {
                'text-green-600': currentStatus?.key === 'learned',
                'text-yellow-600': currentStatus?.key === 'revised',
                'text-red-600': currentStatus?.key === 'have to learn',
            })}>
              {currentStatus?.label}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => (
              <Button
                key={option.key}
                onClick={() => handleStatusChange(wordData.id, option.key)}
                disabled={wordData.status === option.key}
                variant={option.variant === "warning" ? "secondary" : option.variant}
                size="sm"
              >
                Set to {option.label}
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    );
};

export default WordCard;
