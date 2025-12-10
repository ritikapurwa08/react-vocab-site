import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {type  WordData } from '@/types/data';

interface ManualEntryProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (word: Partial<WordData>) => void;
}

export function ManualEntryDialog({ isOpen, onClose, onAdd }: ManualEntryProps) {
  const [word, setWord] = React.useState('');
  const [meaning, setMeaning] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!word || !meaning) return;

    onAdd({
      word,
      meaning,
      status: 'unknown',
      // setId will be calculated by the parent
    });
    setWord('');
    setMeaning('');
    // Keep dialog open for rapid entry? Or close? Let's keep open for rapid.
    // Focus back on word input logic would go here ideally.
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-surface border-surface-highlight text-text-main">
        <DialogHeader>
          <DialogTitle>Add New Word</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-text-dim uppercase font-bold">Word</label>
            <Input
              value={word}
              onChange={e => setWord(e.target.value)}
              className="bg-background border-surface-highlight text-text-main text-lg mt-1"
              placeholder="e.g. Ephemeral"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs text-text-dim uppercase font-bold">Meaning</label>
            <Textarea
              value={meaning}
              onChange={e => setMeaning(e.target.value)}
              className="bg-background border-surface-highlight text-text-main mt-1"
              placeholder="Short definition..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-text-dim">Done</Button>
            <Button type="submit" className="bg-primary text-background hover:bg-primary-dark font-bold">
              Save & Add Next
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
