"use client";

import { getSession } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManagerRequests() {
  const session = getSession();
  const role = session?.role || "manager";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Requests</h1>
        <p className="text-muted-foreground">Review and approve team requests</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current Role</CardTitle>
          <CardDescription>Your assigned role in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium capitalize">{role}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This page is under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Request approvals functionality will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
