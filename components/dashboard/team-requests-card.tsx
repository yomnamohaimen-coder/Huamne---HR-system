"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type TeamRequestsState = "normal" | "empty" | "edge" | "error";

interface TeamRequestsCardProps {
  total?: number;
  state?: TeamRequestsState;
  role?: "manager" | "hr";
}

export function TeamRequestsCard({
  total = 0,
  state = "normal",
  role = "manager",
}: TeamRequestsCardProps) {
  const router = useRouter();
  const requestsRoute = `/${role}/requests`;

  if (state === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Team requests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              We couldn't load team requests.
            </AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (state === "empty") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Team requests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            No team requests at the moment.
          </p>
          <Button variant="outline" onClick={() => router.push(requestsRoute)}>
            View all requests
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (state === "edge") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Team requests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            There are requests in the system, but none require your approval.
          </p>
          <Button variant="outline" onClick={() => router.push(requestsRoute)}>
            View all requests
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Normal state
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          Team requests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-2xl font-semibold">{total} total requests submitted</p>
        <p className="text-sm text-muted-foreground">
          Includes leave and benefit requests from your team.
        </p>
        <Button variant="outline" onClick={() => router.push(requestsRoute)}>
          View all requests
        </Button>
      </CardContent>
    </Card>
  );
}
