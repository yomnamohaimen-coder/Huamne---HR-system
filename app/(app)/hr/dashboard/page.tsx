"use client";

import { getSession } from "@/lib/auth";
import { getFirstNameFromEmail, getGreeting } from "@/lib/utils";
import { PendingActionsCard } from "@/components/dashboard/pending-actions-card";
import { EmployeesTable } from "@/components/dashboard/employees-table";
import { AttendanceOverviewCard } from "@/components/dashboard/attendance-overview-card";
import { AnnouncementsCard } from "@/components/dashboard/announcements-card";
import { MyShortcuts } from "@/components/dashboard/my-shortcuts";

// Mock data - in real app, this would come from API
const MOCK_EMPLOYEES = [
  {
    id: "1",
    name: "Yomna Employee",
    email: "yomna.employee@mail.com",
    role: "Employee",
    department: "Engineering",
    status: "active" as const,
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@mail.com",
    role: "Manager",
    department: "Engineering",
    status: "active" as const,
  },
  {
    id: "3",
    name: "Ahmed HR",
    email: "ahmed.hr@mail.com",
    role: "HR",
    department: "Human Resources",
    status: "active" as const,
  },
  {
    id: "4",
    name: "Ali Finance",
    email: "ali.finance@mail.com",
    role: "Finance",
    department: "Finance",
    status: "active" as const,
  },
  {
    id: "5",
    name: "John Doe",
    email: "john.doe@mail.com",
    role: "Employee",
    department: "Marketing",
    status: "onLeave" as const,
  },
  {
    id: "6",
    name: "Jane Smith",
    email: "jane.smith@mail.com",
    role: "Employee",
    department: "Sales",
    status: "active" as const,
  },
];

const MOCK_DATA = {
  // Pending actions
  pendingActionsCount: 5,
  pendingActionsState: "normal" as "empty" | "normal" | "edge" | "error",
  
  // Employees
  employees: MOCK_EMPLOYEES,
  employeesState: "normal" as "normal" | "empty" | "noResults" | "error",
  
  // Attendance overview
  attendancePresent: 45,
  attendanceOnLeave: 8,
  attendanceAbsent: 2,
  attendanceState: "normal" as "normal" | "empty" | "edge" | "error",
  
  // Announcements
  announcements: [] as Array<{ id: string; title: string; message: string; date: string }>,
  hasAnnouncementError: false,
};

export default function HRDashboard() {
  const session = getSession();
  
  if (!session) {
    return null;
  }

  const firstName = getFirstNameFromEmail(session.email);
  const greeting = getGreeting();

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of what needs your attention today.
        </p>
      </div>

      {/* Pending HR actions (HIGHEST PRIORITY, full width) */}
      <PendingActionsCard
        count={MOCK_DATA.pendingActionsCount}
        state={MOCK_DATA.pendingActionsState}
      />

      {/* Employees (CORE WORK AREA) */}
      <EmployeesTable
        employees={MOCK_DATA.employees}
        state={MOCK_DATA.employeesState}
      />

      {/* Attendance overview + Announcements (2-column on desktop) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AttendanceOverviewCard
          present={MOCK_DATA.attendancePresent}
          onLeave={MOCK_DATA.attendanceOnLeave}
          absent={MOCK_DATA.attendanceAbsent}
          state={MOCK_DATA.attendanceState}
        />
        <AnnouncementsCard
          announcements={MOCK_DATA.announcements}
          hasError={MOCK_DATA.hasAnnouncementError}
          showCreateButton={true}
        />
      </div>

      {/* My shortcuts (LOW PRIORITY, LAST) */}
      <MyShortcuts />
    </div>
  );
}
