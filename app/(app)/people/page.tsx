"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";

export default function PeoplePage() {
  const router = useRouter();
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    const session = getSession();
    if (!session) {
      router.push("/login");
      return;
    }
    
    // Redirect to employees page by default
    router.replace("/people/employees");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  );
}
