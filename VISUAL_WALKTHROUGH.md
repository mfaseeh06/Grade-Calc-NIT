# Advanced Marks Breakdown Calculator - Visual Walkthrough

## What Students Will See When Using the Feature

### Step 1: Open Course Form
When a student clicks "+ Add Course" in a semester, they see:

```
┌─────────────────────────────────────────────────┐
│         ADD COURSE FORM                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Course Name *                                  │
│  [_____________________________________]        │
│                                                 │
│  Credits (1-10) *    Marks (0-100) *           │
│  [___]               [___]                      │
│                                                 │
│  ☐ Use detailed breakdown for marks            │
│    calculation                                  │
│                                                 │
│  [Add Course]  [Cancel]                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Step 2: Enable Breakdown (Student Checks the Box)
After checking the "Use detailed breakdown" checkbox:

```
┌─────────────────────────────────────────────────┐
│         ADD COURSE FORM                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Course Name *                                  │
│  [_____________________________________]        │
│                                                 │
│  Credits (1-10) *    Calculated Marks          │
│  [___]               [_______________]          │
│                      (value updates in real-time)
│                                                 │
│  ☑ Use detailed breakdown for marks            │
│    calculation                                  │
│                                                 │
│  💡 Enable this option to calculate your       │
│     final marks based on individual            │
│     assignments, quizzes, midterm, and         │
│     final exam with customizable weightage.    │
│                                                 │
│  ▼ Assessment Breakdown Details                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Step 3: Breakdown Expands (Student Sees the Interface)
When the student clicks to expand "Assessment Breakdown Details":

```
┌──────────────────────────────────────────────────┐
│       ASSESSMENT WEIGHTAGE CONFIGURATION         │
├──────────────────────────────────────────────────┤
│                                                  │
│  Configure how different components contribute   │
│  to your final marks.                            │
│                                 Total: 100% ✓    │
│                                                  │
│  [✓ NIT Default]  [Custom Weightage]            │
│                                                  │
│  ┌────────┬──────┬────────┬───────┬────────┐    │
│  │Assignments│Quizzes│Midterm │Final  │Particip│
│  │    10%    │  20%  │  30%   │  40%  │   -   │
│  └────────┴──────┴────────┴───────┴────────┘    │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  ASSESSMENT INPUT TABS                           │
├──────────────────────────────────────────────────┤
│  [Assign] [Quiz] [Mid] [Final] [Part]           │
│                                                  │
│  ASSIGNMENTS TAB (Currently Selected):           │
│  ─────────────────────────────────────────       │
│                                                  │
│  📄 ASSIGNMENT                    Average: 8.7  │
│  Add marks for each assignment.                 │
│                                                  │
│  Maximum Marks per Item:                        │
│  [10] marks                                      │
│                                                  │
│  Assignment 1: [9] / 10                         │
│  Assignment 2: [8.5] / 10   [🗑]                │
│  Assignment 3: [8.8] / 10   [🗑]                │
│                                                  │
│  [+ Add Another Assignment]                     │
│                                                  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│  FINAL MARKS DISPLAY                             │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌────────┬──────┬────────┬────────┬────────┐   │
│  │Assignments│Quizzes│Midterm │Final   │Particip│
│  │  87.0    │ 88.5  │  82.0  │  92.0  │ 90.0  │
│  │× 10%     │× 20%  │ × 30%  │ × 40%  │ × 0%  │
│  └────────┴──────┴────────┴────────┴────────┘   │
│                                                  │
│  FINAL MARKS:  87.50 / 100                      │
│                                                  │
│  [Reset All]                                     │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Step 4: Student Switches to Custom Weightage
When student clicks "Custom Weightage" button:

```
┌──────────────────────────────────────────────────┐
│       ASSESSMENT WEIGHTAGE CONFIGURATION         │
├──────────────────────────────────────────────────┤
│                                                  │
│  Configure how different components contribute   │
│  to your final marks.                            │
│                                                  │
│  [NIT Default]  [✓ Custom Weightage]            │
│                                                  │
│  [Use NIT Default]  [Equal Distribution]        │
│                                                  │
│  ┌────────┬──────┬────────┬────────┬────────┐   │
│  │Assignments│Quizzes│Midterm │Final  │Particip│
│  │[15] %    │[20] %│[20] %  │[40] % │ [5] % │
│  └────────┴──────┴────────┴────────┴────────┘   │
│                                                  │
│  ✓ Weightages are valid!                        │
│                                                  │
│  (Or if invalid:)                               │
│  ⚠ Weightages must sum to 100%                  │
│    (current: 95%)                               │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Step 5: Adding Quiz Marks
When student goes to Quizzes tab:

