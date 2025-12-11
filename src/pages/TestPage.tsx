import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function TestPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-background-dark/90 backdrop-blur-md">
        <div className="px-6 lg:px-40 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="flex items-center justify-center size-10 rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <h2 className="text-white text-lg font-bold leading-tight">English Master</h2>
              <p className="text-xs text-gray-400 font-medium">Advanced Vocabulary</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-xs text-primary font-bold tracking-wider uppercase mb-1">Current Streak</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-orange-500 text-sm fill">local_fire_department</span>
                <span className="text-white font-bold">12 Days</span>
              </div>
            </div>
            <Button variant="ghost" className="rounded-full hover:bg-surface-border text-white group">
              <span>Quit Test</span>
              <span className="material-symbols-outlined ml-2 group-hover:rotate-90 transition-transform">close</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start w-full px-4 md:px-6 lg:px-40 py-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10"></div>

        <div className="w-full max-w-[960px] flex flex-col gap-8">
          {/* Progress */}
          <div className="flex flex-col gap-3">
            <div className="flex items-end justify-between px-2">
              <div className="flex flex-col">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-1">Topic: Synonyms</span>
                <p className="text-slate-900 dark:text-white text-xl font-bold">Question 5 of 20</p>
              </div>
              <div className="flex items-center gap-2 bg-surface-dark px-3 py-1 rounded-full border border-surface-border">
                <span className="material-symbols-outlined text-primary text-sm">timer</span>
                <span className="text-white text-sm font-mono">04:12</span>
              </div>
            </div>
            <Progress value={25} className="h-2 rounded-full" />
          </div>

          {/* Question Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel p-6 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col gap-8 relative z-10">
              <div className="space-y-4">
                <h1 className="text-slate-900 dark:text-white text-2xl md:text-4xl font-bold leading-tight">
                  Which word is the most appropriate synonym for <span className="text-primary underline decoration-2 underline-offset-4">ephemeral</span>?
                </h1>
                <p className="text-gray-400 text-lg">Select the best option that matches the context of fleeting time.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {['Enduring', 'Transitory', 'Eternal', 'Tangible'].map((option, idx) => {
                  const isSelected = option === 'Transitory';
                  return (
                    <button
                      key={option}
                      className={`relative flex items-center p-4 rounded-xl border transition-all duration-200 text-left
                                        ${isSelected
                          ? 'border-primary bg-primary/10 shadow-[0_0_10px_rgba(54,226,123,0.3)]'
                          : 'border-surface-border bg-surface-dark hover:bg-surface-highlight hover:border-primary/50'}`}
                    >
                      <div className={`flex items-center justify-center size-8 rounded-full mr-4 font-bold text-sm
                                            ${isSelected ? 'bg-primary text-background-dark' : 'bg-surface-border text-gray-400'}`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-white text-lg font-medium">{option}</span>
                      {isSelected && (
                        <div className="absolute right-4 text-primary">
                          <span className="material-symbols-outlined">check_circle</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mt-10 pt-8 border-t border-surface-border gap-4">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  <span className="material-symbols-outlined mr-2">flag</span>
                  Report Issue
                </Button>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Button variant="outline" className="hidden md:flex rounded-full border-surface-border px-8">Skip</Button>
                  <Button size="lg" className="flex-1 md:flex-none rounded-full bg-primary text-background-dark font-bold hover:bg-[#2bc968] px-10">
                    Submit Answer
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
