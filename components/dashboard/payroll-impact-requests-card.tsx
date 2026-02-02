"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type PayrollImpactRequestsState = "normal" | "empty" | "error";

interface PayrollImpactRequestsCardProps {
  benefits?: number;
  bonuses?: number;
  overtime?: number;
  state?: PayrollImpactRequestsState;
}

export function PayrollImpactRequestsCard({
  benefits = 0,
  bonuses = 0,
  overtime = 0,
  state = "normal",
}: PayrollImpactRequestsCardProps) {
  const router = useRouter();
  const requestsRoute = "/finance/requests";

  const hasAny = benefits > 0 || bonuses > 0 || overtime > 0;

  if (state === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Requests affecting payroll
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              We couldn't load payroll-impact requests.
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
            <FileText className="h-5 w-5 text-muted-foreground" />
            Requests affecting payroll
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            No payroll-impact requests
          </p>
          <p className="text-sm text-muted-foreground">
            Nothing new to review today.
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
          <FileText className="h-5 w-5 text-muted-foreground" />
          Requests affecting payroll
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1 text-sm">
          {benefits > 0 && <p>{benefits} benefit requests</p>}
          {bonuses > 0 && <p>{bonuses} bonus</p>}
          {overtime > 0 && <p>{overtime} overtime adjustments</p>}
        </div>
        <p className="text-sm text-muted-foreground">
          These requests may affect the next payroll cycle.
        </p>
        <Button variant="outline" onClick={() => router.push(requestsRoute)} className="w-full sm:w-auto">
          View requests
        </Button>
      </CardContent>
    </Card>
  );
}
