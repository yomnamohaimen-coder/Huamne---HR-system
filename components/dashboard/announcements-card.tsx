"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Megaphone, AlertCircle, RefreshCw } from "lucide-react";

type AnnouncementsState = "empty" | "error" | "loaded";

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
}

interface AnnouncementsCardProps {
  announcements?: Announcement[];
  hasError?: boolean;
}

export function AnnouncementsCard({
  announcements = [],
  hasError = false,
}: AnnouncementsCardProps) {
  const [state, setState] = useState<AnnouncementsState>(
    hasError ? "error" : announcements.length > 0 ? "loaded" : "empty"
  );

  const handleRefresh = () => {
    setState("empty");
    // In real app, this would refetch data
  };

  if (state === "error") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Announcements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertDescription>
              We couldn't load announcements
            </AlertDescription>
          </Alert>
          <Button variant="outline" onClick={handleRefresh} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (announcements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-muted-foreground" />
            Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No announcements at the moment
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-muted-foreground" />
          Announcements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="space-y-1">
            <p className="text-sm font-medium">{announcement.title}</p>
            <p className="text-sm text-muted-foreground">{announcement.message}</p>
            <p className="text-xs text-muted-foreground">{announcement.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
