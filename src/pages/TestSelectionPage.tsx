import { Icon } from "@/components/MaterialIconHelper";
import { Link } from "react-router-dom";
import { BottomNav } from "@/components/BottomNavigation";

export default function TestSelection() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display pb-24">
      {/* Header */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <Link to="/" className="text-slate-800 dark:text-white flex size-10 shrink-0 items-center justify-center">
          <Icon name="arrow_back" />
        </Link>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight flex-1 text-center">Select Your Test</h1>
        <div className="flex size-10 shrink-0"></div>
      </div>

      <main className="flex-1 px-4 pt-6 pb-8 space-y-4">

        {/* Test Cards */}
        {[
          { title: "Vocabulary Test", desc: "Test your knowledge of English word meanings.", icon: "book_2", id: "vocab" },
          { title: "Phrasal Verb Test", desc: "Check your understanding of phrasal verbs.", icon: "link", id: "phrasal" },
          { title: "Idioms Test", desc: "Assess your knowledge of idiomatic expressions.", icon: "extension", id: "idioms" },
        ].map((test) => (
          <Link to={`/test/${test.id}`} key={test.id} className="block group">
            <div className="bg-white dark:bg-[#1C2C23] p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-all group-hover:border-primary/50 group-hover:scale-[1.02] active:scale-[0.98] shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 text-primary p-3 rounded-lg">
                  <Icon name={test.icon} />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">{test.title}</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{test.desc}</p>
                </div>
                <div className="text-slate-400 dark:text-slate-500">
                  <Icon name="chevron_right" />
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Comprehensive Test */}
        <Link to="/test/comprehensive" className="block group">
          <div className="bg-white dark:bg-[#1C2C23] p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-all group-hover:border-primary/50 group-hover:scale-[1.02] active:scale-[0.98] shadow-sm">
            <div className="flex flex-col">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 text-primary p-3 rounded-lg">
                  <Icon name="school" />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">Comprehensive English Test</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">A mixed-skill assessment covering grammar, vocabulary, and more.</p>
                </div>
                <div className="text-slate-400 dark:text-slate-500">
                  <Icon name="chevron_right" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">50 Questions</span>
              </div>
            </div>
          </div>
        </Link>

      </main>
      <BottomNav />
    </div>
  );
}
