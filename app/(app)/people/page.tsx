"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";

export default function PeoplePage() {
  const router = useRouter();
  const session = getSession();
  
  useEffect(() => {
    // Redirect to employees page by default
    router.replace("/people/employees");
  }, [router]);
  
  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  );
}
