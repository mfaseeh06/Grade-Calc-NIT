'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface AssessmentInputProps {
  title: string;
  description: string;
  marks: (number | string)[];
  maxMarks: number | string;
  onMarksChange: (marks: (number | string)[]) => void;
  onMaxMarksChange: (maxMarks: number | string) => void;
  icon?: React.ReactNode;
  allowMultiple?: boolean;
}

export function AssessmentInput({
  title,
  description,
  marks,
  maxMarks,
  onMarksChange,
  onMaxMarksChange,
  icon,
  allowMultiple = true,
}: AssessmentInputProps) {
  const handleAddMark = () => {
    onMarksChange([...marks, 0]);
  };

  const handleRemoveMark = (index: number) => {
    onMarksChange(marks.filter((_, i) => i !== index));
  };

  const handleMarkChange = (index: number, value: string) => {
    const newMarks = [...marks];
    if (value === '') {
      newMarks[index] = '';
    } else {
      newMarks[index] = Math.min(Number(value) || 0, Number(maxMarks) || 0);
    }
    onMarksChange(newMarks);
  };

  const average = marks.length > 0 ? Math.round((marks.reduce((a: number, b) => a + (Number(b) || 0), 0) / marks.length) * 100) / 100 : 0;

  return (
    <Card className="p-5 border-border bg-card hover:bg-muted/50 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {icon && <span className="text-secondary">{icon}</span>}
            <h4 className="font-bold text-foreground text-lg">{title}</h4>
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {marks.length > 0 && (
          <div className="text-right ml-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Average</p>
            <p className="text-2xl font-black text-secondary">{average}</p>
          </div>
        )}
      </div>

      {/* Max Marks Input */}
      <div className="mb-4 p-3 rounded-lg bg-muted/30 border border-border">
        <label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold block mb-2">
          Maximum Marks per Item
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min="1"
            max="1000"
            value={maxMarks}
            onChange={(e) => onMaxMarksChange(e.target.value)}
            className="font-semibold"
          />
          <span className="text-muted-foreground font-semibold">marks</span>
        </div>
      </div>

      {/* Marks Input Fields */}
      {!allowMultiple ? (
        /* Single mark input (for midterm, final, participation) */
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border">
          <span className="text-xs text-muted-foreground font-semibold min-w-fit">{title}:</span>
          <Input
            type="number"
            min="0"
            max={Number(maxMarks)}
            value={marks[0] ?? ''}
            onChange={(e) => handleMarkChange(0, e.target.value)}
            placeholder="Enter marks"

            className="text-center font-bold"
          />
          <span className="text-muted-foreground text-sm font-semibold min-w-fit">/ {maxMarks}</span>
        </div>
      ) : marks.length === 0 ? (
        /* Multiple marks - empty state */
        <div className="text-center py-4 bg-muted/20 rounded-lg border border-dashed border-border">
          <p className="text-sm text-muted-foreground mb-3">No {title.toLowerCase()} added yet</p>
          <Button onClick={handleAddMark} variant="outline" size="sm" className="btn-smooth">
            <Plus className="w-3 h-3 mr-2" />
            Add {title}
          </Button>
        </div>
      ) : (
        /* Multiple marks - list view */
        <div className="space-y-2 mb-4">
          {marks.map((mark, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-semibold min-w-fit">
                    {title} {index + 1}:
                  </span>
                  <Input
                    type="number"
                    min="0"
                    max={Number(maxMarks)}
                    value={mark ?? ''}
                    onChange={(e) => handleMarkChange(index, e.target.value)}
                    className="text-center font-bold"
                  />
                  <span className="text-muted-foreground text-sm font-semibold min-w-fit">/ {maxMarks}</span>
                </div>
              </div>

              {marks.length > 1 && (
                <Button
                  onClick={() => handleRemoveMark(index)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 btn-smooth"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Button for multiple marks */}
      {allowMultiple && marks.length > 0 && (
        <Button onClick={handleAddMark} variant="outline" size="sm" className="w-full btn-smooth">
          <Plus className="w-3 h-3 mr-2" />
          Add Another {title}
        </Button>
      )}
    </Card>
  );
}