```
┌──────────────────────────────────────────────────┐
│  [Assign] [✓ Quiz] [Mid] [Final] [Part]         │
│                                                  │
│  QUIZZES TAB (Currently Selected):               │
│  ─────────────────────────────────────────       │
│                                                  │
│  ⚡ QUIZ                            Average: 9.2 │
│  Add marks for each quiz.                       │
│                                                  │
│  Maximum Marks per Item:                        │
│  [20] marks                                      │
│                                                  │
│  Quiz 1: [18] / 20                              │
│  Quiz 2: [19] / 20   [🗑]                       │
│  Quiz 3: [19.5] / 20 [🗑]                       │
│  Quiz 4: [9.2] / 20  [🗑]                       │
│                                                  │
│  [+ Add Another Quiz]                           │
│                                                  │
│  💡 NOTE: All quiz marks are normalized to      │
│     the 0-100 scale before applying weights.    │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Step 6: Exam Tabs (Single Item)
When student clicks Midterm tab:

```
┌──────────────────────────────────────────────────┐
│  [Assign] [Quiz] [✓ Mid] [Final] [Part]         │
│                                                  │
│  MIDTERM EXAM TAB (Currently Selected):          │
│  ─────────────────────────────────────────       │
│                                                  │
│  📖 MIDTERM EXAM                   Average: 82  │
│  Enter your midterm examination marks.          │
│                                                  │
│  Maximum Marks per Item:                        │
│  [30] marks                                      │
│                                                  │
│  Midterm Exam: [25] / 30                        │
│                                                  │
│  (No remove button - single exam)                │
│                                                  │
│  You have not added any marks yet.               │
│  (Shows if no marks entered)                     │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Step 7: Real-Time Final Marks Update
As student enters each mark, final display updates:

```
┌──────────────────────────────────────────────────┐
│  FINAL MARKS DISPLAY                             │
│                                                  │
│  Component Breakdown with Custom Weights:        │
│  ┌────────┬──────┬────────┬────────┬────────┐   │
│  │Assign  │Quiz  │Midterm │Final   │Particip│   │
│  │ 87.0   │ 92.0 │ 83.3   │ 90.0   │ 0.0    │   │
│  │ × 15%  │× 20% │ × 20%  │ × 40%  │ × 5%   │   │
│  └────────┴──────┴────────┴────────┴────────┘   │
│                                                  │
│  Calculation shown:                              │
│  87 × 15% = 13.05                               │
│  92 × 20% = 18.40                               │
│  83.3 × 20% = 16.66                             │
│  90 × 40% = 36.00                               │
│  0 × 5% = 0.00                                  │
│  ─────────────────────────                      │
│  FINAL MARKS: 84.11 / 100                       │
│                                                  │
│  [Reset All]                                     │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Step 8: Submit Course
After entering all marks, student clicks "Add Course":

```
The course is saved with:
- Course name
- Credits
- Calculated final marks (84.11)
- Grade determined from final marks
- GPA calculated based on grade

