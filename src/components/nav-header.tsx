"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

export function NavHeader() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/applications', label: 'Applications' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <header className="sticky top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        <div className="flex-shrink-0">
          <h1 className="text-xl font-semibold text-white">MS Applications Dashboard</h1>
        </div>
        
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center space-x-8 text-sm font-medium list-none">
            {navLinks.map(link => {
              const active = pathname === link.href;
              return (
                <li key={link.href} className="py-2">
                  <Link
                    href={link.href}
                    className={`relative px-1 py-2 overflow-hidden no-underline transition-colors ${
                      active ? 'text-white visited:text-white' : 'text-slate-400 visited:text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-white rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="flex items-center ml-4">
          <ThemeToggle />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden py-4 px-6 border-t border-slate-800/50 backdrop-blur-md bg-gradient-to-b from-slate-900/95 to-slate-950/95">
        <ul className="flex justify-around items-center text-xs font-medium list-none">
          {navLinks.map(link => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="text-center relative group">
                <Link
                  href={link.href}
                  className={`flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                    active 
                      ? 'bg-gradient-to-br from-blue-500/30 to-purple-600/30 text-white shadow-lg shadow-blue-700/20 border border-blue-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/30 hover:scale-105 hover:shadow-md hover:shadow-blue-700/10 border border-transparent hover:border-blue-500/10'
                  }`}
                >
                  {/* Icon with animated glow effect */}
                  <div className={`relative flex items-center justify-center w-8 h-8 mb-2 rounded-full ${
                    active 
                      ? 'bg-blue-600/20 animate-glow' 
                      : 'bg-slate-800/30 group-hover:bg-blue-900/20'
                  } transition-all duration-300`}>
                    <span className={`inline-block text-lg transform transition-all duration-300 ${
                      active 
                        ? 'text-blue-400 scale-110' 
                        : 'text-slate-400 group-hover:text-blue-300 group-hover:scale-110'
                    }`}>
                      {link.label === 'Overview' && '📊'}
                      {link.label === 'Applications' && '📝'}
                      {link.label === 'Analytics' && '📈'}
                      {link.label === 'Settings' && '⚙️'}
                    </span>
                    {active && (
                      <span className="absolute inset-0 rounded-full animate-pulse bg-blue-400/20 backdrop-blur-sm"></span>
                    )}
                  </div>
                  
                  {/* Label text */}
                  <span className={`text-base font-medium transition-all duration-300 ${
                    active 
                      ? 'text-white font-semibold' 
                      : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                  
                  {/* Active indicator */}
                  {active ? (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full shadow-sm shadow-blue-400/30"></span>
                  ) : (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-300 group-hover:w-8 opacity-0 group-hover:opacity-100"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
} 