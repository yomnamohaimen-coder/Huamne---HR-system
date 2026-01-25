"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

type LeaveBalanceState = "normal" | "no_data" | "low";

interface LeaveBalanceCardProps {
  days?: number;
  nextLeave?: string;
  state?: LeaveBalanceState;
}

export function LeaveBalanceCard({
  days = 15,
  nextLeave,
  state = "normal",
}: LeaveBalanceCardProps) {
  if (state === "no_data") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            Leave balance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your leave balance will appear here
          </p>
          <p className="text-sm text-muted-foreground">
            This usually becomes available after onboarding.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (state === "low") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            Leave balance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You have {days} leave days remaining
          </p>
          <Button variant="outline">View leave policy</Button>
        </CardContent>
      </Card>
    );
  }

  // Normal state
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          Leave balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-2xl font-semibold">{days} days remaining</p>
        {nextLeave && (
          <p className="text-sm text-muted-foreground">
            Next leave: {nextLeave}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
