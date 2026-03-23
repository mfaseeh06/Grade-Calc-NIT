'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Target, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TargetGPACalculatorProps {
  currentCGPA: number;
  totalCredits: number;
}

export function TargetGPACalculator({ currentCGPA, totalCredits }: TargetGPACalculatorProps) {
  const [targetCGPA, setTargetCGPA] = useState<string>('');
  const [plannedCredits, setPlannedCredits] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gradecalc_target');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.targetCGPA !== undefined) setTargetCGPA(data.targetCGPA);
        if (data.plannedCredits !== undefined) setPlannedCredits(data.plannedCredits);
      } catch (e) {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gradecalc_target', JSON.stringify({ targetCGPA, plannedCredits }));
    }
  }, [targetCGPA, plannedCredits, mounted]);

  const target = Number(targetCGPA) || 0;
  const credits = Number(plannedCredits) || 0;

  let requiredGPA = 0;
  let status: 'possible' | 'impossible' | 'achieved' = 'possible';
  let message = '';

  if (target > 0 && credits > 0) {
    const currentGradePoints = currentCGPA * totalCredits;
    const requiredGradePoints = (target * (totalCredits + credits)) - currentGradePoints;
    requiredGPA = requiredGradePoints / credits;

    if (requiredGPA > 4.33) {
      status = 'impossible';
      message = `Mathematically impossible. You need a GPA of ${requiredGPA.toFixed(2)}, but the maximum is 4.33. Try increasing your planned credits.`;
    } else if (requiredGPA <= 0) {
      status = 'achieved';
      message = `You can safely score 0.0 and still maintain this target!`;
    } else {
      status = 'possible';
      message = `You need to maintain an average GPA of ${requiredGPA.toFixed(2)} in your next ${credits} credits to reach a ${target} CGPA.`;
    }
  }

  return (
    <Card className="p-6 border-border bg-card shadow-sm h-full flex flex-col">
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 bg-secondary/10 rounded-lg">
          <Target className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Target GPA Calculator</h3>
          <p className="text-sm text-muted-foreground">Find out what grades you need to hit your target.</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase font-semibold text-muted-foreground block mb-2">Target CGPA</label>
            <Input 
              type="number" 
              min="0" max="4.33" step="0.01"
              value={targetCGPA}
              onChange={e => setTargetCGPA(e.target.value)}
              className="text-lg font-bold bg-background border-border shadow-sm"
            />
          </div>
          <div>
            <label className="text-xs uppercase font-semibold text-muted-foreground block mb-2">Planned Credits</label>
            <Input 
              type="number" 
              min="1" max="200"
              value={plannedCredits}
              onChange={e => setPlannedCredits(e.target.value)}
              className="text-lg font-bold bg-background border-border shadow-sm"
            />
          </div>
        </div>

        {target > 0 && credits > 0 && (
          <div className={`mt-6 p-5 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-colors ${
            status === 'impossible' ? 'bg-destructive/10 border-destructive/20' :
            status === 'achieved' ? 'bg-green-500/10 border-green-500/20' :
            'bg-secondary/5 border-secondary/20'
          }`}>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-80 mb-1">Required Semester GPA</p>
            <p className={`text-5xl font-black mb-3 ${
              status === 'impossible' ? 'text-destructive' :
              status === 'achieved' ? 'text-green-500' :
              'text-secondary'
            }`}>
              {status === 'impossible' ? 'N/A' : Math.max(0, requiredGPA).toFixed(2)}
            </p>
            
            <div className="flex items-start gap-2 mt-2">
              {status === 'impossible' ? (
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              ) : status === 'achieved' ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              ) : null}
              <p className={`text-sm font-medium ${
                status === 'impossible' ? 'text-destructive' :
                status === 'achieved' ? 'text-green-600 dark:text-green-400' :
                'text-foreground/80'
              }`}>
                {message}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
