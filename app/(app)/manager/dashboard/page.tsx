"use client";

import { getSession } from "@/lib/auth";
import { getFirstNameFromEmail, getGreeting } from "@/lib/utils";
import { PendingApprovalsCard } from "@/components/dashboard/pending-approvals-card";
import { TodayAttendanceCard } from "@/components/dashboard/today-attendance-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TeamTodayCard } from "@/components/dashboard/team-today-card";
import { TeamRequestsCard } from "@/components/dashboard/team-requests-card";
import { AnnouncementsCard } from "@/components/dashboard/announcements-card";

// Mock data - in real app, this would come from API
const MOCK_DATA = {
  // Pending approvals
  pendingApprovalsCount: 3,
  pendingApprovalsState: "normal" as "empty" | "normal" | "edge" | "error",
  
  // Attendance
  attendance: null as string | null,
  workdayStartTime: "9:00 AM",
  
  // Team today
  teamPresent: 8,
  teamOnLeave: 2,
  teamAbsent: 1,
  teamTodayState: "normal" as "normal" | "empty" | "error",
  
  // Team requests
  teamRequestsTotal: 12,
  teamRequestsState: "normal" as "normal" | "empty" | "edge" | "error",
  
  // Announcements
  announcements: [] as Array<{ id: string; title: string; message: string; date: string }>,
  hasAnnouncementError: false,
};

export default function ManagerDashboard() {
  const session = getSession();
  
  if (!session) {
    return null;
  }

  const firstName = getFirstNameFromEmail(session.email);
  const greeting = getGreeting();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's an overview of what needs your attention today.
        </p>
      </div>

      {/* Pending approvals (HIGHEST PRIORITY, hero card) */}
      <PendingApprovalsCard
        count={MOCK_DATA.pendingApprovalsCount}
        state={MOCK_DATA.pendingApprovalsState}
        role="manager"
      />

      {/* Today (attendance) (full width) */}
      <TodayAttendanceCard
        checkInTime={MOCK_DATA.attendance || undefined}
        workdayStartTime={MOCK_DATA.workdayStartTime}
      />

      {/* Quick actions */}
      <QuickActions role="manager" />

      {/* Team today + Team requests (2-column on desktop) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TeamTodayCard
          present={MOCK_DATA.teamPresent}
          onLeave={MOCK_DATA.teamOnLeave}
          absent={MOCK_DATA.teamAbsent}
          state={MOCK_DATA.teamTodayState}
          role="manager"
        />
        <TeamRequestsCard
          total={MOCK_DATA.teamRequestsTotal}
          state={MOCK_DATA.teamRequestsState}
          role="manager"
        />
      </div>

      {/* Announcements (lowest priority) */}
      <AnnouncementsCard
        announcements={MOCK_DATA.announcements}
        hasError={MOCK_DATA.hasAnnouncementError}
      />
    </div>
  );
}
