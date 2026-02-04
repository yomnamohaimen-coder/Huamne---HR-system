"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SalaryBandsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Salary Bands</h1>
          <p className="text-muted-foreground">Manage salary ranges and compensation structures</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Salary Band
        </Button>
      </div>

      {/* Salary Bands Table */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Bands</CardTitle>
          <CardDescription>Compensation ranges by role and level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Example Salary Band Row */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">Senior Engineer</h3>
                    <Badge variant="secondary">Level 3</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Engineering Department
                  </p>
                  <p className="text-sm font-medium mt-2">
                    EGP 25,000 - EGP 35,000
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Placeholder for more bands */}
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Salary bands will be listed here</p>
              <p className="text-sm text-muted-foreground mt-2">
                This section is ready for development
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>About Salary Bands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Salary bands define the compensation range for each role and level within your organization.
            </p>
            <p className="text-muted-foreground">
              Use this section to set up and manage salary structures, ensuring fair and consistent compensation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
