"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Role, clearSession } from "@/lib/auth";
import {
  LayoutDashboard,
  FileText,
  Clock,
  DollarSign,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
  email: string;
  role: Role;
}

export function AppSidebar({ email, role }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Filter nav items based on role
  const filteredItems = navItems.filter((item) => item.roles.includes(role));
  
  // Get the base path for the current role
  const roleBase = `/${role}`;

  const getInitials = (email: string) => {
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const getRoleLabel = (role: Role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearSession();
    router.push("/login");
  };

  const profileRoute = `${roleBase}/profile`;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">Humane</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
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
      <div className="border-t p-4">
        <Link
          href={profileRoute}
          className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent transition-colors mb-2"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(email)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{email}</p>
            <p className="text-xs text-muted-foreground">{getRoleLabel(role)}</p>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
