# Assessment Breakdown Calculator - UI Flow Documentation

## Main Interface Overview

```
┌─────────────────────────────────────────────────────────────┐
│           NIT GPA & CGPA Calculator                          │
│           Assessment Breakdown Feature                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  How to Use Assessment Breakdown (BreakdownGuide)           │
│  - Step-by-step instructions                                │
│  - Pro tips for custom weightage                            │
│  - Real-time calculation explanation                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Your Overall GPA & CGPA Display (GPADisplay)               │
│  - Cumulative GPA: 3.45                                     │
│  - Statistics grid showing courses, credits, pass rate      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Your Semesters                                             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Semester 1            Semester GPA: 3.78           │   │
│  │ 4 courses · Credits: 15                             │   │
│  │                                                     │   │
│  │ [Courses List]                                      │   │
│  │ ┌──────────────────────────────────────────────┐   │   │
│  │ │ Data Structures | 4 Credits | 85% | GPA 3.67 │   │   │
│  │ │ [Edit] [Delete]                              │   │   │
│  │ └──────────────────────────────────────────────┘   │   │
│  │                                                     │   │
│  │ [+ Add Course]                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [+ Add New Semester]                                       │
└─────────────────────────────────────────────────────────────┘
```

## Course Form - Two Modes

### Mode 1: Simple Input (Default)
```
┌─────────────────────────────────────────────────────────────┐
│  Add Course                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Course Name: [____________________________]                │
│                                                             │
│  Credits: [__]    Marks (0-100): [__]                      │
│                                                             │
│  Use detailed breakdown for marks? ☐                        │
│                                                             │
│  [Add Course]  [Cancel]                                     │
└─────────────────────────────────────────────────────────────┘
```

### Mode 2: Detailed Breakdown (When Enabled)
```
┌─────────────────────────────────────────────────────────────┐
│  Add Course                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Course Name: [____________________________]                │
│                                                             │
│  Credits: [__]    Calculated Marks: [87.50]                │
│                                                             │
│  ☑ Use detailed breakdown for marks calculation             │
│  Enable this option to calculate your final marks based     │
│  on individual assignments, quizzes, midterm, and final...  │
│                                                             │
│  ▼ Assessment Breakdown Details                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ WEIGHTAGE CONFIGURATION                             │   │
│  │                                                     │   │
│  │ [NIT Default]  [Custom Weightage]                   │   │
│  │                                                     │   │
│  │ Total Weightage: 100% ✓                             │   │
│  │                                                     │   │
│  │ ┌──────┬──────┬────────┬───────┬─────────────┐     │   │
│  │ │Assign│Quiz │Midterm │Final  │Participation│     │   │
│  │ │ 10%  │ 20% │  30%   │ 40%   │    -        │     │   │
│  │ └──────┴──────┴────────┴───────┴─────────────┘     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ASSESSMENT TABS                                     │   │
│  │ [Assignments] [Quizzes] [Midterm] [Final] [Particip]   │
│  │                                                     │   │
│  │ ASSIGNMENTS TAB CONTENT:                             │   │
│  │ Maximum Marks per Item: [10]  marks                 │   │
│  │                                                     │   │
│  │ Assignment 1: [9.5] / 10                            │   │
│  │ Assignment 2: [8.2] / 10   [Remove]                 │   │
│  │ Assignment 3: [7.8] / 10   [Remove]                 │   │
│  │                                                     │   │
│  │ Average: 8.5                                        │   │
│  │                                                     │   │
│  │ [+ Add Another Assignment]                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ FINAL MARKS DISPLAY                                 │   │
│  │                                                     │   │
│  │ Assignments: 85.0 × 10%                             │   │
│  │ Quizzes:    88.5 × 20%                              │   │
│  │ Midterm:    82.0 × 30%                              │   │
│  │ Final:      92.0 × 40%                              │   │
│  │ Participation: 90.0 × 0%                            │   │
│  │                                                     │   │
│  │ FINAL MARKS: 87.50 / 100                            │   │
│  │                                                     │   │
│  │ [Reset All]                                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Add Course]  [Cancel]                                     │
└─────────────────────────────────────────────────────────────┘
```

## Weightage Configuration Component

