"use client";

import { getSession } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  const session = getSession();
  
  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">View attendance reports and analytics</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Attendance reports functionality will be available soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page is under development.</p>
        </CardContent>
      </Card>
    </div>
  );
}
