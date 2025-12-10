import { useState } from 'react';

import { Link } from "react-router-dom";
import initialData from '@/data/vocabulary.json';
import { type WordData } from '@/types/data';
import { Icon } from '@/components/material-icon-helper';

export default function WordLearning() {
  const [words] = useState<WordData[]>(initialData as WordData[]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200">

      {/* Header */}
      <div className="sticky top-0 z-10 flex flex-col gap-2 bg-background-light dark:bg-background-dark p-4 pb-2 shadow-sm dark:shadow-black/10">
        <div className="flex items-center h-12 justify-between">
          <Link to="/" className="flex size-12 shrink-0 items-center justify-start">
            <Icon name="arrow_back" />
          </Link>
          <div className="flex items-center justify-center grow">
            <p className="text-lg font-bold leading-tight">Word Learning</p>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-end"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-background-light dark:bg-background-dark sticky top-[80px] z-10">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon name="search" />
          </span>
          <input
            className="w-full h-12 pl-10 pr-4 rounded-xl border-none bg-gray-200 dark:bg-gray-800/50 text-gray-900 dark:text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-primary/50"
            placeholder="Search for a word..."
            type="text"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-4 bg-background-light dark:bg-background-dark sticky top-[140px] z-10">
        <div className="flex space-x-2 overflow-x-auto whitespace-nowrap pb-2 -mx-4 px-4 scrollbar-hide">
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-gray-900">Synonyms</button>
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">Antonyms</button>
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">Phrasal Verbs</button>
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-200 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">Idioms</button>
        </div>
      </div>

      {/* List of Words */}
      <main className="flex-1 px-4 py-4 space-y-4">
        {words.map((item) => (
          <div key={item.id} className="bg-white dark:bg-[#1C2C23] rounded-xl p-5 border border-gray-100 dark:border-transparent">
            {/* Word Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.word}</h3>
              </div>
              <div className="flex space-x-3 text-gray-400 dark:text-gray-500">
                <button><Icon name="content_copy" className="text-xl" /></button>
                <button><Icon name="bookmark_border" className="text-xl" /></button>
              </div>
            </div>

            {/* Meanings */}
            <div className="mt-4 space-y-4">
              {item.hindiMeaning && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Hindi Meaning:</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.hindiMeaning}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Definition:</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.meaning}</p>
              </div>

              {/* Synonyms */}
              {item.synonyms && (
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Synonyms:</p>
                  <div className="mt-2 -mx-5 px-5 overflow-x-auto scrollbar-hide">
                    <div className="flex space-x-2 whitespace-nowrap pb-2">
                      {item.synonyms.map((syn, idx) => (
                        <span key={idx} className="bg-primary/20 text-green-800 dark:text-primary px-3 py-1 text-sm rounded-full">
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Example Sentence */}
              {item.sentence && (
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-bold text-gray-700 dark:text-gray-300">e.g.</span> "{item.sentence}"
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-5 border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between items-center">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800/60 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Icon name="reopen_window" className="text-lg" /> Revisit
              </button>
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center h-10 w-24 rounded-lg bg-red-100/80 dark:bg-red-900/40 text-sm font-semibold text-red-600 dark:text-red-400">
                  Don't Know
                </button>
                <button className="flex items-center justify-center h-10 w-24 rounded-lg bg-primary/20 dark:bg-primary/30 text-sm font-semibold text-gray-900 dark:text-white">
                  Know
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
