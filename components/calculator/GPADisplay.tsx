'use client';

import { Card } from '@/components/ui/card';

interface GPADisplayProps {
  cgpa: number;
  semesterGPAs: Array<{
    semesterId: string;
    semesterName: string;
    gpa: number;
    courseCount: number;
  }>;
  statistics: {
    totalCourses: number;
    totalCredits: number;
    avgMarks: number;
    passingCourses: number;
    failingCourses: number;
  };
}

export function GPADisplay({ cgpa, semesterGPAs, statistics }: GPADisplayProps) {
  const getGradeCategory = (gpa: number) => {
    if (gpa >= 4.0) return 'Excellent';
    if (gpa >= 3.5) return 'Very Good';
    if (gpa >= 3.0) return 'Good';
    if (gpa >= 2.5) return 'Satisfactory';
    if (gpa >= 2.0) return 'Average';
    return 'Below Average';
  };

  return (
    <div className="space-y-6">
      {/* Overall CGPA */}
      <Card className="p-8 border-secondary bg-gradient-to-br from-card to-muted border-2 border-secondary">
        <div className="text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-wide mb-3">Cumulative GPA</p>
          <h2 className="text-6xl md:text-7xl font-black text-secondary mb-3">{cgpa.toFixed(2)}</h2>
          <p className="text-foreground font-semibold text-lg">{getGradeCategory(cgpa)}</p>
          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Based on {statistics.totalCourses} course{statistics.totalCourses !== 1 ? 's' : ''} • {statistics.totalCredits} total credits
            </p>
          </div>
        </div>
      </Card>

      {/* Semester GPAs */}
      {semesterGPAs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Semester Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {semesterGPAs.map((semester) => (
              <Card
                key={semester.semesterId}
                className="p-4 border-border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-muted-foreground">{semester.semesterName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{semester.courseCount} courses</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-secondary">{semester.gpa.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      {statistics.totalCourses > 0 && (
        <div className="border-t border-border pt-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Overall Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Card className="p-4 border-border bg-card hover:bg-muted/50 transition-colors">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Total Courses</p>
              <p className="text-3xl font-black text-foreground">{statistics.totalCourses}</p>
            </Card>

            <Card className="p-4 border-border bg-card hover:bg-muted/50 transition-colors">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Total Credits</p>
              <p className="text-3xl font-black text-foreground">{statistics.totalCredits}</p>
            </Card>

            <Card className="p-4 border-border bg-card hover:bg-muted/50 transition-colors">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Avg Marks</p>
              <p className="text-3xl font-black text-foreground">{statistics.avgMarks.toFixed(0)}</p>
            </Card>

            <Card className="p-4 border-border bg-card hover:bg-muted/50 transition-colors">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Passing</p>
              <p className="text-3xl font-black text-green-400">{statistics.passingCourses}</p>
            </Card>

            <Card className="p-4 border-border bg-card hover:bg-muted/50 transition-colors">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Failing</p>
              <p className="text-3xl font-black text-red-500">{statistics.failingCourses}</p>
            </Card>

            <Card className="p-4 border-border bg-card hover:bg-muted/50 transition-colors">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">Pass Rate</p>
              <p className="text-3xl font-black text-blue-400">
                {statistics.totalCourses > 0
                  ? ((statistics.passingCourses / statistics.totalCourses) * 100).toFixed(0)
                  : 0}%
              </p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
