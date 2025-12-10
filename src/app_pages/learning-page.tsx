import { useState, createRef } from 'react';
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { toast } from "sonner"; // Assuming you have sonner set up, or remove if not

import initialData from '@/data/vocabulary.json';
import { type WordData } from '@/types/data';
import { Icon } from '@/components/material-icon-helper';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

export default function WordLearning() {
  // Initialize words with a default 'step' if missing in JSON
  const [words, setWords] = useState<WordData[]>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (initialData as any[]).map(w => ({ ...w, step: w.step || 0 }))
  );

  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  // We use a Map to store refs for each item ID.
  // Using useState(() => new Map()) ensures the Map is created once and stable.
  // We avoid useRef here because accessing ref.current during render triggers warnings in newer React versions.
  const [nodeRefs] = useState(() => new Map<number, React.RefObject<HTMLDivElement | null>>());

  const handleAction = (id: number, action: 'known' | 'unknown' | 'revisit') => {
    // Find the word index
    const wordIndex = words.findIndex(w => w.id === id);
    if (wordIndex === -1) return;

    const currentWord = words[wordIndex];
    const newWords = [...words];

    if (action === 'known') {
      // Remove from list, mark as known
      setKnownCount(prev => prev + 1);
      newWords.splice(wordIndex, 1);
      toast.success(`Marked "${currentWord.word}" as Known`);
    }
    else if (action === 'unknown') {
      // Remove from list, mark as unknown (maybe add to a review pile later)
      setUnknownCount(prev => prev + 1);
      newWords.splice(wordIndex, 1);
      toast.info(`Marked "${currentWord.word}" as Unknown`);
    }
    else if (action === 'revisit') {
      // Logic: Move 20 steps down
      // Remove from current position
      const [removed] = newWords.splice(wordIndex, 1);

      // Calculate new position (current index + 20, or end of list)
      // Since we just removed it, the 'current index' in the modified array effectively shifts.
      // We want it 20 spots *after* where it was.
      let newIndex = wordIndex + 20;
      if (newIndex > newWords.length) {
        newIndex = newWords.length;
      }

      // Update step/status
      removed.status = 'review';
      removed.step = (removed.step || 0) + 1; // Increment step count

      // Insert at new position
      newWords.splice(newIndex, 0, removed);

      toast.warning(`Revisiting "${currentWord.word}" later`);
    }

    setWords(newWords);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200">

      {/* Header */}
      <div className="sticky top-0 z-20 flex flex-col gap-2 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 border-b border-border shadow-sm">
        <div className="flex items-center h-12 justify-between">
          <Link to="/" className="flex size-12 shrink-0 items-center justify-start hover:text-primary transition-colors">
            <Icon name="arrow_back" />
          </Link>
          <div className="flex items-center justify-center grow">
            <p className="text-lg font-bold leading-tight">Word Learning</p>
          </div>
          <div className="flex flex-col items-end justify-center text-xs font-medium text-muted-foreground">
            <span className="text-primary">{knownCount} Known</span>
            <span className="text-destructive">{unknownCount} Unknown</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-background-light dark:bg-background-dark sticky top-[73px] z-10">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon name="search" />
          </span>
          <Input
            className="pl-10 h-12 rounded-xl bg-card border-none shadow-sm focus-visible:ring-primary/50"
            placeholder="Search for a word..."
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 bg-background-light dark:bg-background-dark sticky top-[133px] z-10 pb-2">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max space-x-2 pb-2">
            <Badge variant="default" className="px-4 py-1.5 text-sm rounded-full cursor-pointer hover:bg-primary/90">Synonyms</Badge>
            <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full cursor-pointer">Antonyms</Badge>
            <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full cursor-pointer">Phrasal Verbs</Badge>
            <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full cursor-pointer">Idioms</Badge>
            <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full cursor-pointer">Proverbs</Badge>
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* List of Words */}
      <main className="flex-1 px-4 py-4 space-y-4 pb-24">
        <TransitionGroup component={null}>
          {words.map((item) => {
             // Create a ref for each item if it doesn't exist
             // Using nodeRefs (Map) directly instead of nodeRefs.current avoids the render error
             if (!nodeRefs.has(item.id)) {
                nodeRefs.set(item.id, createRef());
             }
             const nodeRef = nodeRefs.get(item.id);

             return (
              <CSSTransition
                key={item.id}
                nodeRef={nodeRef}
                timeout={300}
                classNames="word-card"
              >
                <div ref={nodeRef} className="mb-4">
                  <Card className="border-border/50 dark:bg-[#1C2C23] shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{item.word}</h3>
                          {/* Step Indicator if revisited */}
                          {item.step > 0 && (
                            <span className="text-[10px] uppercase tracking-wider font-bold text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded mt-1 inline-block">
                              Review Step {item.step}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-1 text-muted-foreground">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="content_copy" className="text-lg" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Icon name="bookmark_border" className="text-lg" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Hindi Meaning */}
                      {item.hindiMeaning && (
                        <div className="bg-muted/30 p-2 rounded-lg -mx-2">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Hindi Meaning</p>
                          <p className="text-lg text-foreground font-medium">{item.hindiMeaning}</p>
                        </div>
                      )}

                      {/* Definition */}
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Definition</p>
                        <p className="text-base text-foreground/90 leading-relaxed">{item.meaning}</p>
                      </div>

                      {/* Synonyms */}
                      {item.synonyms && item.synonyms.length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Synonyms</p>
                          <div className="flex flex-wrap gap-2">
                            {item.synonyms.map((syn, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary-darker dark:text-primary hover:bg-primary/20 border-transparent">
                                {syn}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Example Sentence */}
                      {item.sentence && (
                        <div className="mt-2 p-3 bg-muted/50 rounded-lg border-l-2 border-primary">
                          <p className="text-sm text-muted-foreground italic">
                            "{item.sentence}"
                          </p>
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="flex justify-between items-center pt-2 border-t border-border/50">
                      <Button
                        variant="secondary"
                        className="gap-2"
                        onClick={() => handleAction(item.id, 'revisit')}
                      >
                        <Icon name="reopen_window" className="text-lg" />
                        <span className="hidden sm:inline">Revisit</span>
                      </Button>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="destructive"
                          className="w-28 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 border-transparent shadow-none"
                          onClick={() => handleAction(item.id, 'unknown')}
                        >
                          Don't Know
                        </Button>
                        <Button
                          className="w-28 bg-primary/20 text-primary-darker dark:text-primary hover:bg-primary/30 text-green-800 border-transparent shadow-none"
                          onClick={() => handleAction(item.id, 'known')}
                        >
                          Know
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>

        {words.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center p-4">
            <div className="bg-muted rounded-full p-4 mb-4">
              <Icon name="check_circle" className="text-4xl text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">All Caught Up!</h3>
            <p className="text-muted-foreground">You've reviewed all the words in this set.</p>
            <Button className="mt-6" variant="outline" onClick={() => window.location.reload()}>
              Restart Session
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
