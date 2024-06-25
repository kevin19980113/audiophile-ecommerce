"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CheckoutSchemaType, checkoutSchema } from "./schema";

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
    await new Promise((resolve) => setTimeout(resolve, 3000));
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

  return { message: "Payment Succeed" };
};
