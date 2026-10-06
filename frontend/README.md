update# Question 02: React Frontend (Employee & Designation Management)

Modern React 18 + Vite frontend for managing employees and designations with sleek glassmorphism aesthetics.

## Key Features

1. **Tab Navigation**: Seamless switching between "Designation" and "View/Add Employee" views.
2. **Table E Component**: Custom data table displaying `Emp ID`, `Designation`, `First Name`, `Last Name`, and `Date of Join`.
3. **Double-Click Edit**: Double-clicking any row in Table E loads all employee details into the edit form (keeping `Employee ID` read-only).
4. **Name Splitting**: Automatically splits `Full Name` by the first space into `First Name` and `Last Name`.
5. **Add/Edit/Delete Form**: Input fields for `Employee ID`, `Full Name`, `Designation` dropdown, `Date of Join` calendar picker, and `Is Manager` checkbox.
6. **Confirmation Modal**: Interactive pop-up dialog requiring explicit user confirmation before deleting an employee.

---

## Technical Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Vanilla CSS (Custom Glassmorphism Design System)
- **Icons**: Lucide React / Emoji standard icons

---

## How to Run Locally

```bash
# Install node packages
npm install

# Start Vite development server (Runs on http://localhost:5173)
npm run dev

# Build for production
npm run build
```
