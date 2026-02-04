"use client";

import { getSession } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TalentAcquisitionPage() {
  const session = getSession();
  
  if (!session) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Talent Acquisition</h1>
        <p className="text-muted-foreground">Manage recruitment, hiring, and onboarding</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This module is under development</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Talent acquisition functionality will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
