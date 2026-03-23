'use client';

import { useCourseData } from '@/hooks/useCourseData';
import { useGPACalculation } from '@/hooks/useGPACalculation';
import { SemesterCard } from './SemesterCard';
import { GPADisplay } from './GPADisplay';
import { BreakdownGuide } from './BreakdownGuide';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AcademicInsights } from './insights/AcademicInsights';

export function MainCalculator() {
  const {
    semesters,
    isLoaded,
    addSemester,
    deleteSemester,
    addCourse,
    updateCourse,
    deleteCourse,
  } = useCourseData();

  const { cgpa, semesterGPAs, statistics } = useGPACalculation(semesters);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Loading your GPA calculator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="calculator" className="w-full flex flex-col">
        <TabsList className="inline-flex w-fit mx-auto mb-8 bg-muted/50 p-1 rounded-xl overflow-x-auto max-w-full">
          <TabsTrigger value="calculator" className="rounded-lg px-4 sm:px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all sm:text-base font-semibold whitespace-nowrap">
            Semesters Input
          </TabsTrigger>
          <TabsTrigger value="insights" className="rounded-lg px-4 sm:px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all sm:text-base font-semibold whitespace-nowrap">
            Academic Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-8 mt-0 animate-in fade-in duration-500">
          {/* Breakdown Guide */}
          <BreakdownGuide />

          {/* GPADisplay */}
          <GPADisplay cgpa={cgpa} semesterGPAs={semesterGPAs} statistics={statistics} />

          {/* Semester Cards */}
          <div className="border-t border-border pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-foreground">Your Semesters</h2>
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {semesters.length} {semesters.length === 1 ? 'semester' : 'semesters'}
              </span>
            </div>
            <div className="space-y-6">
              {semesters.map((semester, index) => (
                <SemesterCard
                  key={semester.id}
                  semester={semester}
                  onAddCourse={addCourse}
                  onUpdateCourse={updateCourse}
                  onDeleteCourse={deleteCourse}
                  onDeleteSemester={deleteSemester}
                />
              ))}
            </div>
          </div>

          {/* Add Semester Button */}
          <Button
            onClick={() => addSemester()}
            className="w-full bg-secondary hover:bg-secondary/90 text-white py-6 text-lg font-bold transition-all hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Semester
          </Button>
        </TabsContent>

        <TabsContent value="insights" className="mt-0 animate-in fade-in duration-500">
          <AcademicInsights semesters={semesters} cgpa={cgpa} statistics={statistics} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
