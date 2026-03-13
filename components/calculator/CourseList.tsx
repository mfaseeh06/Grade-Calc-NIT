'use client';

import { Course } from '@/lib/calculations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getGradeColor, getGradeBgColor } from '@/lib/gradePolicy';
import { Trash2, Edit2 } from 'lucide-react';

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

export function CourseList({ courses, onEdit, onDelete }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No courses added yet. Add a course to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="p-4 border-border bg-card hover:bg-muted/50 transition-all duration-200 card-hover"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-2 text-lg">{course.name}</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-muted-foreground">Credits: <span className="text-foreground font-semibold">{course.credits}</span></span>
                <span className="text-muted-foreground">Marks: <span className="text-foreground font-semibold">{course.marks}%</span></span>
                <span className="text-muted-foreground">GPA: <span className="text-secondary font-bold">{course.gpaValue.toFixed(2)}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-between md:justify-end">
              <div className={`px-4 py-2 rounded-lg font-bold text-sm grade-badge ${getGradeBgColor(course.grade)} ${getGradeColor(course.grade)}`}>
                {course.grade}
              </div>

              <Button
                onClick={() => onEdit(course)}
                variant="ghost"
                size="sm"
                className="text-secondary hover:text-secondary hover:bg-secondary/10 btn-smooth"
              >
                <Edit2 className="w-4 h-4" />
              </Button>

              <Button
                onClick={() => onDelete(course.id)}
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 btn-smooth"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
