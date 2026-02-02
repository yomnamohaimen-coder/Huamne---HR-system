"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface PayrollStatusCardProps {
  cycleName?: string;
  status?: string;
  cutoffDate?: string;
  payoutDate?: string;
  updatedAt?: string;
  isEmpty?: boolean;
}

export function PayrollStatusCard({
  cycleName = "March payroll",
  status = "Ready for review",
  cutoffDate = "Mar 25, 2026",
  payoutDate = "Mar 30, 2026",
  updatedAt = "Today, 11:20 AM",
  isEmpty = false,
}: PayrollStatusCardProps) {
  const router = useRouter();
  const payrollRoute = "/finance/payroll";

  if (isEmpty) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            Payroll status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Payroll cycle not available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Payroll status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{cycleName}</p>
            <Badge variant="secondary">{status}</Badge>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Cutoff date: {cutoffDate}</p>
            <p>Payout date: {payoutDate}</p>
            <p>Last updated: {updatedAt}</p>
          </div>
        </div>
        <Button variant="outline" onClick={() => router.push(payrollRoute)} className="w-full sm:w-auto">
          Go to payroll
        </Button>
      </CardContent>
    </Card>
  );
}
