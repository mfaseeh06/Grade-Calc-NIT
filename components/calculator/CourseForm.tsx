'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { MarksBreakdownCalculator } from './MarksBreakdownCalculator';

interface CourseFormProps {
  onSubmit: (courseData: { name: string; credits: number; marks: number }) => void;
  onCancel: () => void;
  initialData?: { name: string; credits: number; marks: number };
  isEditing?: boolean;
}

export function CourseForm({ onSubmit, onCancel, initialData, isEditing = false }: CourseFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    credits: String(initialData?.credits ?? 4),
    marks: String(initialData?.marks ?? 0),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [useBreakdown, setUseBreakdown] = useState(false);
  const [breakdownMarks, setBreakdownMarks] = useState(0);
  const [expandedBreakdown, setExpandedBreakdown] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }

    if (formData.credits === '' || Number(formData.credits) <= 0 || Number(formData.credits) > 10) {
      newErrors.credits = 'Credits must be between 1 and 10';
    }

    if (formData.marks === '' || Number(formData.marks) < 0 || Number(formData.marks) > 100) {
      newErrors.marks = 'Marks must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const finalMarks = useBreakdown ? breakdownMarks : Number(formData.marks);
      onSubmit({ 
        name: formData.name, 
        credits: Number(formData.credits), 
        marks: finalMarks 
      });
      if (!isEditing) {
        setFormData({ name: '', credits: '4', marks: '0' });
        setBreakdownMarks(0);
        setUseBreakdown(false);
      }
    }
  };

  return (
    <Card className="p-6 border-secondary bg-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-foreground">Course Name</label>
            <Input
              type="text"
              placeholder="e.g., Data Structures"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-foreground">Credits</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                className="bg-input border-border text-foreground"
              />
              {errors.credits && <p className="text-red-500 text-xs mt-1">{errors.credits}</p>}
            </div>

            {!useBreakdown && (
              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">Marks (0-100)</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.marks}
                  onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                  className="bg-input border-border text-foreground"
                />
                {errors.marks && <p className="text-red-500 text-xs mt-1">{errors.marks}</p>}
              </div>
            )}

            {useBreakdown && (
              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">Calculated Marks</label>
                <div className="bg-muted/50 border border-border rounded-lg p-3 flex items-center justify-center">
                  <span className="text-2xl font-black text-secondary">{breakdownMarks.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Marks Input Mode Toggle */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              id="useBreakdown"
              checked={useBreakdown}
              onChange={(e) => {
                setUseBreakdown(e.target.checked);
                setExpandedBreakdown(e.target.checked);
              }}
              className="w-4 h-4 rounded border-border cursor-pointer"
            />
            <label htmlFor="useBreakdown" className="text-sm font-semibold text-foreground cursor-pointer">
              Use detailed breakdown for marks calculation
            </label>
          </div>

          {useBreakdown && (
            <div className="bg-muted/30 p-3 rounded-lg text-xs text-muted-foreground">
              Enable this option to calculate your final marks based on individual assignments, quizzes, midterm, and final exam with customizable weightage.
            </div>
          )}
        </div>

        {/* Detailed Breakdown Calculator */}
        {useBreakdown && (
          <div className="border-t border-border pt-4 space-y-4">
            <button
              type="button"
              onClick={() => setExpandedBreakdown(!expandedBreakdown)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <span className="font-semibold text-foreground">Assessment Breakdown Details</span>
              {expandedBreakdown ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              )}
            </button>

            {expandedBreakdown && (
              <div className="space-y-4">
                <MarksBreakdownCalculator onFinalMarksChange={setBreakdownMarks} />
              </div>
            )}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-bold btn-smooth">
            {isEditing ? 'Update Course' : 'Add Course'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="px-4 border-border hover:bg-muted btn-smooth"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
