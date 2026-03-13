export interface GradeEntry {
  grade: string;
  minPercentage: number;
  maxPercentage: number;
  gpaValue: number;
}

export const NIT_GRADE_POLICY: GradeEntry[] = [
  { grade: 'A+', minPercentage: 97, maxPercentage: 100, gpaValue: 4.33 },
  { grade: 'A', minPercentage: 94, maxPercentage: 96, gpaValue: 4.0 },
  { grade: 'A-', minPercentage: 90, maxPercentage: 93, gpaValue: 3.67 },
  { grade: 'B+', minPercentage: 87, maxPercentage: 89, gpaValue: 3.33 },
  { grade: 'B', minPercentage: 84, maxPercentage: 86, gpaValue: 3.0 },
  { grade: 'B-', minPercentage: 80, maxPercentage: 83, gpaValue: 2.67 },
  { grade: 'C+', minPercentage: 77, maxPercentage: 79, gpaValue: 2.33 },
  { grade: 'C', minPercentage: 70, maxPercentage: 76, gpaValue: 2.0 },
  { grade: 'D', minPercentage: 60, maxPercentage: 69, gpaValue: 1.0 },
  { grade: 'E', minPercentage: 0, maxPercentage: 59, gpaValue: 0.0 },
];

/**
 * Get grade and GPA value based on percentage marks
 */
export function getGradeFromPercentage(percentage: number): { grade: string; gpaValue: number } | null {
  const entry = NIT_GRADE_POLICY.find(
    (e) => percentage >= e.minPercentage && percentage <= e.maxPercentage
  );
  if (entry) {
    return { grade: entry.grade, gpaValue: entry.gpaValue };
  }
  return null;
}

/**
 * Get the color for a grade (for UI display)
 */
export function getGradeColor(grade: string): string {
  switch (grade) {
    case 'A+':
    case 'A':
    case 'A-':
      return 'text-green-400';
    case 'B+':
    case 'B':
    case 'B-':
      return 'text-blue-400';
    case 'C+':
    case 'C':
      return 'text-yellow-400';
    case 'D':
      return 'text-orange-400';
    case 'E':
      return 'text-red-500';
    default:
      return 'text-gray-400';
  }
}

/**
 * Get background color for a grade badge
 */
export function getGradeBgColor(grade: string): string {
  switch (grade) {
    case 'A+':
    case 'A':
    case 'A-':
      return 'bg-green-900';
    case 'B+':
    case 'B':
    case 'B-':
      return 'bg-blue-900';
    case 'C+':
    case 'C':
      return 'bg-yellow-900';
    case 'D':
      return 'bg-orange-900';
    case 'E':
      return 'bg-red-900';
    default:
      return 'bg-gray-800';
  }
}
