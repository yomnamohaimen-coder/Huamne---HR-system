"use client";

import { getSession } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function RequestsPage() {
  const session = getSession();
  
  if (!session) {
    return null;
  }

  const role = session.role;
  const isSuperAdmin = role === "super_admin";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Requests</h1>
          <p className="text-muted-foreground">
            {isSuperAdmin 
              ? "View and manage all requests across the organization"
              : "Manage your requests"}
          </p>
        </div>
        {!isSuperAdmin && (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        )}
      </div>

      {/* Admin View - System Overview */}
      {isSuperAdmin && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                Across all employees
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Requests Table Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Requests</CardTitle>
          <CardDescription>
            {isSuperAdmin 
              ? "All requests in the system"
              : "Your submitted requests"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {isSuperAdmin ? "No requests found" : "No requests yet"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                {isSuperAdmin 
                  ? "Requests will appear here once employees start submitting them."
                  : "You haven't submitted any requests yet. Create your first request to get started."}
              </p>
              {!isSuperAdmin && (
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Request
                </Button>
              )}
            </div>

            {/* Example Request Row (commented out for now - uncomment to see structure) */}
            {false && (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">Annual Leave Request</h3>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Submitted by John Doe • Dec 20 - Dec 27, 2024
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    {isSuperAdmin && (
                      <>
                        <Button variant="default" size="sm">Approve</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters Section (for future implementation) */}
      {isSuperAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter requests by status, type, employee, or date range</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer">All</Badge>
              <Badge variant="outline" className="cursor-pointer">Pending</Badge>
              <Badge variant="outline" className="cursor-pointer">Approved</Badge>
              <Badge variant="outline" className="cursor-pointer">Rejected</Badge>
              <Badge variant="outline" className="cursor-pointer">Leave</Badge>
              <Badge variant="outline" className="cursor-pointer">Benefits</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Filter functionality will be implemented here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
