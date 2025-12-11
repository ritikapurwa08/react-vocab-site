const FILTERS = [
  { label: 'All', icon: 'apps', active: true },
  { label: 'Business', icon: 'work', active: false },
  { label: 'Casual', icon: 'coffee', active: false },
  { label: 'Animals', icon: 'pets', active: false },
  { label: 'Emotions', icon: 'mood', active: false },
  { label: 'Colors', icon: 'palette', active: false }
];

export default function IdiomFilters() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar pr-4">
        {FILTERS.map((filter, i) => (
          <button
            key={i}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all
                    ${filter.active
                ? 'bg-primary text-background-dark font-bold shadow-[0_0_10px_rgba(54,226,123,0.3)] hover:scale-105'
                : 'bg-surface-border text-white border border-transparent hover:border-surface-highlight hover:bg-surface-highlight'}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{filter.icon}</span>
            <span className={`text-sm ${filter.active ? '' : 'font-medium'}`}>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-gray-400 text-sm">Sort by:</span>
        <select className="bg-surface-dark border-none text-white text-sm font-medium rounded-lg focus:ring-1 focus:ring-primary py-1 pl-3 pr-8 cursor-pointer">
          <option>A-Z</option>
          <option>Popularity</option>
          <option>Difficulty</option>
        </select>
      </div>
    </div>
  );
}
