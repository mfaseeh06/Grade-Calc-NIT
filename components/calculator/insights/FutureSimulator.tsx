'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, TrendingUp, Sparkles, MoveRight } from 'lucide-react';
import { calculateCourseGPA, Semester } from '@/lib/calculations';

interface FutureCourse {
  id: string;
  name: string;
  credits: number;
  marks: number;
}

interface FutureSimulatorProps {
  semesters: Semester[];
  currentCGPA: number;
  totalCredits: number;
}

export function FutureSimulator({ currentCGPA, totalCredits }: FutureSimulatorProps) {
  const [plannedCourses, setPlannedCourses] = useState<FutureCourse[]>([]);
  const [formData, setFormData] = useState({ name: '', credits: '', marks: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedCourses = localStorage.getItem('gradecalc_future_courses');
    const savedForm = localStorage.getItem('gradecalc_future_form');
    if (savedCourses) {
      try { setPlannedCourses(JSON.parse(savedCourses)); } catch (e) {}
    }
    if (savedForm) {
      try { setFormData(JSON.parse(savedForm)); } catch (e) {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gradecalc_future_courses', JSON.stringify(plannedCourses));
      localStorage.setItem('gradecalc_future_form', JSON.stringify(formData));
    }
  }, [plannedCourses, formData, mounted]);

  const addCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const credits = Number(formData.credits) || 0;
    const marks = Number(formData.marks) || 0;
    
    if (credits <= 0 || marks < 0 || marks > 100) return;
    
    setPlannedCourses([
      ...plannedCourses,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || `Course ${plannedCourses.length + 1}`,
        credits,
        marks,
      }
    ]);
    
    setFormData({ name: '', credits: '', marks: '' });
  };

  const removeCourse = (id: string) => {
    setPlannedCourses(plannedCourses.filter(c => c.id !== id));
  };

  // Calculate Projection
  const currentGradePoints = currentCGPA * totalCredits;
  
  let plannedGradePoints = 0;
  let plannedCredits = 0;
  
  plannedCourses.forEach(course => {
    const result = calculateCourseGPA(course.marks);
    if (result) {
      plannedGradePoints += result.gpaValue * course.credits;
      plannedCredits += course.credits;
    }
  });
  
  const projectedCGPA = (totalCredits + plannedCredits) > 0 
    ? (currentGradePoints + plannedGradePoints) / (totalCredits + plannedCredits) 
    : currentCGPA;

  const cgpaDiff = projectedCGPA - currentCGPA;
  const isPositive = cgpaDiff >= 0;

  return (
    <Card className="p-6 border-border bg-card shadow-sm h-full flex flex-col">
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <TrendingUp className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Future Simulator</h3>
          <p className="text-sm text-muted-foreground">Add tentative courses to see how they impact your CGPA.</p>
        </div>
      </div>

      <div className="bg-muted/30 rounded-xl p-4 mb-6 border border-border flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase font-semibold">Current CGPA</p>
          <p className="text-2xl font-black text-foreground">{currentCGPA.toFixed(2)}</p>
        </div>
        <MoveRight className="w-5 h-5 text-muted-foreground" />
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Projected CGPA</p>
          <div className="flex items-center gap-2 justify-end">
            <p className="text-3xl font-black text-secondary">{projectedCGPA.toFixed(2)}</p>
            {plannedCourses.length > 0 && cgpaDiff !== 0 && (
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {isPositive ? '+' : ''}{cgpaDiff.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto min-h-[150px] mb-6 space-y-2 pr-2">
        {plannedCourses.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-2">
            <Sparkles className="w-8 h-8" />
            <p className="text-sm">No courses planned yet. Add one below!</p>
          </div>
        ) : (
          plannedCourses.map((course) => {
            const gradeResult = calculateCourseGPA(course.marks);
            return (
              <div key={course.id} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg group">
                <div>
                  <p className="font-semibold text-sm">{course.name}</p>
                  <p className="text-xs text-muted-foreground">{course.credits} Credits • {course.marks} Marks ({gradeResult?.grade || '?'})</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeCourse(course.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            );
          })
        )}
      </div>

      <form onSubmit={addCourse} className="grid grid-cols-12 gap-2 mt-auto pt-4 border-t border-border">
        <div className="col-span-12 sm:col-span-5">
          <Input 
            placeholder="Course Name" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="h-9 text-sm bg-background border-border shadow-sm"
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <Input 
            type="number" 
            placeholder="Cr" 
            min="1" max="10"
            value={formData.credits} 
            onChange={e => setFormData({...formData, credits: e.target.value})}
            className="h-9 text-sm text-center bg-background border-border shadow-sm"
            title="Credits"
          />
        </div>
        <div className="col-span-4 sm:col-span-3">
          <Input 
            type="number" 
            placeholder="Marks" 
            min="0" max="100"
            value={formData.marks} 
            onChange={e => setFormData({...formData, marks: e.target.value})}
            className="h-9 text-sm text-center bg-background border-border shadow-sm"
            title="Expected Marks (0-100)"
          />
        </div>
        <div className="col-span-4 sm:col-span-2">
          <Button type="submit" size="sm" className="w-full h-9 bg-secondary">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
