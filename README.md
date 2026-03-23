# NIT GPA Calculator - Quick Start Guide for Students

## Getting Started in 3 Steps

### Step 1: Add a New Course
1. Go to your semester
2. Click **"+ Add Course"** button
3. Enter course name and credits
4. Choose your marks input method:
   - **Simple**: Just enter final marks (0-100)
   - **Detailed**: Calculate from assignments, quizzes, exams

### Step 2: Simple Mode (Quick Entry)
If you already know your final marks:
1. Check the course name is correct
2. Enter your total course marks (0-100)
3. Click **"Add Course"**
4. Done! Your GPA is calculated automatically

### Step 3: Detailed Mode (Component-Based)
If you want to calculate from individual assessments:

1. **Check the box**: "Use detailed breakdown for marks calculation"
2. **Click**: "Assessment Breakdown Details" to expand
3. **Choose weightage**:
   - Default: NIT's standard (Assignments 10%, Quizzes 20%, Midterm 30%, Final 40%)
   - Custom: Create your own percentages
4. **Fill in marks**:
   - Go to each tab (Assignments, Quizzes, Midterm, Final, Participation)
   - Add your marks as you have them
   - System calculates averages automatically
5. **Watch the magic**: Final marks update in real-time!
6. **Click**: "Add Course" when done

## Common Scenarios

### Scenario 1: Regular Course with Multiple Assignments
```
1. Click "Add Course" → "Use detailed breakdown"
2. Go to "Assignments" tab
3. Set max marks to 10 (your assignment is out of 10)
4. Add assignment 1: 9/10
5. Click "+ Add Another Assignment"
6. Add assignment 2: 8.5/10
7. Add assignment 3: 9.5/10
8. Average shown: 8.8
9. Go to "Quizzes" tab and repeat
10. Go to "Midterm" tab → enter your score
11. Go to "Final" tab → enter your score
12. Final Marks calculated automatically!
```

### Scenario 2: Custom Weightage for a Specific Course
```
1. Click "Add Course" → "Use detailed breakdown"
2. In WeightageConfiguration:
   - Click "Custom Weightage"
   - Change Assignments to 15%
   - Change Final to 45%
   - Leave others as they are
   - System validates: "Weightages are valid!"
3. Continue entering marks as normal
4. Final marks calculated using YOUR custom weights!
```

### Scenario 3: Lab Course (No Final Exam)
```
1. Click "Add Course" → "Use detailed breakdown"
2. Go to "Custom Weightage" if needed
3. Only fill in "Assignments" (lab assignments/reports)
4. Leave Final Exam at 0 marks
5. Adjust Custom Weightage if needed:
   - Assignments: 100%
   - Everything else: 0%
6. System calculates based on assignments only!
```

## Understanding Weightage

### NIT Default (100%)
- **Assignments**: 10% (multiple assignments, average is used)
- **Quizzes**: 20% (multiple quizzes, average is used)
- **Midterm**: 30% (typically one exam)
- **Final**: 40% (comprehensive exam)
- **Participation**: 0% (optional, can be added)

### How It Works
1. All your assignment marks are averaged
2. All your quiz marks are averaged
3. Your average assignment score × 10% = assignment contribution
4. Your average quiz score × 20% = quiz contribution
5. Your midterm score × 30% = midterm contribution
6. Your final exam score × 40% = final contribution
7. Add all contributions = **Your Final Marks**

### Example Calculation
```
Assignments: Average = 8/10 → Normalized: 80 × 10% = 8 points
Quizzes: Average = 9/10 → Normalized: 90 × 20% = 18 points
Midterm: 25/30 → Normalized: 83.3 × 30% = 25 points
Final: 35/40 → Normalized: 87.5 × 40% = 35 points
─────────────────────────────────────────────
FINAL MARKS = 8 + 18 + 25 + 35 = 86 / 100
```

## Important Tips

### ✓ Do This
- ✅ Enter marks as you complete assessments (don't wait until end)
- ✅ Use custom weightage if your professor specified different percentages
- ✅ Check max marks for each assessment type (may vary by course)
- ✅ Your data is saved automatically in your browser
- ✅ Use equal distribution if weightage isn't clearly specified

### ✗ Don't Do This
- ❌ Don't add more marks than the maximum (system will cap it)
- ❌ Don't leave weightages at invalid totals (≠ 100%)
- ❌ Don't assume your marks are final until you've verified max marks
- ❌ Don't clear your browser data if you want to keep your calculations

## Troubleshooting

### "Weightages must sum to 100%"
**Problem**: You're in Custom Weightage mode and percentages don't add up.
**Solution**: 
- Check all input fields
- Use "Equal Distribution" button for 20% each
- Or use "NIT Default" button to reset

### Max Marks Seem Wrong
**Problem**: I entered 9/10 but it shows as 90%
**Solution**: That's correct! Your 9 out of 10 = 90%. The system normalizes all scores to 0-100 scale before calculating.

### Final Marks Changed Unexpectedly
**Problem**: My final marks updated when I only changed one component.
**Solution**: The system recalculates in real-time. Check your weightages are correct.

### Can't Add Another Assignment
**Problem**: The "+ Add Another Assignment" button is grayed out.
**Solution**: 
- Make sure you're not in participation tab (single item only)
- Try entering at least one mark first
- Refresh if still having issues

## Examples by Course Type

### Theoretical Course (All Exams)
```
Use Custom Weightage:
- Assignments: 0%
- Quizzes: 20%
- Midterm: 30%
- Final: 50%
- Participation: 0%
Total: 100% ✓
```

### Practical/Lab Course
```
Use Custom Weightage:
- Assignments: 60% (lab work, reports)
- Quizzes: 0%
- Midterm: 0%
- Final: 40% (lab exam)
- Participation: 0%
Total: 100% ✓
```

### Discussion/Seminar Course
```
Use Custom Weightage:
- Assignments: 30%
- Quizzes: 20%
- Midterm: 0%
- Final: 0%
- Participation: 50%
Total: 100% ✓
```

## Your Final GPA

After entering all courses and semesters:
1. **Course GPA**: Calculated for each course based on final marks
2. **Semester GPA**: Average GPA of all courses in that semester (weighted by credits)
3. **CGPA**: Cumulative GPA across all semesters (weighted by credits)

Your grade (A+, A, B+, etc.) is determined by your final marks according to NIT's grading policy.

## Still Have Questions?

Refer to the "How to Use Assessment Breakdown" guide in the calculator for detailed step-by-step instructions!

Good luck! 🎓
