import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const debounce = <T extends (...args: Parameters<T>) => void>
  (callback: T
  ) => {
    let id: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(id)
      id = setTimeout(() => {
        callback(...args);
      }, 1000)

    }
  };