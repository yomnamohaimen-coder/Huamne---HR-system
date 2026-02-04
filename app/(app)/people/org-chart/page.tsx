"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Download } from "lucide-react";

export default function OrgChartPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Organization Chart</h1>
          <p className="text-muted-foreground">Visual representation of organizational hierarchy</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ZoomIn className="mr-2 h-4 w-4" />
            Zoom In
          </Button>
          <Button variant="outline" size="sm">
            <ZoomOut className="mr-2 h-4 w-4" />
            Zoom Out
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Org Chart Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Organizational Structure</CardTitle>
          <CardDescription>Interactive organization chart</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[600px] flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">Organization Chart</p>
              <p className="text-sm text-muted-foreground">
                Visual hierarchy will be displayed here
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                This section is ready for development
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend/Info */}
      <Card>
        <CardHeader>
          <CardTitle>Chart Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              The organization chart will show reporting relationships, departments, and team structures.
            </p>
            <p className="text-muted-foreground">
              Features will include: zoom, pan, search, and export capabilities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
