"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, Gift, User } from "lucide-react";

export function MyShortcuts() {
  const router = useRouter();
  const roleBase = "/hr";

  const shortcuts = [
    {
      label: "Apply for leave",
      icon: Calendar,
      onClick: () => router.push(`${roleBase}/requests`),
    },
    {
      label: "Request a benefit",
      icon: Gift,
      onClick: () => router.push(`${roleBase}/requests`),
    },
    {
      label: "View profile",
      icon: User,
      onClick: () => router.push(`${roleBase}/profile`),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">My shortcuts</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon;
          return (
            <Button
              key={shortcut.label}
              variant="outline"
              className="flex h-auto flex-col gap-2 py-4"
              onClick={shortcut.onClick}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{shortcut.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
