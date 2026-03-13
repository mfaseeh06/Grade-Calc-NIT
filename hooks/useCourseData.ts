import { useState, useEffect, useCallback } from 'react';
import { Course, Semester } from '@/lib/calculations';
import { calculateCourseGPA } from '@/lib/calculations';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'nit-gpa-calculator-semesters';

export function useCourseData() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSemesters(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load semesters from localStorage:', error);
      }
    } else {
      // Initialize with one empty semester
      setSemesters([
        {
          id: uuidv4(),
          name: 'Semester 1',
          courses: [],
        },
      ]);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever semesters change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters));
    }
  }, [semesters, isLoaded]);

  const addSemester = useCallback((semesterName?: string) => {
    setSemesters((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: semesterName || `Semester ${prev.length + 1}`,
        courses: [],
      },
    ]);
  }, []);

  const deleteSemester = useCallback((semesterId: string) => {
    setSemesters((prev) => prev.filter((sem) => sem.id !== semesterId));
  }, []);

  const addCourse = useCallback(
    (semesterId: string, courseData: Omit<Course, 'id' | 'semesterId' | 'grade' | 'gpaValue'>) => {
      const gradeResult = calculateCourseGPA(courseData.marks);
      if (!gradeResult) {
        console.error('Invalid marks for grading');
        return;
      }

      const newCourse: Course = {
        id: uuidv4(),
        semesterId,
        name: courseData.name,
        credits: courseData.credits,
        marks: courseData.marks,
        grade: gradeResult.grade,
        gpaValue: gradeResult.gpaValue,
      };

      setSemesters((prev) =>
        prev.map((sem) =>
          sem.id === semesterId
            ? {
                ...sem,
                courses: [...sem.courses, newCourse],
              }
            : sem
        )
      );
    },
    []
  );

  const updateCourse = useCallback(
    (semesterId: string, courseId: string, updates: Partial<Omit<Course, 'id' | 'semesterId'>>) => {
      setSemesters((prev) =>
        prev.map((sem) =>
          sem.id === semesterId
            ? {
                ...sem,
                courses: sem.courses.map((course) => {
                  if (course.id !== courseId) return course;

                  const updatedCourse = { ...course, ...updates };

                  // Recalculate grade if marks changed
                  if (updates.marks !== undefined) {
                    const gradeResult = calculateCourseGPA(updates.marks);
                    if (gradeResult) {
                      updatedCourse.grade = gradeResult.grade;
                      updatedCourse.gpaValue = gradeResult.gpaValue;
                    }
                  }

                  return updatedCourse;
                }),
              }
            : sem
        )
      );
    },
    []
  );

  const deleteCourse = useCallback((semesterId: string, courseId: string) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === semesterId
          ? {
              ...sem,
              courses: sem.courses.filter((course) => course.id !== courseId),
            }
          : sem
      )
    );
  }, []);

  return {
    semesters,
    isLoaded,
    addSemester,
    deleteSemester,
    addCourse,
    updateCourse,
    deleteCourse,
  };
}
