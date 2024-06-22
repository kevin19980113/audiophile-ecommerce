import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatPrice = {
  price: number | string;
  options: {
    currency?: "USD" | "CAD" | "EUR" | "GBP";
    maximumFractionDigits?: number;
  };
};

export function formatPrice({ price, options }: FormatPrice) {
  const { currency = "CAD", maximumFractionDigits } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits,
  }).format(numericPrice);
}
