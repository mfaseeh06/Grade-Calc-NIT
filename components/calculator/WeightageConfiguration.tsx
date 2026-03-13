'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WeightageConfig, validateWeightageConfig, NIT_DEFAULT_WEIGHTAGE } from '@/lib/calculations';
import { AlertCircle, Check } from 'lucide-react';

interface WeightageConfigurationProps {
  value: WeightageConfig;
  onChange: (config: WeightageConfig) => void;
}

export function WeightageConfiguration({ value, onChange }: WeightageConfigurationProps) {
  const [errors, setErrors] = useState<string>('');

  const handleToggleCustom = () => {
    const newConfig = {
      ...value,
      useCustomWeightage: !value.useCustomWeightage,
    };
    onChange(newConfig);
    setErrors('');
  };

  const handleWeightageChange = (field: keyof WeightageConfig, newValue: number) => {
    const newConfig = {
      ...value,
      [field]: newValue,
    };

    const validation = validateWeightageConfig(newConfig);
    if (!validation.valid) {
      setErrors(validation.error || '');
    } else {
      setErrors('');
    }

    onChange(newConfig);
  };

  const handleUseNITDefault = () => {
    onChange(NIT_DEFAULT_WEIGHTAGE);
    setErrors('');
  };

  const handleEqualDistribution = () => {
    const weights = {
      assignmentWeight: 20,
      quizWeight: 20,
      midtermWeight: 20,
      finalWeight: 20,
      participationWeight: 20,
    };
    onChange({
      ...value,
      useCustomWeightage: true,
      ...weights,
    });
    setErrors('');
  };

  const getTotalWeight = () => {
    return (
      (value.assignmentWeight || 0) +
      (value.quizWeight || 0) +
      (value.midtermWeight || 0) +
      (value.finalWeight || 0) +
      (value.participationWeight || 0)
    );
  };

  const totalWeight = getTotalWeight();
  const isValid = Math.abs(totalWeight - 100) < 0.01;

  return (
    <Card className="p-6 border-border bg-card mb-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Assessment Weightage</h3>
            <p className="text-sm text-muted-foreground mt-1">Configure how different components contribute to your final marks</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total Weightage</p>
            <p className={`text-2xl font-black ${isValid ? 'text-green-400' : 'text-secondary'}`}>
              {totalWeight.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2">
          <Button
            onClick={handleToggleCustom}
            variant={!value.useCustomWeightage ? 'default' : 'outline'}
            className="flex-1 btn-smooth"
          >
            {!value.useCustomWeightage ? '✓ ' : ''}NIT Default
          </Button>
          <Button
            onClick={handleToggleCustom}
            variant={value.useCustomWeightage ? 'default' : 'outline'}
            className="flex-1 btn-smooth"
          >
            {value.useCustomWeightage ? '✓ ' : ''}Custom Weightage
          </Button>
        </div>

        {/* NIT Default Mode */}
        {!value.useCustomWeightage && (
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <p className="text-sm font-semibold text-foreground mb-3">NIT Standard Weightage</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Assignments</p>
                <p className="text-2xl font-black text-secondary mt-1">{NIT_DEFAULT_WEIGHTAGE.assignmentWeight}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Quizzes</p>
                <p className="text-2xl font-black text-secondary mt-1">{NIT_DEFAULT_WEIGHTAGE.quizWeight}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Midterm</p>
                <p className="text-2xl font-black text-secondary mt-1">{NIT_DEFAULT_WEIGHTAGE.midtermWeight}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Final</p>
                <p className="text-2xl font-black text-secondary mt-1">{NIT_DEFAULT_WEIGHTAGE.finalWeight}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Participation</p>
                <p className="text-2xl font-black text-secondary mt-1">-</p>
              </div>
            </div>
          </div>
        )}

        {/* Custom Mode */}
        {value.useCustomWeightage && (
          <div className="space-y-4">
            {/* Preset Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleUseNITDefault}
                variant="outline"
                size="sm"
                className="btn-smooth"
              >
                Use NIT Default
              </Button>
              <Button
                onClick={handleEqualDistribution}
                variant="outline"
                size="sm"
                className="btn-smooth"
              >
                Equal Distribution (20% each)
              </Button>
            </div>

            {/* Custom Input Fields */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {/* Assignments */}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold block mb-2">
                  Assignments
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={value.assignmentWeight}
                    onChange={(e) => handleWeightageChange('assignmentWeight', parseFloat(e.target.value) || 0)}
                    className="text-center font-bold"
                  />
                  <span className="text-muted-foreground font-semibold">%</span>
                </div>
              </div>

              {/* Quizzes */}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold block mb-2">
                  Quizzes
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={value.quizWeight}
                    onChange={(e) => handleWeightageChange('quizWeight', parseFloat(e.target.value) || 0)}
                    className="text-center font-bold"
                  />
                  <span className="text-muted-foreground font-semibold">%</span>
                </div>
              </div>

              {/* Midterm */}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold block mb-2">
                  Midterm
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={value.midtermWeight}
                    onChange={(e) => handleWeightageChange('midtermWeight', parseFloat(e.target.value) || 0)}
                    className="text-center font-bold"
                  />
                  <span className="text-muted-foreground font-semibold">%</span>
                </div>
              </div>

              {/* Final */}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold block mb-2">
                  Final
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={value.finalWeight}
                    onChange={(e) => handleWeightageChange('finalWeight', parseFloat(e.target.value) || 0)}
                    className="text-center font-bold"
                  />
                  <span className="text-muted-foreground font-semibold">%</span>
                </div>
              </div>

              {/* Participation */}
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold block mb-2">
                  Participation
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={value.participationWeight || 0}
                    onChange={(e) => handleWeightageChange('participationWeight', parseFloat(e.target.value) || 0)}
                    className="text-center font-bold"
                  />
                  <span className="text-muted-foreground font-semibold">%</span>
                </div>
              </div>
            </div>

            {/* Validation Message */}
            {errors && (
              <div className="flex gap-2 items-start p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">{errors}</p>
              </div>
            )}

            {/* Success Message */}
            {!errors && isValid && value.useCustomWeightage && (
              <div className="flex gap-2 items-start p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-400">Weightages are valid!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
