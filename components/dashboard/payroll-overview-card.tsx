"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface PayrollOverviewCardProps {
  totalAmount?: string;
  employeesCount?: number;
  changePercent?: string;
}

export function PayrollOverviewCard({
  totalAmount = "EGP 320,000",
  employeesCount = 48,
  changePercent = "+4%",
}: PayrollOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-muted-foreground" />
          Payroll overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Total payroll amount</p>
          <p className="text-xl font-semibold">{totalAmount}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Employees included</p>
          <p className="text-lg font-medium">{employeesCount} employees</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Change vs last month</p>
          <p className="text-lg font-medium">{changePercent} vs last month</p>
        </div>
      </CardContent>
    </Card>
  );
}
