import { Link } from 'react-router-dom';
import Flashcard from '../features/phrasal/components/Flashcard';

export default function PhrasalVerbsPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-background-dark dark:text-white overflow-x-hidden min-h-screen flex flex-col">
      {/* Navbar Reuse / Custom Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-border bg-background-dark px-10 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-4 text-white">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <span className="material-symbols-outlined text-primary">school</span>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">EnglishMaster</h2>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-9">
          <Link className="text-white text-sm font-medium hover:text-primary transition-colors" to="/idioms">Idioms</Link>
          <Link className="text-primary text-sm font-medium border-b border-primary" to="/phrasal-verbs">Phrasal Verbs</Link>
          <Link className="text-white text-sm font-medium hover:text-primary transition-colors" to="/test">Test</Link>
        </nav>

        <div className="flex gap-2 items-center">
          <button className="flex items-center justify-center rounded-full size-10 bg-surface-border text-white hover:bg-surface-highlight transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-10 w-10 bg-center bg-cover rounded-full border-2 border-surface-border" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALmA83YmqHACkte_bApqEK0trNXaiIjEbOTEWJW0svjVpTEaGsu-I4sBpUpz91WOiS0vGzIfR6kHXfsq8muQcuPKflCTWqbVz75lKOXb8NLiQqC2R2flYcIE31TPyZ3nvl0mLz6jB-QY1RvnD7ppvYjN2MvFWnsOMroHwtEs3u9ByQKbsBnUHt_rz5KCWAcF-x3dl7bFVFsj8E-vW4J48cZXnt-JZ-Inq6LXAaY3r3a_s2vQfHpCJo-sIiYJbxTyLJFdOdX2degJS9')" }}></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center px-6 py-8 relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-[1000px] w-full flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
            <div className="flex flex-col gap-2">
              <Link className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium" to="/">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to Home
              </Link>
              <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                <span className="text-primary">Phrasal</span> Verbs
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-lg">Master the nuances of English phrasal verbs with interactive flashcards.</p>
            </div>

            <div className="w-full md:w-64 flex flex-col gap-2 bg-surface-dark/50 p-4 rounded-xl border border-surface-border backdrop-blur-sm">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white font-medium">Session Progress</span>
                <span className="text-primary font-bold">5 <span className="text-gray-400 font-normal">/ 20</span></span>
              </div>
              <div className="relative w-full h-2 bg-surface-border rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_var(--color-primary)]" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>

          {/* Flashcard Area */}
          <div className="flex flex-col md:flex-row gap-6 h-full min-h-[500px]">
            <Flashcard />

            {/* Controls */}
            <div className="w-full md:w-24 flex md:flex-col items-center justify-center gap-4">
              <button className="size-14 md:size-16 rounded-full bg-surface-dark border border-surface-border flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400 hover:bg-green-400/10 transition-all">
                <span className="material-symbols-outlined text-3xl">check</span>
              </button>
              <button className="size-14 md:size-16 rounded-full bg-surface-dark border border-surface-border flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400 hover:bg-red-400/10 transition-all">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <div className="hidden md:block flex-grow"></div>
              <div className="flex md:flex-col gap-4">
                <button className="size-14 md:size-16 rounded-full bg-surface-border text-white flex items-center justify-center hover:bg-surface-highlight active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-3xl">arrow_upward</span>
                </button>
                <button className="size-20 rounded-full bg-primary text-black flex items-center justify-center hover:bg-[#2ecc71] hover:shadow-[0_0_20px_var(--color-primary)] active:scale-95 transition-all shadow-[0_0_10px_rgba(54,226,123,0.4)]">
                  <span className="material-symbols-outlined text-4xl">arrow_downward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-dark p-6 rounded-2xl border border-surface-border flex flex-col gap-3 hover:border-primary/30 transition-colors cursor-default group">
              <div className="flex items-center gap-3 mb-1">
                <div className="size-8 rounded-full bg-surface-border flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors text-white">
                  <span className="material-symbols-outlined text-sm">school</span>
                </div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Formal</span>
              </div>
              <p className="text-white leading-snug">"During the conference, I <span className="text-primary font-bold">ran into</span> several colleagues."</p>
            </div>
            <div className="bg-surface-dark p-6 rounded-2xl border border-surface-border flex flex-col gap-3 hover:border-primary/30 transition-colors cursor-default group">
              <div className="flex items-center gap-3 mb-1">
                <div className="size-8 rounded-full bg-surface-border flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors text-white">
                  <span className="material-symbols-outlined text-sm">forum</span>
                </div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Casual</span>
              </div>
              <p className="text-white leading-snug">"Guess who I <span className="text-primary font-bold">ran into</span> at the park? Mike!"</p>
            </div>
            <div className="bg-surface-dark p-6 rounded-2xl border border-surface-border flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-1">
                <div className="size-8 rounded-full bg-surface-border flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-sm">hub</span>
                </div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Synonyms</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-surface-border text-sm text-white hover:bg-surface-highlight cursor-pointer transition-colors">Bump into</span>
                <span className="px-3 py-1.5 rounded-lg bg-surface-border text-sm text-white hover:bg-surface-highlight cursor-pointer transition-colors">Come across</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
