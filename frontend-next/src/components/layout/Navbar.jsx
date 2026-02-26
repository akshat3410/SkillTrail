'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Layout, User } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  
  // Hide global nav on immersive pages (Roadmap Detail, Lesson)
  // They have their own headers.
  if (pathname.startsWith('/roadmap/') || pathname.startsWith('/lesson/')) {
    return null;
  }

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/roadmaps', icon: Compass, label: 'Explore' },
    { href: '/dashboard', icon: Layout, label: 'Dashboard' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-6 md:top-6 md:bottom-auto left-1/2 -translate-x-1/2 z-50 bg-graphite/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center space-x-2 md:space-x-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
       {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
             <Link 
               key={item.href} 
               href={item.href}
               className={clsx(
                  "relative px-4 py-2 rounded-full flex items-center transition-colors group",
                  isActive ? "text-void-black" : "text-muted hover:text-white"
               )}
             >
                {isActive && (
                   <motion.div 
                     layoutId="nav-pill"
                     className="absolute inset-0 bg-volt rounded-full"
                     transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                   />
                )}
                <span className="relative z-10 flex items-center space-x-2">
                   <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                   <span className={clsx("hidden md:inline font-mono font-bold text-sm", isActive ? "block" : "hidden")}>
                      {item.label}
                   </span>
                </span>
             </Link>
          );
       })}
    </nav>
  );
}
