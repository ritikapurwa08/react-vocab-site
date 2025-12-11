export default function Footer() {
  return (
    <footer className="w-full border-t border-surface-border bg-background-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-primary text-3xl">school</span>
              <h2 className="text-xl font-bold">EnglishHub</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The most effective way to master English online. Join our community and start your journey to fluency today.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <h3 className="text-white font-bold">Subscribe to our newsletter</h3>
            <div className="flex gap-2">
              <input className="bg-surface-dark border border-surface-border text-white text-sm rounded-full px-4 py-2.5 outline-none focus:border-primary w-full md:w-64 placeholder:text-gray-600" placeholder="Enter your email" type="email" />
              <button className="bg-primary text-background-dark font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#2fd16f] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-surface-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2024 EnglishHub Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-gray-500 hover:text-white text-sm transition-colors" href="#">Privacy</a>
            <a className="text-gray-500 hover:text-white text-sm transition-colors" href="#">Terms</a>
            <a className="text-gray-500 hover:text-white text-sm transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
