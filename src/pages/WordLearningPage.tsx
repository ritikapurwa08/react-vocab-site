import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function WordLearningPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col overflow-hidden">
      {/* Reuse header or simple nav */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-surface-border glass-panel relative z-10">
        <div className="flex items-center gap-3 text-white">
          <Link to="/" className="size-8 text-primary">
            <span className="material-symbols-outlined text-[32px]">school</span>
          </Link>
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight">WordWise</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-400">
            <span className="material-symbols-outlined text-lg">keyboard</span>
            <span>Shortcuts: Space (Known) / X (Unknown)</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 gap-8 relative z-10">
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Stats */}
        <div className="w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-surface-dark border border-surface-border p-3">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-xl fill">local_fire_department</span>
              <span className="text-xl font-bold">12</span>
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Day Streak</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-surface-dark border border-surface-border p-3">
            <div className="flex items-center gap-2 text-blue-400">
              <span className="material-symbols-outlined text-xl">library_books</span>
              <span className="text-xl font-bold">450</span>
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Words Learned</span>
          </div>
          <div className="col-span-2 flex flex-col justify-center gap-2 rounded-2xl bg-surface-dark border border-surface-border p-4">
            <div className="flex justify-between items-end">
              <span className="text-xs text-gray-300 font-medium">Daily Goal</span>
              <span className="text-xs text-primary font-bold">65%</span>
            </div>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[65%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Word Card */}
        <div className="w-full max-w-lg perspective-1000">
          <div className="relative w-full bg-surface-dark rounded-[2.5rem] border border-surface-border shadow-2xl p-8 md:p-10 flex flex-col gap-6 transform transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex flex-col gap-2 text-center items-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-shadow-glow mb-2">Serendipity</h1>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-body italic text-lg">/ˌser.ənˈdɪp.ə.ti/</span>
                <button className="flex items-center justify-center size-8 rounded-full bg-white/5 hover:bg-primary/20 text-white hover:text-primary transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200">
                <span className="material-symbols-outlined text-sm text-slate-400">translate</span>
                <span className="font-medium">नसीब (Naseeb)</span>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>

            <div className="flex flex-col gap-3 items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Synonyms</span>
              <div className="flex flex-wrap justify-center gap-2">
                {['Chance', 'Fate', 'Luck'].map(word => (
                  <span key={word} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">{word}</span>
                ))}
              </div>
            </div>

            <div className="relative mt-2 p-5 rounded-2xl bg-black/20 border border-white/5">
              <span className="absolute top-3 left-3 material-symbols-outlined text-primary/30 text-3xl select-none">format_quote</span>
              <p className="relative z-10 text-slate-300 text-center leading-relaxed font-body">
                "Finding $20 in your winter coat pocket isn't just luck, it's financial <strong className="text-white font-bold">serendipity</strong> that funds your next pizza."
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full max-w-lg flex items-center justify-center gap-4 mt-2">
          <Button variant="outline" className="flex-1 h-14 rounded-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300">
            <span className="material-symbols-outlined mr-2">close</span>
            I don't know
          </Button>
          <Button className="flex-[1.5] h-14 rounded-full bg-primary text-background-dark font-bold hover:bg-[#4ff590]">
            <span className="material-symbols-outlined mr-2">check</span>
            I know this word
          </Button>
        </div>
      </main>
    </div>
  );
}
