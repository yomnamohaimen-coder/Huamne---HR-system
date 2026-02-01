"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type PendingActionsState = "empty" | "normal" | "edge" | "error";

interface PendingActionsCardProps {
  count?: number;
  state?: PendingActionsState;
}

export function PendingActionsCard({
  count = 0,
  state,
}: PendingActionsCardProps) {
  const router = useRouter();
  const requestsRoute = "/hr/requests";

  // Determine state if not explicitly provided
  const currentState: PendingActionsState =
    state ||
    (count === 0 ? "empty" : count >= 10 ? "edge" : "normal");

  if (currentState === "error") {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Pending actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              We couldn't load pending actions right now.
            </AlertDescription>
          </Alert>
          <div className="flex gap-2">
            <Button onClick={() => window.location.reload()}>Retry</Button>
            <Button variant="outline" onClick={() => router.push(requestsRoute)}>
              Go to Requests
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentState === "empty") {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
            Pending actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">No pending actions at the moment.</p>
          <p className="text-sm text-muted-foreground">
            You're all caught up.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (currentState === "edge") {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            Pending actions
            <Badge variant="secondary" className="ml-2">
              {count}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">
            {count} requests waiting for review
          </p>
          <Button onClick={() => router.push(requestsRoute)}>
            Review requests
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Normal state (1-9 pending)
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          Pending actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium">
          {count} requests waiting for your review
        </p>
        <p className="text-sm text-muted-foreground">
          Review and take action to keep operations running smoothly.
        </p>
        <Button onClick={() => router.push(requestsRoute)}>
          Review requests
        </Button>
      </CardContent>
    </Card>
  );
}
