import { motion } from 'framer-motion';

export default function Pricing() {
  return (
    <section className="w-full max-w-7xl px-6 lg:px-10 py-16">
      <div className="flex flex-col items-center gap-4 text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">Simple, Transparent Pricing</h2>
        <p className="text-gray-400 text-lg">Start for free, upgrade when you're addicted.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Free Tier */}
        <div className="rounded-2xl border border-surface-border bg-surface-dark p-8 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Explorer</h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-black text-white">$0</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-gray-400 text-sm mt-4">Perfect for casual learners.</p>
          </div>

          <ul className="flex flex-col gap-3 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <span className="material-symbols-outlined text-green-500 text-lg">check</span>
              5 Idioms per day
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <span className="material-symbols-outlined text-green-500 text-lg">check</span>
              Basic Quizzes
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <span className="material-symbols-outlined text-green-500 text-lg">check</span>
              Community Access
            </li>
          </ul>

          <button className="w-full rounded-full border border-surface-border bg-transparent hover:bg-surface-border text-white font-bold py-3 transition-colors">Start Free</button>
        </div>

        {/* Pro Tier */}
        <motion.div
          whileHover={{ y: -8 }}
          className="relative rounded-2xl border border-primary bg-surface-dark p-8 flex flex-col gap-6 shadow-[0_0_30px_rgba(54,226,123,0.1)]"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Popular
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Fluent</h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-black text-white">$9</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-gray-400 text-sm mt-4">For serious commitment.</p>
          </div>

          <ul className="flex flex-col gap-3 flex-1">
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              Unlimited Idioms
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              Advanced Speaking Club
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              AI Pronunciation Analysis
            </li>
            <li className="flex items-center gap-3 text-sm text-white font-medium">
              <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
              Offline Mode
            </li>
          </ul>

          <button className="w-full rounded-full bg-primary text-background-dark font-bold py-3 hover:bg-[#2fd16f] transition-colors shadow-[0_4px_15px_rgba(54,226,123,0.3)]">Get Fluent</button>
        </motion.div>

        {/* Team Tier */}
        <div className="rounded-2xl border border-surface-border bg-surface-dark p-8 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Master Class</h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-black text-white">$29</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-gray-400 text-sm mt-4">1-on-1 coaching included.</p>
          </div>

          <ul className="flex flex-col gap-3 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <span className="material-symbols-outlined text-green-500 text-lg">check</span>
              Everything in Fluent
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <span className="material-symbols-outlined text-green-500 text-lg">check</span>
              Weekly 1-on-1 Tutor
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-300">
              <span className="material-symbols-outlined text-green-500 text-lg">check</span>
              Custom Learning Plan
            </li>
          </ul>

          <button className="w-full rounded-full border border-surface-border bg-transparent hover:bg-surface-border text-white font-bold py-3 transition-colors">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}
