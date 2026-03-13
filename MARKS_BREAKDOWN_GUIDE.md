# Advanced Marks Breakdown Calculator Implementation Guide

## Overview
The GPA calculator now includes an advanced **Assessment Breakdown Calculator** that allows students to input detailed marks for each assessment component (assignments, quizzes, midterm, final exams, and participation) and automatically calculate their final course marks based on configurable weightages.

## Key Features

### 1. **Flexible Weightage Configuration**
- **NIT Default Mode**: Uses standard NIT policy (Assignments 10%, Quizzes 20%, Midterm 30%, Final 40%)
- **Custom Weightage Mode**: Allows students to define their own weightage percentages
- **Real-time Validation**: Ensures custom weightages sum to exactly 100%
- **Quick Presets**: Buttons for "Use NIT Default" and "Equal Distribution (20% each)"

### 2. **Detailed Assessment Input**
- **Assignments**: Add multiple assignment marks with auto-averaging
- **Quizzes**: Add multiple quiz marks with auto-averaging
- **Midterm Exam**: Single exam score input
- **Final Exam**: Single exam score input
- **Participation**: Optional class participation/attendance marks

### 3. **Smart Calculations**
- All component scores normalized to 0-100 scale
- Weighted average calculation based on selected weightage
- Real-time final marks display with component breakdown
- Automatic course grade calculation

### 4. **User-Friendly Design**
- Tab-based interface for organized assessment input
- Collapsible breakdown section in course form
- Visual feedback for validation status
- Clear weightage breakdown display
- Helpful guide with tips and instructions

## Component Structure

### New Components Created:

1. **WeightageConfiguration.tsx**
   - Toggle between NIT default and custom modes
   - Input fields for custom weightages
   - Real-time validation with error messages
   - Success feedback when valid

2. **AssessmentInput.tsx**
   - Generic component for each assessment type
   - Supports single or multiple items
   - Dynamic add/remove buttons
   - Auto-calculation of averages
   - Customizable max marks per item

3. **MarksBreakdownCalculator.tsx**
   - Main container component
   - Tab-based interface for all assessment types
   - Final marks display with component breakdown
   - Reset all functionality
   - Integration of weightage configuration

4. **BreakdownGuide.tsx**
   - Help text and instructions
   - Step-by-step guidance for each component
   - Pro tips for custom weightage
   - Explanation of the calculation process

### Updated Components:

1. **CourseForm.tsx**
   - Added checkbox to enable detailed breakdown
   - Collapsible breakdown section
   - Toggle between simple and detailed input modes
   - Integration of MarksBreakdownCalculator

### Extended Utilities (calculations.ts):

- `AssessmentBreakdown` interface: Structure for detailed marks
- `WeightageConfig` interface: Custom weightage configuration
- `NIT_DEFAULT_WEIGHTAGE`: Preset constant
- `validateWeightageConfig()`: Validation function
- `calculateComponentAverage()`: Average calculation
- `calculateFinalMarksFromBreakdown()`: Main calculation engine
- `getNITDefaultWeightage()`: Returns default weights

## Usage Flow

1. **Add Course**: Click "Add Course" in a semester
2. **Enable Breakdown**: Check "Use detailed breakdown for marks calculation"
3. **Expand Section**: Click "Assessment Breakdown Details" to expand
4. **Select Weightage**: Choose NIT Default or Custom mode
5. **Input Marks**: 
   - Go to each tab (Assignments, Quizzes, etc.)
   - Add marks for each item
   - Adjust max marks if needed
6. **View Results**: Final marks calculated in real-time
7. **Save Course**: Click "Add Course" to save with calculated marks

## Configuration Examples

### NIT Default Weightage
```
Assignments: 10%
Quizzes: 20%
Midterm: 30%
Final: 40%
Participation: 0%
Total: 100%
```

### Custom Equal Distribution
```
Assignments: 20%
Quizzes: 20%
Midterm: 20%
Final: 20%
Participation: 20%
Total: 100%
```

### Custom Example (Professor-Specific)
```
Assignments: 15%
Quizzes: 15%
Midterm: 25%
Final: 40%
Participation: 5%
Total: 100%
```

## Calculation Process

1. **Normalize Components**:
   - Each component score is converted to 0-100 scale
   - Example: If Assignment max is 10, score of 7 becomes 70

2. **Apply Weightages**:
   - Final Marks = (Assignment_Score × Assignment_Weight%) + (Quiz_Score × Quiz_Weight%) + ...

3. **Round Result**:
   - Final marks rounded to 2 decimal places

4. **Grade Assignment**:
   - Final marks fed to GPA calculation system
   - Grade assigned based on NIT grading policy

## Validation Rules

- All weightage percentages must be >= 0
- Custom weightages must sum to exactly 100% (with 0.01% tolerance)
- Component marks cannot exceed max marks
- Component max marks must be >= 1

## Data Persistence

- Assessment breakdown data stored in Course object
- Weightage configuration saved with course data
- localStorage automatically persists all changes
- Breakdown data syncs across tabs and devices when using same browser

## Theme Integration

- Consistent with NIT's black (#1a1a1a) and red (#e63946) theme
- Responsive design for mobile, tablet, and desktop
- Dark mode optimized for readability
- Color-coded feedback (green for success, red for errors)

## Performance Considerations

- Calculations run in real-time on every change
- No API calls required (purely client-side)
- Optimized component re-renders
- Minimal bundle size impact from new components

## Future Enhancements

- Export final marks to PDF
- Share calculation with classmates
- Course history and archiving
- Semester comparison
- GPA trend analysis
