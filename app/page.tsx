'use client';

import { useState, useEffect } from 'react';
import { MainCalculator } from '@/components/calculator/MainCalculator';
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground relative pt-[240px] md:pt-[260px]">
      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled
            ? 'py-3 md:py-4 shadow-md backdrop-blur-xl bg-background/85 border-b border-border'
            : 'py-12 md:py-16 bg-gradient-to-br from-primary via-primary/95 to-primary/80 border-b-4 border-secondary shadow-lg'
          }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col justify-center relative">

          {/* A cool decorative elements in background if not scrolled */}
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32 bg-secondary/20 blur-3xl rounded-full transition-opacity duration-500 pointer-events-none ${isScrolled ? 'opacity-0' : 'opacity-100'}`} />

          <div className="flex items-center justify-between">
            <div className={`flex items-center transition-all duration-500 ${isScrolled ? 'gap-2.5' : 'gap-3.5'}`}>
              <div className={`transition-all duration-500 bg-secondary rounded-full ${isScrolled ? 'w-1.5 h-6' : 'w-2 h-10 md:h-12'}`} />
              <h1 className={`font-black tracking-tight transition-all duration-500 ${isScrolled ? 'text-xl md:text-2xl text-foreground' : 'text-4xl md:text-5xl text-primary-foreground drop-shadow-sm'}`}>
                NIT GPA Calculator
              </h1>
            </div>
          </div>

          {/* Description shrinking away on scroll */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden origin-top ${isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-40 opacity-100 mt-5'}`}>
            <p className="text-primary-foreground/90 text-lg md:text-xl max-w-2xl font-medium leading-relaxed drop-shadow-sm">
              Calculate your GPA and CGPA according to NIT's official grading policy. All your data is stored locally safely on your device.
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <MainCalculator />
        <Analytics />
      </div>

      {/* Footer */}
      <div className="bg-card border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold text-foreground">NIT GPA Calculator</span> • Your data is saved locally on your device • Never shared or uploaded
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Made with support for NIT's grading policy
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Made by Muhammad Faseeh
          </p>
        </div>
      </div>
    </main>
  );
}
