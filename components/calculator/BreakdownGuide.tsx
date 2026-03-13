'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, BookOpen, Lightbulb } from 'lucide-react';

export function BreakdownGuide() {
  return (
    <Card className="p-6 border-border bg-card/50 space-y-4">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-foreground mb-2">How to Use Assessment Breakdown</h4>
          <p className="text-sm text-muted-foreground">
            The breakdown calculator helps you calculate your final marks based on NIT's grading policy or your custom weightage configuration.
          </p>
        </div>
      </div>

      <div className="space-y-3 pl-8 border-l-2 border-secondary/30">
        <div>
          <h5 className="text-sm font-semibold text-foreground mb-1">1. Assignments (10% by default)</h5>
          <p className="text-xs text-muted-foreground">
            Add marks for each assignment. The system will calculate the average and apply the weightage.
          </p>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-foreground mb-1">2. Quizzes (20% by default)</h5>
          <p className="text-xs text-muted-foreground">
            Add marks for each quiz. The average quiz score will be used in the final calculation.
          </p>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-foreground mb-1">3. Midterm Exam (30% by default)</h5>
          <p className="text-xs text-muted-foreground">
            Enter your midterm examination score. This is usually required at least once per course.
          </p>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-foreground mb-1">4. Final Exam (40% by default)</h5>
          <p className="text-xs text-muted-foreground">
            Enter your final examination score. This typically carries the highest weightage.
          </p>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-foreground mb-1">5. Participation (Optional)</h5>
          <p className="text-xs text-muted-foreground">
            Add participation or attendance marks if your course includes this component.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-secondary/10 p-3 rounded-lg border border-secondary/20">
        <AlertCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground">
          <span className="font-semibold">Pro Tip:</span> You can customize the weightage percentage for each component to match your course's specific grading policy.
        </p>
      </div>

      <div className="bg-muted/30 p-3 rounded-lg">
        <p className="text-xs text-muted-foreground flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
          <span>
            All scores are normalized to a 0-100 scale before applying weightages. The final marks are calculated and displayed in real-time.
          </span>
        </p>
      </div>
    </Card>
  );
}
