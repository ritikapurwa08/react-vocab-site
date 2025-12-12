import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Icon } from '../components/ui/MaterialIconHelper';

export const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || (path === '/tests' && location.pathname.startsWith('/test/'));

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-surface-dark border-t border-white/10 flex justify-around items-center px-4 z-50 md:hidden">
      <Link to="/" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", isActive('/') ? "text-primary" : "text-[#9db8a9] hover:text-white")}>
        <Icon name="home" />
        <span className="text-xs font-medium">Home</span>
      </Link>
      <Link to="/learn" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", isActive('/learn') ? "text-primary" : "text-[#9db8a9] hover:text-white")}>
        <Icon name="book" />
        <span className="text-xs font-medium">Learn</span>
      </Link>
      <Link to="/tests" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", isActive('/tests') ? "text-primary" : "text-[#9db8a9] hover:text-white")}>
        <Icon name="spellcheck" />
        <span className="text-xs font-medium">Tests</span>
      </Link>
      <Link to="/profile" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", isActive('/profile') ? "text-primary" : "text-[#9db8a9] hover:text-white")}>
        <Icon name="person" />
        <span className="text-xs font-medium">Profile</span>
      </Link>
    </div>
  );
};
