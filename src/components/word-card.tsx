import * as React from 'react';
import { cn } from '@/lib/utils';
import {type  WordData , STATUS_OPTIONS, type StatusOption } from '@/types/data';
import { SparklesIcon, Loader2Icon, BrainCircuitIcon } from 'lucide-react';

// Assuming you have shadcn components in these paths:
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface WordCardProps {
    wordData: WordData;
    handleStatusChange: (wordId: number, newStatus: WordData['status']) => void;
    handleGenerateContent: (wordId: number, word: string, meaning: string) => Promise<void>;
}

const WordCard: React.FC<WordCardProps> = ({ wordData, handleStatusChange, handleGenerateContent }) => {
    const currentStatus: StatusOption | undefined = STATUS_OPTIONS.find(opt => opt.key === wordData.status);
    const [isGenerating, setIsGenerating] = React.useState(false);

    const handleAIGeneration = async () => {
        setIsGenerating(true);
        try {
            await handleGenerateContent(wordData.id, wordData.word, wordData.websterMeaning);
            toast.success("Mnemonic and Sentence generated!", { description: `Content for '${wordData.word}' is ready.` });
        } catch (error) {
            console.error("AI Generation failed:", error);
            toast.error("Generation Failed", { description: "Could not connect to the AI model." });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
      <Card className="mb-6 transition-all hover:shadow-xl bg-white dark:bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {wordData.word}
          </h2>
          <Badge className="bg-blue-600 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 text-white font-semibold">
            Level: {wordData.level}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            {/* Webster's Definition */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">Webster's Definition</p>
                <p>{wordData.websterMeaning}</p>
            </div>

            {/* Hindi Meaning */}
            <div className="border-l-4 border-blue-500 pl-3">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Hindi Meaning</p>
                <p>{wordData.hindiMeaning}</p>
            </div>

            {/* Live Sentence / AI Generated Sentence */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">Live Sentence</p>
                <p className="italic text-gray-600 dark:text-gray-400">"{wordData.sentence}"</p>
            </div>

            {/* Mnemonic Display */}
            {wordData.mnemonic && (
                <>
                    <Separator className="bg-gray-100 dark:bg-gray-700" />
                    <div className="bg-purple-50 dark:bg-purple-900/40 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                        <p className="text-sm font-bold text-purple-800 dark:text-purple-300 mb-1 flex items-center">
                            <BrainCircuitIcon className="h-4 w-4 mr-2" /> AI Mnemonic
                        </p>
                        <p className="text-purple-700 dark:text-purple-200">{wordData.mnemonic}</p>
                    </div>
                </>
            )}

            {/* AI Generate Button */}
            {!wordData.mnemonic && (
                <div className="flex justify-center pt-3">
                    <Button
                        onClick={handleAIGeneration}
                        variant="default"
                        size="sm"
                        disabled={isGenerating}
                        className="bg-purple-500 hover:bg-purple-600 text-white transition-all duration-200 shadow-md"
                    >
                        {isGenerating ? (
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <SparklesIcon className="mr-2 h-4 w-4" />
                        )}
                        {isGenerating ? 'Generating...' : 'Generate Mnemonic & Sentence'}
                    </Button>
                </div>
            )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t pt-4 border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Current Status: <span className={cn("font-bold", {
                'text-green-600 dark:text-green-400': currentStatus?.key === 'learned',
                'text-yellow-600 dark:text-yellow-400': currentStatus?.key === 'revised',
                'text-red-600 dark:text-red-400': currentStatus?.key === 'have to learn',
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
