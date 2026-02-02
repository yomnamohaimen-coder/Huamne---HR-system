"use client";

import { useEffect, useState } from "react";
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
import { RoleSwitcher } from "@/components/role-switcher";

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
    roles: ["employee", "manager", "hr", "finance", "super_admin"],
  },
  {
    title: "Requests",
    href: "/requests",
    icon: FileText,
    roles: ["employee", "manager", "hr", "super_admin"],
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: Clock,
    roles: ["employee", "manager", "hr", "super_admin"],
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: DollarSign,
    roles: ["employee", "hr", "finance", "super_admin"],
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
    roles: ["manager", "super_admin"],
  },
  {
    title: "People",
    href: "/people",
    icon: Users,
    roles: ["hr", "super_admin"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["employee", "manager", "hr", "finance", "super_admin"],
  },
];

interface AppSidebarProps {
  email: string;
  role: Role;
}

export function AppSidebar({ email, role }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [viewAsRole, setViewAsRole] = useState<Role>(() => {
    if (typeof window === "undefined") return "employee";
    const stored = localStorage.getItem("humane_view_as_role");
    return (stored as Role) || "employee";
  });
  
  // Super admin sees all navigation items
  // Other roles see only their allowed items
  const filteredItems = role === "super_admin" 
    ? navItems 
    : navItems.filter((item) => item.roles.includes(role));
  
  // Super admin can access any role's routes, use viewAsRole for navigation
  // Other roles use their own role base
  const roleBase = role === "super_admin" 
    ? (viewAsRole !== "super_admin" ? `/${viewAsRole}` : "/employee")
    : `/${role}`;
  
  // Update viewAsRole from pathname
  useEffect(() => {
    if (role === "super_admin") {
      const rolePatterns = ["/employee", "/manager", "/hr", "/finance"];
      for (const pattern of rolePatterns) {
        if (pathname.startsWith(pattern)) {
          const detectedRole = pattern.slice(1) as Role;
          if (detectedRole !== viewAsRole) {
            setViewAsRole(detectedRole);
          }
          break;
        }
      }
    }
  }, [pathname, role, viewAsRole]);

  const getInitials = (email: string) => {
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const getRoleLabel = (role: Role) => {
    if (role === "super_admin") {
      return "Super Admin";
    }
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearSession();
    router.push("/login");
  };

  // Profile route uses the current view role for super_admin, or actual role for others
  const profileRoute = role === "super_admin" 
    ? `${roleBase}/profile`
    : `${roleBase}/profile`;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">Humane</h1>
      </div>
      {role === "super_admin" && (
        <RoleSwitcher 
          currentRole={role} 
          onRoleChange={(newRole) => setViewAsRole(newRole)}
        />
      )}
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
