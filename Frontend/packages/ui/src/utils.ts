import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// [DS] domain:shared component:cn ui:utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
