import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Icon } from './material-icon-helper';

export const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#1c2620] border-t border-white/10 flex justify-around items-center px-4 z-50">
      <Link to="/" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", isActive('/') ? "text-primary" : "text-[#9db8a9] hover:text-white")}>
        <Icon name="home" />
        <span className="text-xs font-medium">Home</span>
      </Link>
      <Link to="/learn" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", isActive('/learn') ? "text-primary" : "text-[#9db8a9] hover:text-white")}>
        <Icon name="book" />
        <span className="text-xs font-medium">Vocabulary</span>
      </Link>
      <Link to="/tests" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", isActive('/tests') ? "text-primary" : "text-[#9db8a9] hover:text-white")}>
        <Icon name="spellcheck" />
        <span className="text-xs font-medium">Tests</span>
      </Link>
      <Link to="/progress" className={cn("flex flex-col items-center justify-center gap-1 transition-colors", isActive('/progress') ? "text-primary" : "text-[#9db8a9] hover:text-white")}>
        <Icon name="bar_chart" />
        <span className="text-xs font-medium">Progress</span>
      </Link>
    </div>
  );
};
