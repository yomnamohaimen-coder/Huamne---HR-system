"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

type AlertsState = "normal" | "empty" | "error";

interface AlertsCardProps {
  missingBankDetails?: number;
  failedPayrollItems?: number;
  state?: AlertsState;
}

export function AlertsCard({
  missingBankDetails = 0,
  failedPayrollItems = 0,
  state = "normal",
}: AlertsCardProps) {
  const router = useRouter();
  const issuesRoute = "/finance/issues";

  const hasAny = missingBankDetails > 0 || failedPayrollItems > 0;

  if (state === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              We couldn't load alerts right now.
            </AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (state === "empty" || !hasAny) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No financial issues detected.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Normal state
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1 text-sm">
          {missingBankDetails > 0 && (
            <p>{missingBankDetails} employees missing bank details</p>
          )}
          {failedPayrollItems > 0 && (
            <p>{failedPayrollItems} failed payroll item(s)</p>
          )}
        </div>
        <Button variant="outline" onClick={() => router.push(issuesRoute)} className="w-full sm:w-auto">
          Review issues
        </Button>
      </CardContent>
    </Card>
  );
}
