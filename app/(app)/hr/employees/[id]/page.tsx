"use client";

import { useParams } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HREmployeeProfile() {
  const params = useParams();
  const employeeId = params.id as string;
  const session = getSession();
  const role = session?.role || "hr";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employee profile</h1>
        <p className="text-muted-foreground">View employee details</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Employee ID</CardTitle>
          <CardDescription>Employee identifier</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium">{employeeId}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This page is under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Employee profile functionality will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
