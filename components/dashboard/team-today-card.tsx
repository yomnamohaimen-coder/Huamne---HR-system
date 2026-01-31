"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type TeamTodayState = "normal" | "empty" | "error";

interface TeamTodayCardProps {
  present?: number;
  onLeave?: number;
  absent?: number;
  state?: TeamTodayState;
  role?: "manager" | "hr";
}

export function TeamTodayCard({
  present = 0,
  onLeave = 0,
  absent = 0,
  state = "normal",
  role = "manager",
}: TeamTodayCardProps) {
  const router = useRouter();
  const teamRoute = `/${role}/team`;
  const attendanceRoute = `/${role}/attendance`; // Prefer attendance if available

  if (state === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Team today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              We couldn't load team attendance.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
            <Button variant="outline" onClick={() => router.push(teamRoute)}>
              Go to Team
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
            <Users className="h-5 w-5 text-muted-foreground" />
            Team today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            No team members assigned yet.
          </p>
          <Button variant="outline" onClick={() => router.push(teamRoute)}>
            View team settings
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Normal state
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          Team today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-2xl font-semibold">{present} present</p>
          <p className="text-lg text-muted-foreground">{onLeave} on leave</p>
          <p className="text-lg text-muted-foreground">{absent} absent</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Team attendance overview for today.
        </p>
        <Button variant="outline" onClick={() => router.push(attendanceRoute)}>
          View team attendance
        </Button>
      </CardContent>
    </Card>
  );
}
