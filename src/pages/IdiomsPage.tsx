import IdiomCard, { type Idiom } from '../features/idioms/components/IdiomCard';
import IdiomFilters from '../features/idioms/components/IdiomFilters';
import { MOCK_IDIOMS } from '@/data/vocabulary'; // Import the new mock data
import { Link, useNavigate } from 'react-router-dom';
import { useConvexAuth, useQuery, useMutation } from 'convex/react';
import { useEffect, useState, useMemo } from 'react';
import { api } from '../../convex/_generated/api';

import { Icon } from '@/components/ui/MaterialIconHelper';

// Cast the mock data for type safety
const IdiomList: Idiom[] = MOCK_IDIOMS.map(item => ({
    id: item.id,
    phrase: item.phrase,
    definition: item.definition,
    example: item.example,
    level: item.level,
    category: item.category,
    icon: item.icon,
}));

export default function IdiomsPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch user progress for idioms
  const rawProgressData = useQuery(api.wordProgress.getProgress, { contentType: "idiom" });
  const updateProgress = useMutation(api.wordProgress.updateProgress);

  // Map progress data
  const progressMap = useMemo(() => {
    const map = new Map<string, number>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rawProgressData || []).forEach((p: any) => map.set(p.contentId, p.masteryLevel));
    return map;
  }, [rawProgressData]);

  // Merge progress with idioms
  const idiomListWithProgress = useMemo(() => {
      return IdiomList.map((idiom: Idiom) => ({
          ...idiom,
          masteryLevel: progressMap.get(idiom.id) || 0,
      }));
  }, [progressMap]);

  // Filter logic
  const filteredIdioms = idiomListWithProgress.filter((idiom: Idiom) =>
    idiom.phrase.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idiom.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    idiom.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleMastery = async (idiomId: string, currentLevel: number) => {
      // Toggle: If learned (>=3), reset to 0. If not, set to 5 (mastered).
      const newLevel = currentLevel >= 3 ? 0 : 5;
      await updateProgress({
          contentId: idiomId,
          contentType: "idiom",
          contentNumber: 1, // Placeholder, ideally specific index
          action: newLevel === 5 ? 'master' : 'unknown'
      });
  };

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate('/auth?mode=login');
    }
  }, [isAuthLoading, isAuthenticated, navigate]);

  if (isAuthLoading) return <div className="flex h-screen items-center justify-center text-white">Loading...</div>;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center w-full px-3 md:px-6 lg:px-40 py-4 md:py-8">
        <div className="flex flex-col w-full max-w-[1200px] flex-1 gap-6 md:gap-10">
          {/* Hero Banner */}
          <section className="relative w-full rounded-2xl overflow-hidden bg-surface-dark min-h-[250px] md:min-h-[300px] flex items-center justify-center text-center p-6 md:p-8">
            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZxJBlvSNgJ_OrBzXnP9iJ9DU8dj36JyXHTplqaMBywe-pR7SebDZqX6uaaQIEvie08-27nskU4Bq_kOK70HuY2KKBBjvICO2kOAaQLaeQpuZEtxfsB-jF8neQBUKaPdW6KQ6LtTz_BB6nn8-HsRKO0R5chhVgYfPMIBaN1CxJPnvJT8jHr53OTTQqO5kWGls07v8S3Lvda26CnfUCiGxOY-PAZUdBp85kYqrhsMBpiGJ1dCdnXHZ90z6jNhi1OoXfq4l4tnPzlPrA')" }}></div>
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-background-dark/90"></div>

            <div className="relative z-10 flex flex-col gap-3 md:gap-4 items-center max-w-3xl mx-auto">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
                Master English <span className="text-primary transparent-text-stroke">Idioms</span>
              </h1>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg font-normal max-w-xl">
                Unlock the secrets of native speakers. Dive into our curated collection of essential idioms to sound more natural and fluent.
              </p>
              {/* Search */}
              <div className="w-full max-w-lg mt-2 md:mt-4 group/search">
                <label className="flex items-center w-full h-12 md:h-14 rounded-full bg-surface-dark border border-surface-border focus-within:border-primary focus-within:shadow-[0_0_15px_rgba(54,226,123,0.2)] transition-all overflow-hidden pl-3 md:pl-4 pr-1">
                  <span className="material-symbols-outlined text-gray-500 group-focus-within/search:text-primary transition-colors text-lg md:text-xl">search</span>
                  <input
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-3 md:px-4 font-body h-full outline-none text-sm md:text-base"
                    placeholder="Search idioms..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-4 md:gap-6">
            <IdiomFilters />

            {/* Results Count */}
            <div className="flex items-center justify-between px-1">
              <p className="text-gray-400 text-xs md:text-sm">
                Showing <span className="text-primary font-bold">{filteredIdioms.length}</span> idiom{filteredIdioms.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Idiom Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredIdioms.map(idiom => (
                <IdiomCard
                    key={idiom.id}
                    idiom={idiom}
                    onToggle={() => handleToggleMastery(idiom.id, idiom.masteryLevel || 0)}
                />
              ))}
            </div>

            {filteredIdioms.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center">
                <Icon name="search_off" className="text-6xl md:text-7xl text-gray-600 mb-4" />
                <h3 className="text-white text-xl md:text-2xl font-bold mb-2">No idioms found</h3>
                <p className="text-gray-400 text-sm md:text-base">Try adjusting your search or filters</p>
              </div>
            )}

            {/* Pagination */}
            {filteredIdioms.length > 0 && (
              <div className="flex items-center justify-center pt-4 md:pt-8">
                <div className="flex items-center gap-2">
                  <button className="flex size-9 md:size-10 items-center justify-center rounded-full bg-surface-dark border border-surface-border hover:bg-surface-border transition-colors group touch-manipulation">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-lg md:text-xl">chevron_left</span>
                  </button>
                  <button className="text-xs md:text-sm font-bold flex size-9 md:size-10 items-center justify-center text-background-dark bg-primary rounded-full shadow-[0_0_10px_rgba(54,226,123,0.4)]">1</button>
                  <button className="text-xs md:text-sm font-bold flex size-9 md:size-10 items-center justify-center text-gray-400 bg-surface-dark border border-surface-border hover:text-white hover:bg-surface-border rounded-full transition-colors">2</button>
                  <button className="text-xs md:text-sm font-bold flex size-9 md:size-10 items-center justify-center text-gray-400 bg-surface-dark border border-surface-border hover:text-white hover:bg-surface-border rounded-full transition-colors">3</button>
                  <button className="flex size-9 md:size-10 items-center justify-center rounded-full bg-surface-dark border border-surface-border hover:bg-surface-border transition-colors group touch-manipulation">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-lg md:text-xl">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FAB - Hidden on small screens */}
      <div className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-40 hidden sm:block">
        <Link to="/tests" className="group flex items-center gap-2 h-12 md:h-14 pl-3 md:pl-4 pr-4 md:pr-6 rounded-full bg-primary text-background-dark text-sm md:text-base font-bold shadow-[0_4px_20px_rgba(54,226,123,0.4)] hover:scale-105 hover:shadow-[0_6px_25px_rgba(54,226,123,0.5)] transition-all duration-300">
          <div className="flex items-center justify-center size-7 md:size-8 rounded-full bg-background-dark/10 group-hover:bg-background-dark/20 transition-colors">
            <Icon name="fitness_center" className="text-base md:text-[20px]" />
          </div>
          <span>Practice Mode</span>
        </Link>
      </div>
    </div>
  );
}
