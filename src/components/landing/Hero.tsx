import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="w-full max-w-7xl px-6 lg:px-10 py-12 lg:py-20">
      <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
        {/* Hero Content */}
        <div className="flex flex-col gap-6 lg:w-1/2 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-dark px-3 py-1.5"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium text-primary uppercase tracking-wide">New: Speaking Club v2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500"
          >
            Master English <br />
            <span className="text-primary decoration-wavy underline decoration-from-font">at Light Speed</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-lg leading-relaxed"
          >
            Join 10,000+ learners unlocking fluency through gamified lessons, live tutors, and AI-powered feedback.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link to="/auth?mode=signup" className="h-14 px-8 flex items-center justify-center rounded-full bg-primary text-background-dark text-base font-bold tracking-wide hover:bg-[#2fd16f] transition-all hover:scale-105 shadow-[0_0_20px_rgba(54,226,123,0.4)]">
              Start Learning Now
            </Link>
            <Link to="/learn" className="h-14 px-8 flex items-center justify-center rounded-full border border-surface-border bg-transparent text-white text-base font-bold tracking-wide hover:bg-surface-dark transition-all hover:border-primary/50">
              View Demo
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-4 pt-6"
          >
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTHLwB9P5LXjU4KzcCFd-GkqYJ50VWseqfUkFzrnldeCjCiVTso3QkgJ2TbevoFWv9TaYnLxwpnT9EHs7Of2XZGlJrPerlg0rA3svIATX3hb6QAhKCMHpmgYDLmVciZ1sDVWCnk9Orx8YTDPGIHEMDrxyKI4U9tA-dGY5_wYtfm--fH1GTMWU3Lm-j7BlPLWef5tgnRukWqUzY7dy7MVpt1-KnOfHeJNqULw_p_KAl7jr8x1FsHLvWnBv7CJYA3kcdn3fDz6I_QoRi')" }}></div>
              <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA29Wuk8iAwi1bgGOqNd2ZKGqv1R2XBjI7hN2LtWR_DNYYmTfnbwnT5FavXaJ_RybckUVZy331SLQuDgw-O-OCrrJgLgheIhYD_5bIlE2qRSAPsrRYPAchDUaRT54D081KqoARAfBa9Mt4ZsD52jrZmeZAch0OCavG90neD449Vt4rPwGzNjJtkE8c9U2eY0H6FyRcft_gpbpNitZxnZ8Ri4FQ31ljmdKmZDvA_-yGbH_lQIQ3ZWD8YUrAOAYF83EjTfk6UFDcJo0iJ')" }}></div>
              <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCW1K4cAEkFUxjXGUyXON8BL2PLKLCV9hpFFERpxXLqNn-YoAO2PqsNjW0zY2MKPyZ6QGDJ21V7Ixe-v4ykpK5NYOWd0qBvTkQ0sU5YXxAVTrOTtMxaGwjiAp5WKdUgR0wCxHVhs3nub7CSt8Y9X_NSvFYs8jjdAnza6GD0BDNjbXkMPvBXSY2EgzgOWRdK8LkDZ6-TsxSosNpTRml1eEW_iUEFY_T-NOzuflj6z1BsJOOdv5GKt_nRE-VS8hL7fGRSg0D2lvMbY1xT')" }}></div>
              <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-surface-highlight flex items-center justify-center text-xs font-bold text-white">
                +2k
              </div>
            </div>
            <p className="text-sm text-gray-400 font-medium">Joined this week</p>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <div className="w-full lg:w-1/2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/3] rounded-2xl bg-surface-dark overflow-hidden border border-surface-border shadow-2xl"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAchgJ3LNO74m-HL0mgK_6E6jUPC2nlBtLzSxRIrWphIej2msO1JXBZD0Ks8tyZBUW3qzOzTadlNZX5a0AP_tqDH651wCkmI96mpxYdSm0n63ogbCDQW2wELuZJHfQOrZJ4u8RAHEKx19N-1g7kAYo-QrchUjqdGYI2t4O5nlO3oWMYej0dyo-N62AT6lCLt9T71vVeFaHafClRinzG3-Rzlhjrq3MjLe4oBaQn5exES5eBNiL_TDRGmt77IGZXicvbI-skTR1uN4o')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80"></div>

            {/* Floating UI Elements over Image */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="bg-background-dark/90 backdrop-blur-md p-4 rounded-xl border border-surface-border shadow-xl w-2/3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                  </div>
                  <span className="text-sm font-bold text-white">Your Progress</span>
                </div>
                <div className="h-2 w-full bg-surface-highlight rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-primary rounded-full"
                  ></motion.div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Level B2</span>
                  <span className="text-primary font-bold">75%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