Then the semester view updates:
┌──────────────────────────────────────────────────┐
│ Semester 1        Semester GPA: 3.45            │
│ 1 course · Credits: 3                            │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ Data Structures  │ 3 Credits │ 84% │ 3.55  │  │
│ │ Calculated from breakdown                  │  │
│ │ [Edit] [Delete]                            │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ [+ Add Course]                                   │
└──────────────────────────────────────────────────┘
```

## Help Guide Visible on Main Page

At the top of the calculator, students see:

```
┌──────────────────────────────────────────────────┐
│  💡 HOW TO USE ASSESSMENT BREAKDOWN              │
├──────────────────────────────────────────────────┤
│                                                  │
│  The breakdown calculator helps you calculate    │
│  your final marks based on NIT's grading         │
│  policy or your custom weightage.                │
│                                                  │
│  1. ASSIGNMENTS (10% default)                    │
│     Add marks for each assignment.               │
│     Average is automatically calculated.         │
│                                                  │
│  2. QUIZZES (20% default)                        │
│     Add marks for each quiz.                     │
│     Average quiz score is used.                  │
│                                                  │
│  3. MIDTERM EXAM (30% default)                   │
│     Enter your midterm exam score.               │
│     Usually required at least once.              │
│                                                  │
│  4. FINAL EXAM (40% default)                     │
│     Enter your final exam score.                 │
│     Typically carries highest weight.            │
│                                                  │
│  5. PARTICIPATION (Optional)                     │
│     Add participation or attendance if           │
│     your course includes this component.         │
│                                                  │
│  ⚠ Pro Tip: You can customize the weightage     │
│     percentage to match your course's            │
│     specific grading policy.                     │
│                                                  │
│  📖 All scores are normalized to 0-100 scale    │
│     before applying weightages.                  │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Example Workflow: Complete Course Entry

**Student Action**: "I want to add my CS 101 course with detailed breakdown"

**Visual Flow**:
```
1. Click "+ Add Course" 
   ↓
2. Enter: "Data Structures", Credits: "4"
   ↓
3. Check: "Use detailed breakdown"
   ↓
4. Expand: "Assessment Breakdown Details"
   ↓
5. Keep: NIT Default weightage
   ↓
6. Go to Assignments tab:
   - Set max marks: 10
   - Add: 9, 8.5, 9.5 (Average: 9)
   ↓
7. Go to Quizzes tab:
   - Set max marks: 20
   - Add: 18, 19, 20 (Average: 19)
   ↓
8. Go to Midterm tab:
   - Set max marks: 30
   - Add: 25 (Single exam)
   ↓
9. Go to Final tab:
   - Set max marks: 40
   - Add: 36 (Single exam)
   ↓
10. Watch Final Marks Update: 87.5 / 100
    ↓
11. Click: "Add Course"
    ↓
12. Course Added! Semester GPA Updated!
```

## Mobile View

On mobile devices, the interface adapts:

```
┌─────────────────────────────────┐
│  Course Name                    │
│  [____________________]          │
│                                 │
│  Credits  Marks                 │
│  [__]     [__]                  │
│                                 │
│  ☐ Use detailed breakdown       │
│                                 │
│  ▼ Breakdown Details            │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Weightage Config        │    │
│  │ [NIT] [Custom]          │    │
│  │ Total: 100% ✓           │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ [A] [Q] [M] [F] [P]     │    │
│  │ (Abbreviated tabs)      │    │
│  │                         │    │
│  │ ASSIGNMENT INPUT        │    │
│  │ Max: [10]               │    │
│  │ Mark 1: [9]             │    │
│  │ [+ Add]                 │    │
│  └─────────────────────────┘    │
│                                 │
│  [Add Course] [Cancel]          │
│                                 │
└─────────────────────────────────┘
```

## Color Indicators in Action

```
Valid Custom Weightage (Green):
┌─────────────────────────────────┐
│ Total Weightage: 100.0%         │
│ ✓ Weightages are valid!         │ ← Green background
└─────────────────────────────────┘

Invalid Custom Weightage (Red):
┌─────────────────────────────────┐
│ Total Weightage: 95.0%          │
│ ⚠ Weightages must sum to 100%   │ ← Red background
│   (current: 95.0%)              │
└─────────────────────────────────┘

Success State:
- Green checkmark (✓)
- Green text for success messages
- Green background for passed validation

Error State:
- Red warning triangle (⚠)
- Red text for error messages
- Red background for invalid states
```

This visual walkthrough shows exactly what students will see when using the Advanced Marks Breakdown Calculator feature!