### NIT Default Mode
```
┌─────────────────────────────────────────────────────────────┐
│  ASSESSMENT WEIGHTAGE                                       │
│                                              Total: 100% ✓   │
│                                                             │
│  [✓ NIT Default]  [Custom Weightage]                        │
│                                                             │
│  NIT STANDARD WEIGHTAGE:                                    │
│  ┌──────┐ ┌──────┐ ┌─────────┐ ┌────────┐ ┌──────────────┐ │
│  │Assign│ │Quiz  │ │Midterm  │ │Final   │ │Participation│ │
│  │ 10%  │ │ 20%  │ │  30%    │ │  40%   │ │     -       │ │
│  └──────┘ └──────┘ └─────────┘ └────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Custom Weightage Mode
```
┌─────────────────────────────────────────────────────────────┐
│  ASSESSMENT WEIGHTAGE                                       │
│                                              Total: 100% ✓   │
│                                                             │
│  [NIT Default]  [✓ Custom Weightage]                        │
│                                                             │
│  [Use NIT Default]  [Equal Distribution]                    │
│                                                             │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐   │
│  │Assignments│Quizzes   │Midterm   │Final     │Particip  │   │
│  │[20]% ✓  │[20]%     │[20]%     │[20]%     │[20]%     │   │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘   │
│                                                             │
│  ✓ Weightages are valid!                                   │
│                                                             │
│  OR                                                         │
│                                                             │
│  ⚠ Weightages must sum to 100% (current: 95%)              │
└─────────────────────────────────────────────────────────────┘
```

## Assessment Input Component

```
┌─────────────────────────────────────────────────────────────┐
│  ASSIGNMENTS                              Average: 8.5       │
│  Add marks for each assignment...                            │
│                                                             │
│  Maximum Marks per Item:                                    │
│  [10] marks                                                 │
│                                                             │
│  Assignment 1: [9] / 10                                     │
│  Assignment 2: [8] / 10    [Remove]                        │
│  Assignment 3: [9] / 10    [Remove]                        │
│                                                             │
│  [+ Add Another Assignment]                                 │
└─────────────────────────────────────────────────────────────┘
```

## Final Marks Display

```
┌─────────────────────────────────────────────────────────────┐
│  COMPONENT BREAKDOWN                                        │
│                                                             │
│  ┌────────┐ ┌─────┐ ┌────────┐ ┌────────┐ ┌────────────┐   │
│  │Assignme│ │Quiz │ │Midterm │ │Final   │ │Particip    │   │
│  │  85.0  │ │ 88.5│ │  82.0  │ │  92.0  │ │  90.0      │   │
│  │× 10%   │ │×20% │ │ × 30%  │ │ × 40%  │ │ × 0%       │   │
│  └────────┘ └─────┘ └────────┘ └────────┘ └────────────┘   │
│                                                             │
│  FINAL MARKS:  87.50 / 100                                  │
│                                                             │
│  [Reset All]                                                │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
CourseForm
├── Course Info Section
│   ├── Course Name Input
│   ├── Credits Input
│   └── Simple Marks Input OR Calculated Marks Display
│
├── Breakdown Toggle Checkbox
│
├── MarksBreakdownCalculator (when enabled)
│   ├── WeightageConfiguration
│   │   ├── Mode Toggle (NIT Default / Custom)
│   │   ├── NIT Default Display
│   │   │   └── Weightage Grid
│   │   └── Custom Mode
│   │       ├── Preset Buttons
│   │       ├── Weightage Input Fields
│   │       ├── Validation Messages
│   │       └── Success Feedback
│   │
│   └── Tabs Component
│       ├── Assignments Tab
│       │   └── AssessmentInput
│       ├── Quizzes Tab
│       │   └── AssessmentInput
│       ├── Midterm Tab
│       │   └── AssessmentInput
│       ├── Final Tab
│       │   └── AssessmentInput
│       └── Participation Tab
│           └── AssessmentInput
│
│       └── Final Marks Display
│           ├── Component Breakdown Grid
│           └── Final Marks Card
│
└── Form Actions (Submit/Cancel)
```

## Data Flow

```
User Input
    ↓
AssessmentInput Components (collect marks)
    ↓
MarksBreakdownCalculator (manage state)
    ↓
WeightageConfiguration (manage weightage)
    ↓
Calculation Functions (calculations.ts)
    ├── calculateComponentAverage()
    ├── validateWeightageConfig()
    └── calculateFinalMarksFromBreakdown()
    ↓
Final Marks Display (real-time)
    ↓
CourseForm (pass final marks to parent)
    ↓
onSubmit() callback (with final marks in course data)
    ↓
Course Added to Semester
```

## Key Visual Indicators

- **✓ (Checkmark)**: Mode or feature is active
- **✓ (Green)**: Validation passed, weightages sum to 100%
- **⚠ (Warning)**: Validation issue, weightages don't sum to 100%
- **Average Display**: Shows real-time average for assignments/quizzes
- **Color Coding**: Secondary (red) for important values, success states
