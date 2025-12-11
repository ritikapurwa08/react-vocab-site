import { motion } from 'framer-motion';

export default function Features() {
  return (
    <section className="w-full max-w-7xl px-6 lg:px-10 py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Explore Your Hub</h2>
          <p className="text-gray-400 text-lg">Interactive modules designed to make learning addictive.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Speaking Club */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface-dark border border-surface-border p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] md:col-span-2 lg:col-span-2"
          >
            <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-surface-highlight group-hover:text-primary/10 transition-colors">mic</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
                <span className="material-symbols-outlined">mic</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-500 border border-red-500/20">
                <span className="size-1.5 rounded-full bg-red-500 animate-pulse"></span>
                LIVE
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Speaking Club</h3>
              <p className="text-gray-400 text-sm mb-4">Join live conversations with native speakers 24/7. Topic: "Future Technology"</p>
              <button className="w-full rounded-lg bg-surface-highlight py-2.5 text-sm font-bold text-white hover:bg-white hover:text-background-dark transition-colors">Join Room</button>
            </div>
          </motion.div>

          {/* Card 2: Grammar Drills */}
          <motion.div
            whileHover={{ translateY: -4 }}
            className="group flex flex-col rounded-2xl bg-surface-dark border border-surface-border p-6 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 rounded-full bg-orange-400/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <span className="text-xs font-bold text-gray-500 bg-surface-highlight px-2 py-1 rounded">50+ New</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Grammar Drills</h3>
            <p className="text-gray-400 text-sm mb-4 flex-grow">Master complex rules with interactive exercises.</p>
            <div className="w-full bg-surface-highlight h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-400 h-full w-1/3"></div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">3/10 Completed</p>
          </motion.div>

          {/* Card 3: Listening Challenge */}
          <motion.div
            whileHover={{ translateY: -4 }}
            className="group flex flex-col rounded-2xl bg-surface-dark border border-surface-border p-6 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 rounded-full bg-blue-400/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">headphones</span>
              </div>
              <span className="text-xs font-bold text-gray-500 bg-surface-highlight px-2 py-1 rounded">Ep. 42</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Listening Lab</h3>
            <p className="text-gray-400 text-sm mb-4 flex-grow">Tune into Podcast Ep. 42 and test comprehension.</p>
            <button className="flex items-center justify-center gap-2 w-full rounded-lg border border-surface-highlight py-2 text-sm font-medium text-white hover:bg-surface-highlight transition-colors">
              <span className="material-symbols-outlined text-sm">play_arrow</span> Play
            </button>
          </motion.div>

          {/* Card 4: Word of the Day (Vertical) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group flex flex-col justify-center rounded-2xl bg-gradient-to-b from-surface-dark to-surface-highlight border border-surface-border p-6 hover:border-primary/50 transition-all duration-300 md:col-span-1 lg:col-span-1 lg:row-span-1"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
              <span className="text-xs font-bold text-primary uppercase">Word of the Day</span>
            </div>
            <h3 className="text-2xl font-black text-white mb-1">Serendipity</h3>
            <p className="text-xs text-gray-400 italic mb-2">/ˌser.ənˈdɪp.ə.ti/</p>
            <p className="text-sm text-gray-300">The occurrence of events by chance in a happy or beneficial way.</p>
          </motion.div>

          {/* Card 5: Community */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="group flex flex-col rounded-2xl bg-surface-dark border border-surface-border p-6 hover:border-primary/50 transition-all duration-300 md:col-span-2 lg:col-span-3"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <img alt="User Avatar" className="w-12 h-12 rounded-full border-4 border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdwycr6SvB_JgeuiLVd6iaY6PFBBGXxsVksFNAzrLdzdDsBFxOEvqxBGCXVIXqCPXxcEg2BulP4Tz8wD1fMOuAJ_wUU7HgIDAu4OmQYEOKwHo0j-mmeEfC6D8hIc4D24vYYVJ9FNVuR8ULczFpqQwdl7lkb2bPXdSHwg2MesXf8IWrGyf6oV0fI-Mxq-c6_BYOY_YTg4QZL5QwKizbThp6M4RewKkqQ2KU27hyRzhJrJmzTqoccptnw1Mswqy0l_d_o4TmKW819Kzq" />
                  <img alt="User Avatar" className="w-12 h-12 rounded-full border-4 border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClOQyHGbmgcFzP9pAMe7UQV4uD7brJhTQHxeZrEp8wJqDDJYIDgV0LQCBsL7TueSSWeVe6sru4TqKfjO6AHiPtH8lI6k8TWETnQzpjD7V5Z9jacpHVxpwew2n7vnff3SdS1cGDFBMPtFjXQ4zxyTQ1LJfitDy49jiDv00i3l368y4_YvosB3xF56wERzVw2KVmiEi3WcgdhYoUtjCX5mZiuZqtt2HkocmGneR6dOxNhPOV-Po4JEusChEzH4Ve-_Ji80ZvpVG-GuBP" />
                  <img alt="User Avatar" className="w-12 h-12 rounded-full border-4 border-surface-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmrDtMF4eu5ogBmIUhvukNXqc0sUjFlnuvjeJ9KA8N4TLVDAlM3P1LTfqVHEIh5JjGqu235f6Dj8OvttCARkgc_B_-q_oazIVXz618mXEeXAVJxtqKPPhiWk_ZJZ6UFZw39LzuVtf4iEZcKYIQqJLzyuyJdW4AiZYwCgScn8s_eU1Vxf8cBX9D2qUbXawOdcBMQhtQW0EcZ2YSYoZJlo7VixaPJc11D_yyOfRtuyXmOayalXSLOGzOe96OlxfJROKyGDZaEK6LOdGv" />
                  <div className="w-12 h-12 rounded-full border-4 border-surface-dark bg-surface-highlight flex items-center justify-center text-xs font-bold text-white">+8k</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Community Hub</h3>
                  <p className="text-gray-400 text-sm">342 learners active now</p>
                </div>
              </div>
              <button className="rounded-full bg-white/5 px-6 py-2 text-sm font-bold text-white hover:bg-white hover:text-background-dark transition-colors border border-white/10">
                Join Discussion
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
