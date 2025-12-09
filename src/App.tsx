import React, { useState, useEffect, useMemo } from 'react';

// --- Type Definitions ---

/**
 * Defines the structure for a single vocabulary word.
 * The 'status' field is strictly defined to prevent typos in status keys.
 */
interface WordData {
  id: number;
  word: string;
  websterMeaning: string;
  hindiMeaning: string;
  sentence: string;
  level: string;
  status: 'learned' | 'revised' | 'have to learn';
}

/**
 * Defines the structure for a status option button.
 */
interface StatusOption {
  key: WordData['status'];
  label: string;
  group: string;
  variant: 'success' | 'warning' | 'destructive';
}

// --- Utility Functions (Simulating shadcn/ui helpers) ---

// Simple utility function for conditional class joining (clsx/cn equivalent)
const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// --- Initial Data ---

// Key for localStorage
const LOCAL_STORAGE_KEY: string = 'vocabularyProgress';

// Default starter vocabulary list (Typed with WordData[])
const initialVocabulary: WordData[] = [
  { id: 1, word: "Ubiquitous", websterMeaning: "Existing or being everywhere at the same time; constantly encountered.", hindiMeaning: "सर्वव्यापी (Sarvavyaapi)", sentence: "Smartphones have become ubiquitous in modern society.", level: "C1", status: "have to learn" },
  { id: 2, word: "Ephemeral", websterMeaning: "Lasting for a very short time.", hindiMeaning: "क्षणभंगुर (Kshanbhangur)", sentence: "The beauty of a sunset is ephemeral.", level: "B2", status: "have to learn" },
  { id: 3, word: "Mellifluous", websterMeaning: "Having a smooth, flowing sound.", hindiMeaning: "मधुर (Madhur)", sentence: "The singer's mellifluous voice captivated the audience.", level: "C2", status: "have to learn" },
  { id: 4, word: "Serendipity", websterMeaning: "The occurrence and development of events by chance in a happy or beneficial way.", hindiMeaning: "संयोगवश सुखद खोज (Sanyogavash Sukhad Khoj)", sentence: "Finding the lost key was a stroke of serendipity.", level: "B1", status: "have to learn" },
  { id: 5, word: "Pernicious", websterMeaning: "Having a harmful effect, especially in a gradual or subtle way.", hindiMeaning: "हानिकारक (Haanikarak)", sentence: "The pernicious effects of social media can be hard to spot.", level: "C1", status: "have to learn" },
  { id: 6, word: "Alacrity", websterMeaning: "Brisk and cheerful readiness.", hindiMeaning: "तत्परता (Tatparta)", sentence: "She accepted the promotion with alacrity.", level: "B2", status: "have to learn" },
];

const STATUS_OPTIONS: StatusOption[] = [
  { key: 'learned', label: 'Learned', group: 'Learned', variant: 'success' },
  { key: 'revised', label: 'Learned & Reviewing', group: 'Revised', variant: 'warning' },
  { key: 'have to learn', label: 'Need to Learn', group: 'New', variant: 'destructive' },
];

// --- LocalStorage Logic ---

// Function to get initial data, prioritizing localStorage
const getInitialWords = (): WordData[] => {
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (localData) {
    try {
      // Return type is explicitly WordData[]
      return JSON.parse(localData) as WordData[];
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
      // Fallback to initial data if localStorage is corrupted
      return initialVocabulary;
    }
  }
  return initialVocabulary;
};

// --- Shadcn Style Components (with prop types) ---

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled, variant = 'default' }) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 py-1.5";

  const variantClasses = {
    default: "bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90",
    destructive: "bg-red-500 text-red-50 shadow-sm hover:bg-red-500/90",
    success: "bg-green-500 text-green-50 shadow-sm hover:bg-green-500/90",
    warning: "bg-yellow-500 text-yellow-50 shadow-sm hover:bg-yellow-500/90",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}>
    {children}
  </div>
);

const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
);

const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
);

const CardFooter: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("flex items-center p-6 pt-0 border-t border-gray-100 mt-4", className)}>
    {children}
  </div>
);

interface TabButtonProps {
    name: string;
    count: number;
    onClick: () => void;
    active: boolean;
}

const TabButton: React.FC<{ name: string; count: number; active: boolean; onClick: () => void }> = ({ name, count, active, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm rounded-md",
            active
            ? 'bg-white text-gray-900 shadow-md border-b-2 border-blue-500' // Active state style
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100' // Inactive state style
        )}
        data-state={active ? 'active' : 'inactive'}
    >
      {name} ({count})
    </button>
  );

interface WordCardProps {
    wordData: WordData;
    handleStatusChange: (wordId: number, newStatus: WordData['status']) => void;
}

const WordCard: React.FC<WordCardProps> = ({ wordData, handleStatusChange }) => {
    // Find the current status option using the defined types
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
                variant={option.variant}
              >
                Set to {option.label}
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    );
  };


// --- Main App Component ---

const App: React.FC = () => {
  // Initialize state by loading from localStorage, explicitly typed
  const [words, setWords] = useState<WordData[]>(getInitialWords);
  const [activeTab, setActiveTab] = useState<'New' | 'Revised' | 'Learned'>('New');

  // 1. Local Persistence Effect
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(words));
  }, [words]);

  // 2. Status Update Function (Updates local state only)
  // Arguments are strictly typed
  const handleStatusChange = (wordId: number, newStatus: WordData['status']) => {
    setWords(prevWords => prevWords.map(w =>
      w.id === wordId ? { ...w, status: newStatus } : w
    ));
  };

  // 3. Filtered Lists (Computed state for efficiency)
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


  // --- Render ---

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Vocabulary Progress Tracker</h1>
        <p className="text-sm text-gray-500 mb-6">
          Your progress is saved locally in your browser's storage.
        </p>

        {/* Tabs for Filtering (Shadcn-style Tabs List) */}
        <div className="flex items-center space-x-1 rounded-md bg-gray-100 p-1 mb-6">
          <TabButton name="New" count={newWords.length} active={activeTab === 'New'} onClick={() => setActiveTab('New')} />
          <TabButton name="Revised" count={revisedWords.length} active={activeTab === 'Revised'} onClick={() => setActiveTab('Revised')} />
          <TabButton name="Learned" count={learnedWords.length} active={activeTab === 'Learned'} onClick={() => setActiveTab('Learned')} />
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
    </div>
  );
};

export default App;
