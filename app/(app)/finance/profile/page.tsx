"use client";

import { getSession } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinanceProfile() {
  const session = getSession();
  const role = session?.role || "finance";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Your profile information</p>
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
          <p>Profile functionality will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
