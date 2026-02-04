"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Role, clearSession } from "@/lib/auth";
import {
  LayoutDashboard,
  Users,
  Clock,
  Briefcase,
  UserCircle,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  Building2,
  Network,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface NavSubItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: Role[];
  children?: NavSubItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["employee", "manager", "hr", "finance", "super_admin"],
  },
  {
    title: "People",
    href: "/people",
    icon: Users,
    roles: ["hr", "manager", "super_admin"],
    children: [
      {
        title: "Employees",
        href: "/people/employees",
      },
      {
        title: "Departments",
        href: "/people/departments",
      },
      {
        title: "Org Chart",
        href: "/people/org-chart",
      },
      {
        title: "Salary Bands",
        href: "/people/salary-bands",
      },
    ],
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: Clock,
    roles: ["employee", "manager", "hr", "super_admin"],
  },
  {
    title: "Talent Acquisition",
    href: "/talent-acquisition",
    icon: Briefcase,
    roles: ["hr", "super_admin"],
  },
  {
    title: "Self Service",
    href: "/self-service",
    icon: UserCircle,
    roles: ["employee", "manager", "hr", "finance", "super_admin"],
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: DollarSign,
    roles: ["hr", "finance", "super_admin"],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    roles: ["hr", "finance", "manager", "super_admin"],
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
  
  // Super admin sees all navigation items
  // Other roles see only their allowed items
  const filteredItems = role === "super_admin" 
    ? navItems 
    : navItems.filter((item) => item.roles.includes(role));
  
  // Determine route base: super_admin uses /admin, others use their role
  const roleBase = role === "super_admin" ? "/admin" : `/${role}`;

  // Auto-expand parent items when child routes are active
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    // Check which parent items should be expanded based on current pathname
    const shouldExpand: string[] = [];
    navItems.forEach((item) => {
      if (item.children && pathname.startsWith(item.href)) {
        shouldExpand.push(item.href);
      }
    });
    setExpandedItems(shouldExpand);
  }, [pathname]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

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

  const profileRoute = `${roleBase}/profile`;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-semibold">Humane</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          // Use unified routes (no role prefix) for certain modules
          const unifiedRoutes = ["/people", "/attendance", "/talent-acquisition", "/self-service", "/payroll", "/analytics"];
          const href = unifiedRoutes.includes(item.href) ? item.href : `${roleBase}${item.href}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          const isExpanded = expandedItems.includes(item.href);
          const hasChildren = item.children && item.children.length > 0;
          
          return (
            <div key={item.href}>
              {hasChildren ? (
                <>
                  <button
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {item.title}
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-muted pl-4">
                      {item.children!.map((child) => {
                        const childHref = child.href;
                        const isChildActive = pathname === childHref || pathname.startsWith(`${childHref}/`);
                        return (
                          <Link
                            key={childHref}
                            href={childHref}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                              isChildActive
                                ? "bg-primary text-primary-foreground font-medium"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
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
              )}
            </div>
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
