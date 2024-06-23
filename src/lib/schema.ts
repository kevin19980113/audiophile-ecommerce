import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone number is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  zipCode: z.string().length(7, {
    message: "Zip code is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  country: z.string().min(1, {
    message: "Country is required",
  }),
  paymentMethod: z.string({
    message: "Please select a payment method",
  }),
  eMoneyNumber: z.string().length(8, {
    message: "Please enter your e-money 8 digit number",
  }),
  eMoneyPin: z.string().length(4, {
    message: "Please enter your e-money 4 digit pin number",
  }),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
