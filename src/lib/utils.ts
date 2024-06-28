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

export const generateTrackingNumber = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let trackingNumber = "";

  for (let i = 0; i < 10; i++) {
    trackingNumber += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return trackingNumber;
};

export const generateOrderNumber = () => {
  let orderNumber = "";

  for (let i = 0; i < 12; i++) {
    orderNumber += Math.floor(Math.random() * 10).toString();
  }

  return orderNumber;
};
