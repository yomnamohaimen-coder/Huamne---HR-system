"use client";

import { getSession } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AnalyticsPage() {
  const session = getSession();
  
  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">View reports, insights, and organizational metrics</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This module is under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Analytics and reporting functionality will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
