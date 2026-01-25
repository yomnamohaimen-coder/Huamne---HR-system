"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Gift, User } from "lucide-react";

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      label: "Apply for leave",
      icon: Calendar,
      onClick: () => router.push("/employee/requests"),
    },
    {
      label: "Request a benefit",
      icon: Gift,
      onClick: () => router.push("/employee/requests"),
    },
    {
      label: "View profile",
      icon: User,
      onClick: () => router.push("/employee/profile"),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="outline"
              className="flex h-auto flex-col gap-2 py-4"
              onClick={action.onClick}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
