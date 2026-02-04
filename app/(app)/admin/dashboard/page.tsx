"use client";

import { getSession } from "@/lib/auth";
import { getFirstNameFromEmail, getGreeting } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Clock, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";

// Mock data - in real app, this would come from API
const MOCK_DATA = {
  // System overview
  totalEmployees: 48,
  activeEmployees: 45,
  onLeave: 3,
  
  // Pending actions
  pendingRequests: 12,
  pendingApprovals: 8,
  pendingPayroll: 4,
  
  // System status
  systemHealth: "healthy" as "healthy" | "warning" | "error",
  recentActivity: [
    { type: "request", message: "New leave request submitted", time: "2 hours ago" },
    { type: "approval", message: "Manager approved 3 requests", time: "3 hours ago" },
    { type: "system", message: "Payroll cycle completed", time: "1 day ago" },
  ],
};

export default function AdminDashboard() {
  const session = getSession();
  
  if (!session) {
    return null;
  }

  const firstName = getFirstNameFromEmail(session.email);
  const greeting = getGreeting();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          System overview and administration
        </p>
      </div>

      {/* System Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_DATA.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {MOCK_DATA.activeEmployees} active, {MOCK_DATA.onLeave} on leave
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_DATA.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_DATA.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Manager/HR review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payroll Items</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_DATA.pendingPayroll}</div>
            <p className="text-xs text-muted-foreground">
              Pending finance review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Status</CardTitle>
            <Badge variant={MOCK_DATA.systemHealth === "healthy" ? "default" : "destructive"}>
              {MOCK_DATA.systemHealth === "healthy" ? "Healthy" : "Warning"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            All systems operational. No issues detected.
          </p>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events and actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_DATA.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className="mt-0.5">
                  {activity.type === "request" && <FileText className="h-4 w-4 text-muted-foreground" />}
                  {activity.type === "approval" && <CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
                  {activity.type === "system" && <AlertCircle className="h-4 w-4 text-muted-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="justify-start" asChild>
              <a href="/requests">View All Requests</a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href="/admin/people">Manage Employees</a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href="/admin/settings">System Settings</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
