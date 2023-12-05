import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const setWindowInnerHeightIntoCssVariable = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}