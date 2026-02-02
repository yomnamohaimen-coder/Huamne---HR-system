"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type PendingFinancialActionsState = "empty" | "normal" | "error";

interface PendingFinancialActionsCardProps {
  count?: number;
  state?: PendingFinancialActionsState;
  previewItems?: string[];
}

export function PendingFinancialActionsCard({
  count = 0,
  state = "normal",
  previewItems = [],
}: PendingFinancialActionsCardProps) {
  const router = useRouter();
  const payrollRoute = "/finance/payroll";

  if (state === "error") {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Pending financial actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              We couldn't load pending financial actions right now.
            </AlertDescription>
          </Alert>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </CardContent>
      </Card>
    );
  }

  if (state === "empty" || count === 0) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
            Pending financial actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">No pending financial actions</p>
          <p className="text-sm text-muted-foreground">
            All payroll items are up to date.
          </p>
          <Button variant="outline" onClick={() => router.push(payrollRoute)}>
            View payroll
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Normal state
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          Pending financial actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-lg font-semibold">
            {count} items require your review
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Review these items to avoid payroll delays.
          </p>
        </div>
        {previewItems.length > 0 && (
          <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
            {previewItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        <Button onClick={() => router.push(payrollRoute)}>
          Review payroll & requests
        </Button>
      </CardContent>
    </Card>
  );
}
