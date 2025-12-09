import * as React from 'react';
import { useMemo, useState } from 'react';
import {type  WordData } from '@/types/data';
import WordCard from '@/components/word-card';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlusIcon, SparklesIcon, Loader2Icon } from 'lucide-react';


// Assuming shadcn components are available
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


// Define the validation schema for manual word entry
const NewWordSchema = z.object({
    word: z.string().min(2, { message: "Word must be at least 2 characters." }),
    websterMeaning: z.string().min(10, { message: "Meaning must be detailed." }).or(z.literal('')).optional(),
    hindiMeaning: z.string().min(1, { message: "Hindi meaning is required." }).or(z.literal('')).optional(),
    sentence: z.string().min(10, { message: "Example sentence must be detailed." }).or(z.literal('')).optional(),
    level: z.enum(['B1', 'B2', 'C1', 'C2']),
    status: z.enum(['learned', 'revised', 'have to learn']),
}).transform(data => ({
    ...data,
    level: data.level || 'B2',
    status: data.status || 'have to learn',
}));

type NewWordFormData = z.infer<typeof NewWordSchema>;

interface TrackerPageProps {
    words: WordData[];
    handleStatusChange: (wordId: number, newStatus: WordData['status']) => void;
    handleGenerateContent: (wordId: number, word: string, meaning: string) => Promise<void>;
    handleAddNewWord: (newWordData: Partial<WordData>) => void; // New prop for adding words
    handleGenerateWord: () => Promise<void>; // New prop for AI word generation
}

// 1. Define TabButtonProps interface
interface TabButtonProps {
    name: 'New' | 'Revised' | 'Learned';
    count: number;
    activeTab: 'New' | 'Revised' | 'Learned';
    setActiveTab: React.Dispatch<React.SetStateAction<'New' | 'Revised' | 'Learned'>>;
}

// 2. Define the TabButton component
const TabButton: React.FC<TabButtonProps> = ({ name, count, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(name)}
        className={cn(
            "px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-lg",
            name === activeTab
            ? 'bg-white text-gray-900 shadow-md border-b-2 border-blue-500 dark:bg-gray-800 dark:text-white dark:border-blue-400' // Active state style
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-400' // Inactive state style
        )}
        data-state={name === activeTab ? 'active' : 'inactive'}
    >
      {name} ({count})
    </button>
);

const TrackerPage: React.FC<TrackerPageProps> = ({
    words,
    handleStatusChange,
    handleGenerateContent,
    handleAddNewWord,
    handleGenerateWord,
}) => {
    // State for the currently active tab/filter
    const [activeTab, setActiveTab] = useState<'New' | 'Revised' | 'Learned'>('New');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isGeneratingWord, setIsGeneratingWord] = useState(false);

    const form = useForm<NewWordFormData>({
        resolver: zodResolver(NewWordSchema),
        defaultValues: {
            word: "",
            websterMeaning: "",
            hindiMeaning: "",
            sentence: "",
            level: "B2" as const,
            status: "have to learn" as const,
        },
    });

    const onSubmit: SubmitHandler<NewWordFormData> = (data) => {
        handleAddNewWord({
            word: data.word,
            websterMeaning: data.websterMeaning || undefined,
            hindiMeaning: data.hindiMeaning || undefined,
            sentence: data.sentence || undefined,
            level: data.level,
            status: data.status,
        });
        setIsDialogOpen(false);
        form.reset();
    };

    const handleAIGenerateWord = async () => {
        setIsGeneratingWord(true);
        try {
            await handleGenerateWord();
            setIsDialogOpen(false); // Close dialog on success
        } catch (error) {
            // Error toast handled in App.tsx's handleGenerateWord
        } finally {
            setIsGeneratingWord(false);
        }
    };

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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white">Vocabulary Tracker</h1>
                <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2 transition-all duration-200">
                    <PlusIcon className="h-5 w-5" /> Add New Word
                </Button>
            </div>

            {/* Tabs for Filtering (Shadcn-style Tabs List) */}
            <div className="flex items-center space-x-1 rounded-xl bg-gray-100 dark:bg-gray-900/50 p-2 mb-8 shadow-inner">
                <TabButton name="New" count={newWords.length} activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton name="Revised" count={revisedWords.length} activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton name="Learned" count={learnedWords.length} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Word List */}
            <div className="pb-12">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">{activeTab} Words</h2>

                {activeWords.length === 0 ? (
                    <Card className="p-8 text-center border-dashed bg-white dark:bg-card/70">
                        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                            {activeTab === 'Learned' ? 'Great job! Time to add new words for the next milestone!' :
                             activeTab === 'Revised' ? 'All clear! Ready for some new challenges?' :
                             'Add your first word using the "Add New Word" button above!'}
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {activeWords.map(word => (
                            <WordCard
                                key={word.id}
                                wordData={word}
                                handleStatusChange={handleStatusChange}
                                handleGenerateContent={handleGenerateContent} // For generating mnemonic/sentence
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Add New Word Dialog (Modal) */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-center">
                            Add or Generate a Word
                        </DialogTitle>
                        <DialogDescription>
                            Enter a new word manually or let the AI suggest one.
                        </DialogDescription>
                    </DialogHeader>

                    {/* AI Generate Button */}
                    <Button
                        onClick={handleAIGenerateWord}
                        disabled={isGeneratingWord}
                        className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-200"
                    >
                        {isGeneratingWord ? (
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <SparklesIcon className="mr-2 h-4 w-4" />
                        )}
                        {isGeneratingWord ? 'AI Thinking...' : 'Generate New Word with AI'}
                    </Button>

                    <div className="relative flex justify-center text-xs uppercase">
                        <div className="bg-background px-2 text-muted-foreground">OR</div>
                    </div>

                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Manual Entry</h3>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="word"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>English Word*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Alacrity" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Word Level</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="B1">B1 (Intermediate)</SelectItem>
                                                <SelectItem value="B2">B2 (Upper Intermediate)</SelectItem>
                                                <SelectItem value="C1">C1 (Advanced)</SelectItem>
                                                <SelectItem value="C2">C2 (Proficient)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hindiMeaning"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Hindi Meaning</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., तत्परता (Tatparta)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="websterMeaning"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Webster Meaning</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="A formal definition..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="submit" disabled={isGeneratingWord}>
                                    Add Word to List
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default TrackerPage;
