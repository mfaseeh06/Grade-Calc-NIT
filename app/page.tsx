'use client';

import { MainCalculator } from '@/components/calculator/MainCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 px-4 border-b-4 border-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-10 bg-secondary rounded-full" />
            <h1 className="text-4xl md:text-5xl font-black">NIT GPA Calculator</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">
            Calculate your GPA and CGPA according to NIT's official grading policy. All your data is stored locally and never shared.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <MainCalculator />
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
