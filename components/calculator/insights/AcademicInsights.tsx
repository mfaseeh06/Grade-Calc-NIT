'use client';

import { Semester } from '@/lib/calculations';
import { FutureSimulator } from './FutureSimulator';
import { TargetGPACalculator } from './TargetGPACalculator';
import { ScenarioComparison } from './ScenarioComparison';

interface AcademicInsightsProps {
  semesters: Semester[];
  cgpa: number;
  statistics: { totalCredits: number; avgMarks: number };
}

export function AcademicInsights({ semesters, cgpa, statistics }: AcademicInsightsProps) {
  // If no semesters exist, show an empty state to encourage data entry first
  if (semesters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-muted/20 border border-dashed border-border rounded-xl">
        <h3 className="text-xl font-bold text-foreground mb-2">No Data Available</h3>
        <p className="text-sm text-muted-foreground max-w-md text-center">
          Please add at least one semester with courses in the "Semesters Input" tab to begin using the Academic Insights tools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Title block */}
      <div>
        <h2 className="text-3xl font-black text-foreground mb-1">Academic Insights</h2>
        <p className="text-muted-foreground">Plan ahead, simulate your grades, and find out what you need to hit your target CGPA.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FutureSimulator semesters={semesters} currentCGPA={cgpa} totalCredits={statistics.totalCredits} />
        <TargetGPACalculator currentCGPA={cgpa} totalCredits={statistics.totalCredits} />
      </div>

      <div className="w-full">
        <ScenarioComparison semesters={semesters} currentCGPA={cgpa} totalCredits={statistics.totalCredits} />
      </div>
    </div>
  );
}
