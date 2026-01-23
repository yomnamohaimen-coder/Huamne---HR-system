"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, getDashboardRoute } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (session) {
      router.push(getDashboardRoute(session.role));
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
