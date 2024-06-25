import { z } from "zod";

export const checkoutSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    phoneNumber: z
      .string()
      .regex(/^(?:\+\d{1,3})?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/, {
        message: "Please enter a valid phone number",
      }),
    address: z.string().min(1, {
      message: "Address is required",
    }),
    zipCode: z.string().regex(/^[A-Za-z0-9]{3} [A-Za-z0-9]{3}$/, {
      message: "Please enter a valid zip code",
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
    eMoneyNumber: z.string().optional(),
    eMoneyPin: z.string().optional(),
  })
  .refine(
    ({ paymentMethod, eMoneyNumber }) => {
      if (paymentMethod === "eMoney") {
        return eMoneyNumber?.length === 8;
      }
      return true;
    },
    {
      message: "Please enter vaild 8 digit e-Money number",
      path: ["eMoneyNumber"],
    }
  )
  .refine(
    ({ paymentMethod, eMoneyPin }) => {
      if (paymentMethod === "eMoney") {
        return eMoneyPin?.length === 4;
      }
      return true;
    },
    {
      message: "Please enter a valid 4 digit e-Money pin number",
      path: ["eMoneyPin"],
    }
  );

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
