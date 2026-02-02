"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession, getAllRoles, type Role } from "@/lib/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

interface RoleSwitcherProps {
  currentRole: Role;
  onRoleChange?: (role: Role) => void;
}

const VIEW_AS_ROLE_KEY = "humane_view_as_role";

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [viewAsRole, setViewAsRole] = useState<Role>(() => {
    if (typeof window === "undefined") return "employee";
    const stored = localStorage.getItem(VIEW_AS_ROLE_KEY);
    return (stored as Role) || "employee";
  });
  const session = getSession();


  if (currentRole !== "super_admin" || !session) {
    return null;
  }

  const availableRoles = getAllRoles();

  // Initialize viewAsRole from pathname on mount and sync on pathname changes
  useEffect(() => {
    const rolePatterns = ["/employee", "/manager", "/hr", "/finance"];
    for (const pattern of rolePatterns) {
      if (pathname.startsWith(pattern)) {
        const role = pattern.slice(1) as Role;
        if (availableRoles.includes(role)) {
          setViewAsRole((prevRole) => {
            if (prevRole !== role) {
              localStorage.setItem(VIEW_AS_ROLE_KEY, role);
              return role;
            }
            return prevRole;
          });
        }
        break;
      }
    }
  }, [pathname, availableRoles]);

  const handleRoleSwitch = (newRole: Role) => {
    setViewAsRole(newRole);
    localStorage.setItem(VIEW_AS_ROLE_KEY, newRole);
    
    // Update the pathname to reflect the new role view
    const currentPath = pathname;
    let newPath = `/${newRole}/dashboard`;
    
    // If we're on a specific route, try to map it to the new role
    const rolePatterns = ["/employee", "/manager", "/hr", "/finance"];
    for (const pattern of rolePatterns) {
      if (currentPath.startsWith(pattern)) {
        const routeSuffix = currentPath.replace(pattern, "");
        if (routeSuffix) {
          newPath = `/${newRole}${routeSuffix}`;
        }
        break;
      }
    }
    
    if (onRoleChange) {
      onRoleChange(newRole);
    }
    
    router.push(newPath);
  };

  return (
    <div className="px-4 py-3 border-b">
      <Label className="text-xs text-muted-foreground mb-2 block">
        View as
      </Label>
      <Select value={viewAsRole} onValueChange={handleRoleSwitch}>
        <SelectTrigger className="w-full">
          <Users className="mr-2 h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableRoles.map((role) => (
            <SelectItem key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
