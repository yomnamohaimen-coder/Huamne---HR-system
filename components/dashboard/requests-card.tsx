"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

type RequestStatus = "pending" | "rejected" | null;

interface RequestsCardProps {
  status?: RequestStatus;
}

export function RequestsCard({ status = null }: RequestsCardProps) {
  const router = useRouter();

  if (!status) {
    // Empty state
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No pending requests
          </p>
        </CardContent>
      </Card>
    );
  }

  if (status === "pending") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Badge variant="secondary">Pending approval</Badge>
          <p className="text-sm text-muted-foreground">
            Your request is awaiting approval. You'll be notified once it's reviewed.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Rejected state
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          Requests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge variant="destructive">Not approved</Badge>
        <p className="text-sm text-muted-foreground">
          You can review the details or submit a new request.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/employee/requests")}>
            View details
          </Button>
          <Button onClick={() => router.push("/employee/requests")}>
            Submit new request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
