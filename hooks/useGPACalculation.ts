import { useMemo } from 'react';
import { Course, Semester, calculateSemesterGPA, calculateCGPA, getStatistics } from '@/lib/calculations';

export function useGPACalculation(semesters: Semester[]) {
  const semesterGPAs = useMemo(() => {
    return semesters.map((semester) => ({
      semesterId: semester.id,
      semesterName: semester.name,
      gpa: calculateSemesterGPA(semester.courses),
      courseCount: semester.courses.length,
    }));
  }, [semesters]);

  const cgpa = useMemo(() => calculateCGPA(semesters), [semesters]);

  const statistics = useMemo(() => getStatistics(semesters), [semesters]);

  return {
    semesterGPAs,
    cgpa,
    statistics,
  };
}
