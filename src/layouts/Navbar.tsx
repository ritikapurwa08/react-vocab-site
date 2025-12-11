import { Link, useLocation } from 'react-router-dom';
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  const navLinks = [
    // { name: 'Idioms', path: '/idioms' },
    // { name: 'Phrasal Verbs', path: '/phrasal-verbs' },
    // { name: 'Test', path: '/test' },
    { name: 'Learn', path: '/learn' },
  ];

  return (
    <div className="sticky top-0 z-50 w-full border-b border-surface-border bg-background-dark/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3 text-white transition-opacity hover:opacity-80 cursor-pointer">
          <div className="flex items-center justify-center size-10 rounded-full bg-surface-highlight text-primary">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <h2 className="text-xl font-bold leading-tight tracking-tight">EnglishHub</h2>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                pathname === link.path
                  ? "text-primary shadow-[0_1px_0_0_currentColor]"
                  : "text-gray-300 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-3 items-center">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-300 hover:text-white hover:bg-white/10">
                  <User className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-surface-dark border-surface-border text-white">
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer focus:bg-white/10 focus:text-white">
                  <LogOut className="mr-2 size-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth?mode=login" className="hidden sm:flex h-10 items-center justify-center rounded-full px-5 text-sm font-bold text-white transition-colors hover:text-primary">
                Login
              </Link>
              <Link to="/auth?mode=signup" className="group relative flex h-10 items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-background-dark text-sm font-bold shadow-[0_0_15px_rgba(54,226,123,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(54,226,123,0.5)]">
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 transition-transform duration-300 ease-out skew-x-12 origin-left"></div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
