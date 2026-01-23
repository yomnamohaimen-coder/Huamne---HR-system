"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Role } from "@/lib/auth";
import {
  LayoutDashboard,
  FileText,
  Clock,
  DollarSign,
  Users,
  Settings,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Role[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["employee", "manager", "hr", "finance"],
  },
  {
    title: "Requests",
    href: "/requests",
    icon: FileText,
    roles: ["employee", "manager", "hr"],
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: Clock,
    roles: ["employee", "manager", "hr"],
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: DollarSign,
    roles: ["employee", "hr", "finance"],
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
    roles: ["manager"],
  },
  {
    title: "People",
    href: "/people",
    icon: Users,
    roles: ["hr"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["employee", "manager", "hr", "finance"],
  },
];

interface AppSidebarProps {
  role: Role;
}

export function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname();
  
  // Filter nav items based on role
  const filteredItems = navItems.filter((item) => item.roles.includes(role));
  
  // Get the base path for the current role
  const roleBase = `/${role}`;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">Humane</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const href = `${roleBase}${item.href}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
