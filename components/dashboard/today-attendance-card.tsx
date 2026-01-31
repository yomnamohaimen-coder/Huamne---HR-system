"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, AlertCircle } from "lucide-react";

type AttendanceState = "not_checked_in" | "checked_in" | "error";

interface TodayAttendanceCardProps {
  checkInTime?: string;
  workdayStartTime?: string;
}

export function TodayAttendanceCard({
  checkInTime,
  workdayStartTime,
}: TodayAttendanceCardProps) {
  const [state, setState] = useState<AttendanceState>(
    checkInTime ? "checked_in" : "not_checked_in"
  );
  const [currentCheckInTime, setCurrentCheckInTime] = useState<string | undefined>(checkInTime);

  const handleCheckIn = () => {
    // Simulate check-in
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    // Simulate potential error (10% chance for demo)
    if (Math.random() < 0.1) {
      setState("error");
    } else {
      setState("checked_in");
      setCurrentCheckInTime(timeString);
    }
  };

  const handleCheckOut = () => {
    setState("not_checked_in");
    setCurrentCheckInTime(undefined);
  };

  const handleRetry = () => {
    handleCheckIn();
  };

  if (state === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              Attendance is temporarily unavailable.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={handleRetry}>Retry</Button>
            <Button variant="outline" onClick={() => window.location.href = "mailto:hr@company.com"}>
              Contact HR
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === "checked_in") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="text-lg font-medium">Checked in at {currentCheckInTime}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Remember to check out when your workday ends.
          </p>
          <Button onClick={handleCheckOut} className="w-full sm:w-auto">
            Check out
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Default: not checked in
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">You haven't checked in yet</p>
        {workdayStartTime && (
          <p className="text-sm text-muted-foreground">
            Workday started at {workdayStartTime}
          </p>
        )}
        <Button onClick={handleCheckIn} className="w-full sm:w-auto">
          Check in now
        </Button>
      </CardContent>
    </Card>
  );
}
