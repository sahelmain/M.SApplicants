"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { NavHeader } from '@/components/nav-header';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NavHeader />
          <main className="pt-[4.5rem]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
} 