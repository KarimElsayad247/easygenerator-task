import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// @ts-ignore
export const fieldShouldReportError = (state) => {
  return state.meta.errors[0] && state.meta.isTouched && state.meta.isBlurred && !state.meta.isDefaultValue;
};
