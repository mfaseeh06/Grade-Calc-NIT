'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AssessmentBreakdown,
  WeightageConfig,
  NIT_DEFAULT_WEIGHTAGE,
  calculateFinalMarksFromBreakdown,
  calculateComponentAverage,
} from '@/lib/calculations';
import { WeightageConfiguration } from './WeightageConfiguration';
import { AssessmentInput } from './AssessmentInput';
import { BookOpen, FileText, Zap, Trophy } from 'lucide-react';

interface MarksBreakdownCalculatorProps {
  onFinalMarksChange: (marks: number) => void;
  initialBreakdown?: AssessmentBreakdown;
  initialWeightage?: WeightageConfig;
}

export function MarksBreakdownCalculator({
  onFinalMarksChange,
  initialBreakdown,
  initialWeightage,
}: MarksBreakdownCalculatorProps) {
  const [breakdown, setBreakdown] = useState<AssessmentBreakdown>(
    initialBreakdown || {
      assignments: { marks: [], maxMarks: 10 },
      quizzes: { marks: [], maxMarks: 10 },
      midterm: { marks: 0, maxMarks: 30 },
      final: { marks: 0, maxMarks: 40 },
      participation: { marks: 0, maxMarks: 10 },
    }
  );

  const [weightage, setWeightage] = useState<WeightageConfig>(initialWeightage || NIT_DEFAULT_WEIGHTAGE);

  // Calculate final marks whenever breakdown or weightage changes
  const finalMarks = calculateFinalMarksFromBreakdown(breakdown, weightage);

  // Notify parent of final marks change using useEffect
  useEffect(() => {
    if (onFinalMarksChange) {
      onFinalMarksChange(finalMarks);
    }
  }, [finalMarks, onFinalMarksChange]);

  const handleResetAll = () => {
    setBreakdown({
      assignments: { marks: [], maxMarks: 10 },
      quizzes: { marks: [], maxMarks: 10 },
      midterm: { marks: 0, maxMarks: 30 },
      final: { marks: 0, maxMarks: 40 },
      participation: { marks: 0, maxMarks: 10 },
    });
    setWeightage(NIT_DEFAULT_WEIGHTAGE);
  };

  // Calculate component scores
  const assignmentScore = (calculateComponentAverage(breakdown.assignments.marks, breakdown.assignments.maxMarks) / (Number(breakdown.assignments.maxMarks) || 1)) * 100;
  const quizScore = (calculateComponentAverage(breakdown.quizzes.marks, breakdown.quizzes.maxMarks) / (Number(breakdown.quizzes.maxMarks) || 1)) * 100;
  const midtermScore = (Number(breakdown.midterm.marks) / (Number(breakdown.midterm.maxMarks) || 1)) * 100;
  const finalScore = (Number(breakdown.final.marks) / (Number(breakdown.final.maxMarks) || 1)) * 100;
  const participationScore = breakdown.participation ? (Number(breakdown.participation.marks) / (Number(breakdown.participation.maxMarks) || 1)) * 100 : 0;

  const config = weightage.useCustomWeightage ? weightage : NIT_DEFAULT_WEIGHTAGE;

  return (
    <div className="space-y-6">
      {/* Weightage Configuration */}
      <WeightageConfiguration value={weightage} onChange={setWeightage} />

      {/* Tabs for Assessment Input */}
      <Tabs defaultValue="assignments" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="assignments" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Assignments</span>
            <span className="sm:hidden">Assign</span>
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Quizzes</span>
            <span className="sm:hidden">Quiz</span>
          </TabsTrigger>
          <TabsTrigger value="midterm" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Midterm</span>
            <span className="sm:hidden">Mid</span>
          </TabsTrigger>
          <TabsTrigger value="final" className="text-xs sm:text-sm">
            Final
          </TabsTrigger>
          <TabsTrigger value="participation" className="text-xs sm:text-sm">
            <span className="hidden sm:inline">Participation</span>
            <span className="sm:hidden">Part</span>
          </TabsTrigger>
        </TabsList>

        {/* Assignments */}
        <TabsContent value="assignments">
          <AssessmentInput
            title="Assignment"
            description="Add marks for each assignment. Multiple assignments can be added."
            marks={breakdown.assignments.marks}
            maxMarks={breakdown.assignments.maxMarks}
            onMarksChange={(marks) => setBreakdown({ ...breakdown, assignments: { ...breakdown.assignments, marks } })}
            onMaxMarksChange={(maxMarks) => setBreakdown({ ...breakdown, assignments: { ...breakdown.assignments, maxMarks } })}
            icon={<FileText className="w-5 h-5" />}
            allowMultiple={true}
          />
        </TabsContent>

        {/* Quizzes */}
        <TabsContent value="quizzes">
          <AssessmentInput
            title="Quiz"
            description="Add marks for each quiz. Multiple quizzes can be added."
            marks={breakdown.quizzes.marks}
            maxMarks={breakdown.quizzes.maxMarks}
            onMarksChange={(marks) => setBreakdown({ ...breakdown, quizzes: { ...breakdown.quizzes, marks } })}
            onMaxMarksChange={(maxMarks) => setBreakdown({ ...breakdown, quizzes: { ...breakdown.quizzes, maxMarks } })}
            icon={<Zap className="w-5 h-5" />}
            allowMultiple={true}
          />
        </TabsContent>

        {/* Midterm */}
        <TabsContent value="midterm">
          <AssessmentInput
            title="Midterm Exam"
            description="Enter your midterm examination marks."
            marks={[breakdown.midterm.marks]}
            maxMarks={breakdown.midterm.maxMarks}
            onMarksChange={(marks) => setBreakdown({ ...breakdown, midterm: { ...breakdown.midterm, marks: marks[0] ?? '' } })}
            onMaxMarksChange={(maxMarks) => setBreakdown({ ...breakdown, midterm: { ...breakdown.midterm, maxMarks } })}
            icon={<BookOpen className="w-5 h-5" />}
            allowMultiple={false}
          />
        </TabsContent>

        {/* Final */}
        <TabsContent value="final">
          <AssessmentInput
            title="Final Exam"
            description="Enter your final examination marks."
            marks={[breakdown.final.marks]}
            maxMarks={breakdown.final.maxMarks}
            onMarksChange={(marks) => setBreakdown({ ...breakdown, final: { ...breakdown.final, marks: marks[0] ?? '' } })}
            onMaxMarksChange={(maxMarks) => setBreakdown({ ...breakdown, final: { ...breakdown.final, maxMarks } })}
            icon={<Trophy className="w-5 h-5" />}
            allowMultiple={false}
          />
        </TabsContent>

        {/* Participation */}
        <TabsContent value="participation">
          <AssessmentInput
            title="Participation/Attendance"
            description="Enter your class participation and attendance marks."
            marks={[breakdown.participation?.marks ?? 0]}
            maxMarks={breakdown.participation?.maxMarks || 10}
            onMarksChange={(marks) => setBreakdown({ ...breakdown, participation: { marks: marks[0] ?? '', maxMarks: breakdown.participation?.maxMarks || 10 } })}
            onMaxMarksChange={(maxMarks) => setBreakdown({ ...breakdown, participation: { ...breakdown.participation!, maxMarks } })}
            allowMultiple={false}
          />
        </TabsContent>
      </Tabs>

      {/* Final Marks Display */}
      <Card className="p-6 border-secondary bg-gradient-to-br from-card to-muted border-2 border-secondary">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {/* Assignment Component */}
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Assignments</p>
              <p className="text-2xl font-black text-foreground">{assignmentScore.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">× {config.assignmentWeight}%</p>
            </div>

            {/* Quiz Component */}
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Quizzes</p>
              <p className="text-2xl font-black text-foreground">{quizScore.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">× {config.quizWeight}%</p>
            </div>

            {/* Midterm Component */}
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Midterm</p>
              <p className="text-2xl font-black text-foreground">{midtermScore.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">× {config.midtermWeight}%</p>
            </div>

            {/* Final Component */}
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Final</p>
              <p className="text-2xl font-black text-foreground">{finalScore.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">× {config.finalWeight}%</p>
            </div>

            {/* Participation Component */}
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">Participation</p>
              <p className="text-2xl font-black text-foreground">{participationScore.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground mt-1">× {config.participationWeight || 0}%</p>
            </div>
          </div>

          {/* Final Score */}
          <div className="border-t border-border pt-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide font-semibold">Final Marks</p>
                <p className="text-5xl md:text-6xl font-black text-secondary mt-1">{finalMarks.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-2">Out of 100</p>
              </div>
              <Button onClick={handleResetAll} variant="outline" className="btn-smooth">
                Reset All
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
