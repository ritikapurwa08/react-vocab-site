import { motion } from 'framer-motion';

export interface Idiom {
  id: string;
  phrase: string;
  definition: string;
  example: string;
  level: string;
  category: string;
  icon: string;
  masteryLevel?: number;
}

export default function IdiomCard({ idiom, onToggle }: { idiom: Idiom; onToggle?: () => void }) {
  const isLearned = (idiom.masteryLevel || 0) >= 3;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col gap-4 rounded-xl border ${
        isLearned ? 'border-primary/50 bg-primary/5' : 'border-surface-border bg-surface-dark'
      } p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(54,226,123,0.1)]`}
    >
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          className={`transition-colors ${isLearned ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
          title={isLearned ? "Mark as unknown" : "Mark as learned"}
        >
          <span className="material-symbols-outlined text-2xl">
            {isLearned ? 'check_circle' : 'circle'}
          </span>
        </button>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center size-12 rounded-full bg-surface-border text-white group-hover:bg-primary group-hover:text-background-dark transition-colors shrink-0">
          <span className="material-symbols-outlined">{idiom.icon}</span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">{idiom.phrase}</h3>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">{idiom.category}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <p className="text-gray-400 text-sm font-normal leading-relaxed">
          {idiom.definition}
        </p>
        <div className="mt-auto rounded-lg bg-primary/5 border border-primary/10 p-3 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
          <p className="text-sm text-white italic">
            <span className="text-primary font-bold not-italic mr-1">Ex:</span>
            <span dangerouslySetInnerHTML={{ __html: idiom.example.replace(idiom.phrase.toLowerCase(), `<span class="text-primary">${idiom.phrase.toLowerCase()}</span>`) }}></span>
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-surface-border">
        <div className="flex gap-2">
          <button className="flex items-center justify-center size-8 rounded-full bg-white/5 hover:bg-surface-border text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>volume_up</span>
          </button>
          <button className="flex items-center justify-center size-8 rounded-full bg-white/5 hover:bg-surface-border text-gray-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>content_copy</span>
          </button>
        </div>
        <span className="px-3 py-1 rounded-full bg-surface-border text-xs text-gray-400 font-medium">{idiom.level} Level</span>
      </div>
    </motion.div>
  );
}
