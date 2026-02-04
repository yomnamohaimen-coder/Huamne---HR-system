"use client";

import { getSession } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PayrollPage() {
  const session = getSession();
  
  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payroll</h1>
        <p className="text-muted-foreground">Manage payroll processing and financial operations</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This module is under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Payroll management functionality will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
