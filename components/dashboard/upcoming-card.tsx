"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface UpcomingItem {
  type: "holiday" | "leave";
  label: string;
  date: string;
}

interface UpcomingCardProps {
  items?: UpcomingItem[];
}

export function UpcomingCard({ items = [] }: UpcomingCardProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No upcoming events</p>
          <p className="text-sm text-muted-foreground mt-2">
            You're all set for now.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          Upcoming
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <p className="text-sm font-medium">
              {item.type === "holiday" ? "Company holiday" : "Your leave"} — {item.date}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
