import React, { useState, useEffect, useCallback } from 'react';
import { getInitialWords, saveWordsToLocalStorage } from '@/lib/data-management';

// Page Components and UI
import Navbar from '@/components/navbar';
import HomePage from '@/pages/home-page';
import TrackerPage from '@/pages/tracker-page';
import { Toaster } from '@/components/ui/sonner';
import type { WordData } from './types/data';

// --- API CONFIGURATION ---
const GEMINI_API_KEY = (import.meta.env.GEMINI_API_KEY || "").toString();
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
const MAX_RETRIES = 5;

// --- UTILITY: Exponential Backoff for API Calls ---
async function fetchWithRetry(url: string, options: RequestInit, retries = 0): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (response.status === 429 && retries < MAX_RETRIES) {
      const delay = Math.pow(2, retries) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries + 1);
    }
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      const delay = Math.pow(2, retries) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries + 1);
    }
    throw error;
  }
}

// --- NEW UTILITY: Robust JSON Extraction ---
/**
 * Safely extracts a JSON string from a raw text response, handling markdown fences.
 * @param rawText The raw text response from the API.
 * @returns A clean JSON string or null if unable to parse.
 */
function extractJson(rawText: string): string | null {
  // 1. Try to find content inside optional '```json' ... '```' markdown block
  const match = rawText.match(/```json\s*([\s\S]*?)\s*```/);
  if (match && match[1]) {
    return match[1].trim();
  }

  // 2. Fallback: Try to clean up stray characters around the curly braces
  const cleanedText = rawText.replace(/^[\s\S]*?{/, '{').replace(/}[\s\S]*?$/, '}');

  // Basic validation that it looks like a JSON object
  if (cleanedText.startsWith('{') && cleanedText.endsWith('}')) {
      return cleanedText;
  }

  // 3. Last resort: Return the raw trimmed text.
  return rawText.trim();
}

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [words, setWords] = useState<WordData[]>(getInitialWords);
  const initialWords = getInitialWords();
  const [activeRoute, setActiveRoute] = useState<'home' | 'tracker'>(
    initialWords.length > 6 || initialWords.some(w => w.status !== 'have to learn') ? 'tracker' : 'home'
  );

  // 1. Local Persistence Effect: Saves words to localStorage on change
  useEffect(() => {
    saveWordsToLocalStorage(words);
  }, [words]);

  // 2. Status Update Function (Passed down to TrackerPage -> WordCard)
  const handleStatusChange = useCallback((wordId: number, newStatus: WordData['status']) => {
    setWords(prevWords => prevWords.map(w =>
      w.id === wordId ? { ...w, status: newStatus } : w
    ));
  }, []);

  // 3. AI Content Generation Function (Passed down to TrackerPage -> WordCard)
  const handleGenerateContent = useCallback(async (wordId: number, word: string, meaning: string) => {
    const systemPrompt = `You are a creative learning assistant. For the given word and meaning, generate a memorable mnemonic and a new, practical example sentence. The mnemonic should be short and use parts of the word or its sound to connect to the meaning.

    Format your output STRICTLY as a JSON object with two keys:
    1. mnemonic (string, e.g., "Ubiq-Quit-Us: You quit trying to avoid seeing the thing everywhere.")
    2. sentence (string, a complete sentence, e.g., "The newly released movie poster was ubiquitous on social media.")`;

    const userQuery = `Word: ${word}. Meaning: ${meaning}. Generate a mnemonic and a new sentence.`;

    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    "mnemonic": { "type": "STRING" },
                    "sentence": { "type": "STRING" }
                },
                "propertyOrdering": ["mnemonic", "sentence"]
            }
        }
    };

    try {
        const response = await fetchWithRetry(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
            throw new Error("AI response was empty or malformed.");
        }

        const jsonString = extractJson(rawText);

        if (!jsonString) {
            // Log the problematic raw text to help debug future errors
            console.error("Failed to extract JSON from raw response:", rawText);
            throw new Error("Could not extract valid JSON from AI response.");
        }

        const generatedContent: { mnemonic: string, sentence: string } = JSON.parse(jsonString);

        // Update the word in state with the new content
        setWords(prevWords => prevWords.map(w =>
            w.id === wordId ? {
                ...w,
                mnemonic: generatedContent.mnemonic,
                sentence: generatedContent.sentence
            } : w
        ));
    } catch (e) {
        console.error("Error during AI generation:", e);
        throw e; // Re-throw to allow WordCard to handle error state
    }
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
        return <TrackerPage words={words} handleStatusChange={handleStatusChange} handleGenerateContent={handleGenerateContent} />;
      default:
        return <HomePage onStartTracking={handleStartTracking} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors">
      <Navbar
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
        words={words}
      />

      <main className="container mx-auto">
        {renderContent()}
      </main>

      {/* Toast notifications */}
      <Toaster richColors />
    </div>
  );
};

export default App;
