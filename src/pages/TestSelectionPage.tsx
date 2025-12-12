import { Icon } from "@/components/ui/MaterialIconHelper";
import { Link, useNavigate } from "react-router-dom";
import { useConvexAuth } from "convex/react";
import { useEffect } from "react";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

export default function TestSelection() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  if (isAuthLoading) return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;

  const tests = [
    { title: "Vocabulary Test", desc: "Test your knowledge of English word meanings.", icon: "book_2", id: "vocabulary", color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Phrasal Verb Test", desc: "Check your understanding of phrasal verbs.", icon: "link", id: "phrasal", color: "text-orange-400", bg: "bg-orange-400/10" },
    { title: "Idioms Test", desc: "Assess your knowledge of idiomatic expressions.", icon: "extension", id: "idioms", color: "text-pink-400", bg: "bg-pink-400/10" },
    { title: "Grammar Test", desc: "Evaluate your mastery of sentence structure and rules.", icon: "menu_book", id: "grammar", color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display pb-24">
      {/* Header (Simplified - relies on main Navbar now) */}
      <main className="flex-1 px-4 pt-10 pb-8 space-y-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-6">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-2">Select Your Test</h1>
            <p className="text-gray-400 text-lg">Choose a specific language area to focus on.</p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test, index) => (
            <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="block group"
            >
              <Link to={`/test/${test.id}`} className="block">
                <div className="bg-surface-dark p-6 rounded-xl border border-surface-border transition-all group-hover:border-primary/50 group-hover:shadow-lg active:scale-[0.98]">
                  <div className="flex items-start space-x-4">
                    <div className={cn(test.bg, test.color, "p-3 rounded-lg")}>
                      <Icon name={test.icon} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-white">{test.title}</h2>
                      <p className="text-sm text-gray-400 mt-1">{test.desc}</p>
                    </div>
                    <div className="text-gray-500 group-hover:text-primary">
                      <Icon name="chevron_right" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Comprehensive Test */}
        <Link to="/test/comprehensive" className="block group mt-8">
          <div className="bg-surface-dark p-6 rounded-xl border border-surface-border transition-all group-hover:border-primary/50 group-hover:shadow-lg active:scale-[0.98]">
            <div className="flex flex-col">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/20 text-primary p-3 rounded-lg">
                  <Icon name="school" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">Comprehensive English Test</h2>
                  <p className="text-sm text-gray-400 mt-1">A mixed-skill assessment covering grammar, vocabulary, and more.</p>
                </div>
                <div className="text-gray-500 group-hover:text-primary">
                  <Icon name="chevron_right" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-surface-border flex justify-between items-center">
                <span className="text-xs text-gray-500">Includes all content types.</span>
                <span className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">50 Questions</span>
              </div>
            </div>
          </div>
        </Link>
      </main>
      {/* BottomNav removed as per user request */}
    </div>
  );
}
