import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {NextRequest, NextResponse} from "next/server";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import {APP_BASE_URL} from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// This function is used to convert an ISO date string to a date string in the format of "YYYY-MM-DD".
export function isoToDateString(isoDate: number) {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return (strength / 5) * 100;
}

export const redirectRequest = (req: NextRequest, redirectUrl: string) => {
  const locales = ["ar", "fr", "en"]
  const tmp = req.url.split("/")
  const locale = locales.filter((locale) => tmp.includes(locale))[0] || "en"
  const redirectTo = "/" + locale + redirectUrl
  console.log(redirectTo)
  return NextResponse.redirect(new URL(redirectTo, APP_BASE_URL).toString())

}