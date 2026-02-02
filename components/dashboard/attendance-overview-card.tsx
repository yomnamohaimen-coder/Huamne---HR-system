"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type AttendanceOverviewState = "normal" | "empty" | "edge" | "error";

interface AttendanceOverviewCardProps {
  present?: number;
  onLeave?: number;
  absent?: number;
  state?: AttendanceOverviewState;
}

export function AttendanceOverviewCard({
  present = 0,
  onLeave = 0,
  absent = 0,
  state = "normal",
}: AttendanceOverviewCardProps) {
  const router = useRouter();
  const attendanceRoute = "/hr/attendance";

  if (state === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Attendance today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              Attendance data couldn't be loaded.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
            <Button variant="outline" onClick={() => router.push(attendanceRoute)}>
              Open Attendance module
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === "empty") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Attendance today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Attendance data is not available yet.
          </p>
          <p className="text-sm text-muted-foreground">
            This information will update throughout the day.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (state === "edge") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Attendance today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            No employees are present today.
          </p>
          <p className="text-sm text-muted-foreground">
            This may be due to holidays or approved leave.
          </p>
          <Button variant="outline" onClick={() => router.push(attendanceRoute)}>
            View full attendance
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Normal state
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Attendance today
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 p-6 pt-0">
        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <p className="text-2xl font-semibold">{present} present</p>
            <p className="text-lg text-muted-foreground">{onLeave} on leave</p>
            <p className="text-lg text-muted-foreground">{absent} absent</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Company-wide attendance summary for today.
          </p>
        </div>
        <div className="mt-auto pt-4">
          <Button variant="outline" onClick={() => router.push(attendanceRoute)} className="w-full sm:w-auto">
            View full attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
