import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extract first name from email
 * Example: "yomna.employee@mail.com" -> "Yomna"
 */
export function getFirstNameFromEmail(email: string): string {
  const namePart = email.split("@")[0].split(".")[0];
  return namePart.charAt(0).toUpperCase() + namePart.slice(1);
}

/**
 * Get greeting based on time of day
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
