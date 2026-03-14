import { getGradeFromPercentage } from './gradePolicy';

/**
 * Assessment breakdown structure for detailed marks input
 */
export interface AssessmentBreakdown {
  assignments: {
    marks: (number | string)[];
    maxMarks: number | string;
  };
  quizzes: {
    marks: (number | string)[];
    maxMarks: number | string;
  };
  midterm: {
    marks: number | string;
    maxMarks: number | string;
  };
  final: {
    marks: number | string;
    maxMarks: number | string;
  };
  participation?: {
    marks: number | string;
    maxMarks: number | string;
  };
}

/**
 * Custom weightage configuration
 */
export interface WeightageConfig {
  useCustomWeightage: boolean;
  assignmentWeight: number; // 0-100
  quizWeight: number; // 0-100
  midtermWeight: number; // 0-100
  finalWeight: number; // 0-100
  participationWeight?: number; // 0-100, optional
}

/**
 * Default NIT weightage configuration
 */
export const NIT_DEFAULT_WEIGHTAGE: WeightageConfig = {
  useCustomWeightage: false,
  assignmentWeight: 10,
  quizWeight: 20,
  midtermWeight: 30,
  finalWeight: 40,
  participationWeight: 0,
};

export interface Course {
  id: string;
  semesterId: string;
  name: string;
  credits: number;
  marks: number;
  grade: string;
  gpaValue: number;
  assessmentBreakdown?: AssessmentBreakdown;
  weightageConfig?: WeightageConfig;
}

export interface Semester {
  id: string;
  name: string;
  courses: Course[];
}

/**
 * Calculate GPA for a single course
 */
export function calculateCourseGPA(marks: number): { grade: string; gpaValue: number } | null {
  return getGradeFromPercentage(marks);
}

/**
 * Calculate semester GPA
 * Formula: GPA = Σ(Grade Point × Credits) / Σ(Credits)
 */
export function calculateSemesterGPA(courses: Course[]): number {
  if (courses.length === 0) return 0;

  const totalGradePoints = courses.reduce((sum, course) => {
    return sum + course.gpaValue * course.credits;
  }, 0);

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

  if (totalCredits === 0) return 0;

  return Math.round((totalGradePoints / totalCredits) * 100) / 100;
}

/**
 * Calculate CGPA across all semesters
 * Formula: CGPA = Σ(Grade Point × Credits across all courses) / Σ(All Credits)
 */
export function calculateCGPA(semesters: Semester[]): number {
  const allCourses = semesters.flatMap((sem) => sem.courses);

  if (allCourses.length === 0) return 0;

  const totalGradePoints = allCourses.reduce((sum, course) => {
    return sum + course.gpaValue * course.credits;
  }, 0);

  const totalCredits = allCourses.reduce((sum, course) => sum + course.credits, 0);

  if (totalCredits === 0) return 0;

  return Math.round((totalGradePoints / totalCredits) * 100) / 100;
}

/**
 * Get statistics for all courses
 */
export function getStatistics(semesters: Semester[]): {
  totalCourses: number;
  totalCredits: number;
  avgMarks: number;
  passingCourses: number;
  failingCourses: number;
} {
  const allCourses = semesters.flatMap((sem) => sem.courses);

  const totalCourses = allCourses.length;
  const totalCredits = allCourses.reduce((sum, course) => sum + course.credits, 0);
  const avgMarks = totalCourses > 0 ? Math.round((allCourses.reduce((sum, course) => sum + course.marks, 0) / totalCourses) * 100) / 100 : 0;
  const passingCourses = allCourses.filter((course) => course.marks >= 60).length;
  const failingCourses = allCourses.filter((course) => course.marks < 60).length;

  return { totalCourses, totalCredits, avgMarks, passingCourses, failingCourses };
}

/**
 * Validate weightage configuration
 * Returns { valid: true } if valid, or { valid: false, error: string } if invalid
 */
export function validateWeightageConfig(config: WeightageConfig): { valid: boolean; error?: string } {
  if (!config.useCustomWeightage) {
    return { valid: true };
  }

  const totalWeight =
    (config.assignmentWeight || 0) +
    (config.quizWeight || 0) +
    (config.midtermWeight || 0) +
    (config.finalWeight || 0) +
    (config.participationWeight || 0);

  if (Math.abs(totalWeight - 100) > 0.01) {
    return { valid: false, error: `Weightages must sum to 100% (current: ${totalWeight.toFixed(1)}%)` };
  }

  if (config.assignmentWeight < 0 || config.quizWeight < 0 || config.midtermWeight < 0 || config.finalWeight < 0) {
    return { valid: false, error: 'All weightages must be >= 0%' };
  }

  return { valid: true };
}

/**
 * Calculate component averages from individual marks
 */
export function calculateComponentAverage(marks: (number | string)[], maxMarks: number | string): number {
  if (marks.length === 0) return 0;
  const average = marks.reduce((sum: number, mark) => sum + (Number(mark) || 0), 0) / marks.length;
  return Math.min(average, Number(maxMarks) || 0); // Ensure doesn't exceed max
}

/**
 * Calculate final marks based on assessment breakdown and weightage
 */
export function calculateFinalMarksFromBreakdown(
  breakdown: AssessmentBreakdown,
  weightage: WeightageConfig
): number {
  const assignmentAvg = calculateComponentAverage(breakdown.assignments.marks, breakdown.assignments.maxMarks);
  const quizAvg = calculateComponentAverage(breakdown.quizzes.marks, breakdown.quizzes.maxMarks);
  const midtermScore = Number(breakdown.midterm.marks) || 0;
  const finalScore = Number(breakdown.final.marks) || 0;
  const participationScore = Number(breakdown.participation?.marks) || 0;

  // Normalize all scores to 0-100 scale
  const assignmentNormalized = (assignmentAvg / (Number(breakdown.assignments.maxMarks) || 1)) * 100;
  const quizNormalized = (quizAvg / (Number(breakdown.quizzes.maxMarks) || 1)) * 100;
  const midtermNormalized = (midtermScore / (Number(breakdown.midterm.maxMarks) || 1)) * 100;
  const finalNormalized = (finalScore / (Number(breakdown.final.maxMarks) || 1)) * 100;
  const participationNormalized = breakdown.participation ? (participationScore / (Number(breakdown.participation.maxMarks) || 1)) * 100 : 0;

  const config = weightage.useCustomWeightage ? weightage : NIT_DEFAULT_WEIGHTAGE;

  const finalMarks =
    (assignmentNormalized * (config.assignmentWeight / 100)) +
    (quizNormalized * (config.quizWeight / 100)) +
    (midtermNormalized * (config.midtermWeight / 100)) +
    (finalNormalized * (config.finalWeight / 100)) +
    (participationNormalized * ((config.participationWeight || 0) / 100));

  return Math.round(finalMarks * 100) / 100;
}

/**
 * Get NIT default weightage
 */
export function getNITDefaultWeightage(): WeightageConfig {
  return { ...NIT_DEFAULT_WEIGHTAGE };
}
