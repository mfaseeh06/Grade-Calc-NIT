'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Activity, TrendingUp, Trophy } from 'lucide-react';
import { Semester } from '@/lib/calculations';

interface ScenarioComparisonProps {
  semesters: Semester[];
  currentCGPA: number;
  totalCredits: number;
}

export function ScenarioComparison({ currentCGPA, totalCredits }: ScenarioComparisonProps) {
  const [baseCredits, setBaseCredits] = useState('');
  const [baseGPA, setBaseGPA] = useState('');

  const [stretchCredits, setStretchCredits] = useState('');
  const [stretchGPA, setStretchGPA] = useState('');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gradecalc_scenario');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.baseCredits !== undefined) setBaseCredits(data.baseCredits);
        if (data.baseGPA !== undefined) setBaseGPA(data.baseGPA);
        if (data.stretchCredits !== undefined) setStretchCredits(data.stretchCredits);
        if (data.stretchGPA !== undefined) setStretchGPA(data.stretchGPA);
      } catch (e) {}
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gradecalc_scenario', JSON.stringify({
        baseCredits, baseGPA, stretchCredits, stretchGPA
      }));
    }
  }, [baseCredits, baseGPA, stretchCredits, stretchGPA, mounted]);

  const calculateOutcome = (newCredits: number, newGPA: number) => {
    if (newCredits <= 0) return currentCGPA;
    const currentPoints = currentCGPA * totalCredits;
    const newPoints = newGPA * newCredits;
    return (currentPoints + newPoints) / (totalCredits + newCredits);
  };

  const baseOutcome = calculateOutcome(Number(baseCredits) || 0, Number(baseGPA) || 0);
  const stretchOutcome = calculateOutcome(Number(stretchCredits) || 0, Number(stretchGPA) || 0);

  const diff = stretchOutcome - baseOutcome;

  return (
    <Card className="p-6 border-border bg-card shadow-sm h-full">
      <div className="flex items-start gap-3 mb-8">
        <div className="p-2 bg-secondary/10 rounded-lg shrink-0">
          <Activity className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Scenario Comparison</h3>
          <p className="text-sm text-muted-foreground mt-1">Compare different performance trajectories side-by-side to evaluate potential outcomes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Base Case */}
        <div className="space-y-4 relative p-5 bg-muted/10 border border-border rounded-xl">
          <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-muted text-muted-foreground px-2 py-1 text-[10px] sm:text-xs font-bold uppercase rounded-md shadow-sm border border-border/50">
            Scenario A
          </div>
          <div className="flex items-center gap-2 mb-4 text-foreground font-black text-lg">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Base Case (Realistic)
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase font-semibold text-muted-foreground block mb-2">Upcoming Credits</label>
              <Input type="number" min="0" value={baseCredits} onChange={e => setBaseCredits(e.target.value)} className="font-semibold bg-background border-border shadow-sm" />
            </div>
            <div>
              <label className="text-xs uppercase font-semibold text-muted-foreground block mb-2">Expected GPA</label>
              <Input type="number" min="0" max="4.33" step="0.01" value={baseGPA} onChange={e => setBaseGPA(e.target.value)} className="font-semibold bg-background border-border shadow-sm" />
            </div>
          </div>

          <div className="bg-muted/40 p-4 rounded-xl border border-border flex items-center justify-between mt-4">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Resulting CGPA</span>
            <span className="text-3xl font-black">{baseOutcome.toFixed(2)}</span>
          </div>
        </div>

        {/* Stretch Goal */}
        <div className="space-y-4 relative p-5 bg-secondary/5 border border-secondary/20 rounded-xl">
          <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-yellow-400 text-yellow-900 px-2 py-1 text-[10px] sm:text-xs font-bold uppercase rounded-md shadow-sm border border-yellow-500/50">
            Scenario B
          </div>
          <div className="flex items-center gap-2 mb-4 text-foreground font-black text-lg">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Stretch Goal (Ambitious)
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase font-semibold text-muted-foreground block mb-2">Upcoming Credits</label>
              <Input type="number" min="0" value={stretchCredits} onChange={e => setStretchCredits(e.target.value)} className="font-semibold bg-background border-border shadow-sm" />
            </div>
            <div>
              <label className="text-xs uppercase font-semibold text-muted-foreground block mb-2">Expected GPA</label>
              <Input type="number" min="0" max="4.33" step="0.01" value={stretchGPA} onChange={e => setStretchGPA(e.target.value)} className="font-semibold bg-background border-border shadow-sm" />
            </div>
          </div>

          <div className="bg-secondary/15 p-4 rounded-xl border border-secondary/30 flex items-center justify-between mt-4">
            <span className="text-sm font-bold text-secondary uppercase tracking-wide">Resulting CGPA</span>
            <span className="text-3xl font-black text-secondary">{stretchOutcome.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-border flex flex-col items-center justify-center">
        <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-widest">Impact Analysis</p>
        <div className="text-sm sm:text-base border border-secondary/30 bg-secondary/10 px-6 py-3 rounded-full font-medium inline-block shadow-sm text-foreground">
          Pushing for the Stretch Goal would increase your CGPA by <strong className="text-secondary font-black text-lg">+{Math.max(0, diff).toFixed(2)}</strong> points over the Base Case
        </div>
      </div>
    </Card>
  );
}
