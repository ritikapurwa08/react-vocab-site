import React, { useState, useEffect, useCallback } from 'react';

import { getInitialWords, saveWordsToLocalStorage } from '@/lib/data-management';

// Page Components
import Navbar from '@/components/navbar';
import HomePage from '@/pages/home-page';
import TrackerPage from '@/pages/tracker-page';
import type { WordData } from './types/data';

const App: React.FC = () => {
  // Initialize words state by loading from localStorage
  const [words, setWords] = useState<WordData[]>(getInitialWords);
  const initialWords = getInitialWords();
  const [activeRoute, setActiveRoute] = useState<'home' | 'tracker'>(
    initialWords.length > 6 || initialWords.some(w => w.status !== 'have to learn') ? 'tracker' : 'home'
  );

  // 1. Local Persistence Effect
  // This effect runs every time the 'words' state changes and saves the data to localStorage.
  useEffect(() => {
    saveWordsToLocalStorage(words);
  }, [words]);

  // 2. Status Update Function (Passed down to TrackerPage -> WordCard)
  const handleStatusChange = useCallback((wordId: number, newStatus: WordData['status']) => {
    setWords(prevWords => prevWords.map(w =>
      w.id === wordId ? { ...w, status: newStatus } : w
    ));
  }, []);

  // Handler to switch to the tracker page
  const handleStartTracking = () => {
    setActiveRoute('tracker');
  };

  // Simple routing logic: determines which component to render below the Navbar
  const renderContent = () => {
    switch (activeRoute) {
      case 'home':
        return <HomePage onStartTracking={handleStartTracking} />;
      case 'tracker':
        return <TrackerPage words={words} handleStatusChange={handleStatusChange} />;
      default:
        return <HomePage onStartTracking={handleStartTracking} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        words={words}
      />

      <main className="container mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
