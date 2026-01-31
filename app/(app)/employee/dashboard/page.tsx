"use client";

import { useState } from "react";
import { getSession } from "@/lib/auth";
import { getFirstNameFromEmail, getGreeting } from "@/lib/utils";
import { AttendanceCard } from "@/components/dashboard/attendance-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RequestsCard } from "@/components/dashboard/requests-card";
import { LeaveBalanceCard } from "@/components/dashboard/leave-balance-card";
import { UpcomingCard } from "@/components/dashboard/upcoming-card";
import { AnnouncementsCard } from "@/components/dashboard/announcements-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

// Mock data - in real app, this would come from API
const MOCK_DATA = {
  // Attendance: null means not checked in, string means check-in time
  attendance: null as string | null,
  
  // Request status: null = no requests, "pending" = pending approval, "rejected" = rejected
  requestStatus: null as "pending" | "rejected" | null,
  
  // Leave balance
  leaveDays: 15,
  nextLeave: "Dec 25 - Dec 30, 2024",
  leaveState: "normal" as "normal" | "no_data" | "low",
  
  // Upcoming events
  upcoming: [
    { type: "holiday" as const, label: "Company holiday", date: "Dec 25, 2024" },
  ],
  
  // Announcements
  announcements: [] as Array<{ id: string; title: string; message: string; date: string }>,
  hasAnnouncementError: false,
  
  // Global error state
  hasGlobalError: false,
};

export default function EmployeeDashboard() {
  const session = getSession();
  const [globalError, setGlobalError] = useState(MOCK_DATA.hasGlobalError);
  const [requestStatus, setRequestStatus] = useState(MOCK_DATA.requestStatus);
  
  if (!session) {
    return null;
  }

  const firstName = getFirstNameFromEmail(session.email);
  const greeting = getGreeting();

  // Global error state (rare)
  if (globalError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Something went wrong</p>
                <p className="mt-1">
                  We couldn't load your dashboard right now.
                </p>
                <p className="mt-1">
                  Your data is safe. Please try again in a moment.
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setGlobalError(false)}>Retry</Button>
                <Button variant="outline" onClick={() => window.location.href = "mailto:support@company.com"}>
                  Contact support
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening today
        </p>
      </div>

      {/* Today's Attendance Status (highest priority) */}
      <AttendanceCard checkInTime={MOCK_DATA.attendance || undefined} />

      {/* Quick Actions */}
      <QuickActions role="employee" />

      {/* Requests + Leave Balance (side by side on desktop) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RequestsCard status={requestStatus} />
        <LeaveBalanceCard
          days={MOCK_DATA.leaveDays}
          nextLeave={MOCK_DATA.nextLeave}
          state={MOCK_DATA.leaveState}
        />
      </div>

      {/* Upcoming + Announcements (lowest priority) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingCard items={MOCK_DATA.upcoming} />
        <AnnouncementsCard
          announcements={MOCK_DATA.announcements}
          hasError={MOCK_DATA.hasAnnouncementError}
        />
      </div>
    </div>
  );
}
