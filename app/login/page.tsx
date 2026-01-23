"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isAllowedUser, roleFromEmail, setSession, getSession, getDashboardRoute, getDemoUserEmails } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const demoEmails = getDemoUserEmails();

  // Redirect if already logged in
  useEffect(() => {
    const session = getSession();
    if (session) {
      router.push(getDashboardRoute(session.role));
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate inputs
    if (!email.trim()) {
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    // Check if user is allowed
    if (!isAllowedUser(email, password)) {
      setError("Invalid email or password. Use one of the demo emails with password: 1234");
      setIsLoading(false);
      return;
    }

    // Get role and create session
    const role = roleFromEmail(email);
    if (!role) {
      setError("Invalid email or password");
      setIsLoading(false);
      return;
    }

    // Set session and redirect
    setSession({ email: email.trim().toLowerCase(), role });
    router.push(getDashboardRoute(role));
  };

  const handleEmailSelect = (selectedEmail: string) => {
    setEmail(selectedEmail);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome to Humane</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="flex-1"
                />
                <Select value={email} onValueChange={handleEmailSelect}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select demo email" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoEmails.map((demoEmail) => (
                      <SelectItem key={demoEmail} value={demoEmail}>
                        {demoEmail}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            </div>

            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <p>Use one of the demo emails. Password: <strong>1234</strong></p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
