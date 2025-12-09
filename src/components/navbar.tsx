import * as React from 'react';
import { cn } from '@/lib/utils';
import { downloadWordsAsJson } from '@/lib/data-management';
import { HomeIcon, BookOpenIcon, DownloadIcon } from 'lucide-react';
import {type  WordData } from '@/types/data';

// Assuming shadcn components are available
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';

interface NavbarProps {
    activeRoute: string;
    setActiveRoute: (route: 'home' | 'tracker') => void;
    words: WordData[];
}

const Navbar: React.FC<NavbarProps> = ({ activeRoute, setActiveRoute, words }) => {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-gray-900">Vocab Tracker</h1>
                </div>

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={cn("px-4 py-2 cursor-pointer", activeRoute === 'home' && 'font-semibold text-blue-600 bg-blue-50/70 rounded-md')}
                                onClick={() => setActiveRoute('home')}
                            >
                                <HomeIcon className="mr-2 h-4 w-4" /> Home
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={cn("px-4 py-2 cursor-pointer", activeRoute === 'tracker' && 'font-semibold text-blue-600 bg-blue-50/70 rounded-md')}
                                onClick={() => setActiveRoute('tracker')}
                            >
                                <BookOpenIcon className="mr-2 h-4 w-4" /> Tracker
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadWordsAsJson(words, 'learned')}
                        title="Download Learned Words as JSON"
                    >
                        <DownloadIcon className="h-4 w-4 mr-1" /> Learned JSON
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadWordsAsJson(words, 'have to learn')}
                        title="Download Words To Learn as JSON"
                    >
                        <DownloadIcon className="h-4 w-4 mr-1" /> To Learn JSON
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
