"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CheckoutSchemaType, checkoutSchema } from "./schema";
import { Resend } from "resend";
import EmailTemplate from "@/app/components/EmailTemplate";
import React from "react";
import { CartItem } from "@/types/cart";
import { generateOrderNumber, generateTrackingNumber } from "./utils";

export const checkout = async (checkoutData: CheckoutSchemaType) => {
  //auth check
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return { message: "User is not authenticated" };
  }

  //validate user information
  const parsedCustomerCheckoutData = checkoutSchema.safeParse(checkoutData);
  if (!parsedCustomerCheckoutData.success) {
    return {
      message: "Checkout information is invalid",
      errors: parsedCustomerCheckoutData.error.flatten().fieldErrors,
    };
  }

  //assume we send request to server to checkout
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (err) {
    return { message: "Payment Failed" };
  }

  //update checkout info
  // try{
  //   const name = checkoutData.name
  //   const email = checkoutData.email
  //   const phoneNumber = checkoutData.phoneNumber
  //   ...
  //   await prisma.userCheckoutInfo.create({data:{
  //     name,
  //     email,
  //     phoneNumber,
  //    ...
  //   }catch(err){
  //     return "An error occured. Please try again."
  //   }

  const trackingNumber = generateTrackingNumber();
  const orderNumber = generateOrderNumber();

  return { message: "Payment Succeed", trackingNumber, orderNumber };
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  checkoutData: CheckoutSchemaType,
  items: CartItem[],
  trackingNumber: string | undefined,
  orderNumber: string | undefined
) => {
  //skip validation since we already know the email address is valid from checkout actions

  const { data, error } = await resend.emails.send({
    from: "Audiophile <onboarding@resend.dev>",
    to: checkoutData.email,
    subject: "Thank you for your order! Reciept from AudioPhile",
    react: React.createElement(EmailTemplate, {
      checkoutData,
      items,
      trackingNumber,
      orderNumber,
    }),
  });

  if (error) {
    return { errorMessage: "Failed to send Email confirmation." };
  }

  return { data };
};
