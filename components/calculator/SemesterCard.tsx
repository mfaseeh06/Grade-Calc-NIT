'use client';

import { useState } from 'react';
import { Semester, Course } from '@/lib/calculations';
import { calculateSemesterGPA } from '@/lib/calculations';
import { CourseForm } from './CourseForm';
import { CourseList } from './CourseList';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface SemesterCardProps {
  semester: Semester;
  onAddCourse: (semesterId: string, courseData: Omit<Course, 'id' | 'semesterId' | 'grade' | 'gpaValue'>) => void;
  onUpdateCourse: (semesterId: string, courseId: string, updates: Partial<Omit<Course, 'id' | 'semesterId'>>) => void;
  onDeleteCourse: (semesterId: string, courseId: string) => void;
  onDeleteSemester: (semesterId: string) => void;
}

export function SemesterCard({
  semester,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onDeleteSemester,
}: SemesterCardProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const gpa = calculateSemesterGPA(semester.courses);

  const handleAddCourse = (courseData: Omit<Course, 'id' | 'semesterId' | 'grade' | 'gpaValue'>) => {
    onAddCourse(semester.id, courseData);
    setShowForm(false);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleUpdateCourse = (courseData: Omit<Course, 'id' | 'semesterId' | 'grade' | 'gpaValue'>) => {
    if (editingCourse) {
      onUpdateCourse(semester.id, editingCourse.id, {
        name: courseData.name,
        credits: courseData.credits,
        marks: courseData.marks,
      });
      setEditingCourse(null);
      setShowForm(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  return (
    <Card className="p-6 border-border bg-card border-l-4 border-l-secondary shadow-md hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground">{semester.name}</h3>
          <p className="text-sm text-muted-foreground mt-2">{semester.courses.length} {semester.courses.length === 1 ? 'course' : 'courses'} • Credits: {semester.courses.reduce((sum, c) => sum + c.credits, 0)}</p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4">
          <div className="text-left md:text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Semester GPA</p>
            <p className="text-4xl font-black text-secondary">{gpa.toFixed(2)}</p>
          </div>

          <Button
            onClick={() => onDeleteSemester(semester.id)}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 btn-smooth"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Course List or Form */}
      <div className="mb-4">
        {showForm ? (
          <CourseForm
            onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse}
            onCancel={handleCancelForm}
            initialData={
              editingCourse
                ? {
                    name: editingCourse.name,
                    credits: editingCourse.credits,
                    marks: editingCourse.marks,
                  }
                : undefined
            }
            isEditing={!!editingCourse}
          />
        ) : (
          <CourseList
            courses={semester.courses}
            onEdit={handleEditCourse}
            onDelete={(courseId) => onDeleteCourse(semester.id, courseId)}
          />
        )}
      </div>

      {/* Add Course Button */}
      {!showForm && (
        <Button
          onClick={() => {
            setEditingCourse(null);
            setShowForm(true);
          }}
          className="w-full bg-secondary hover:bg-secondary/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      )}
    </Card>
  );
}
