"use server";

import { redirect } from "next/navigation";

export const redirectToCheckout = async () => {
  // assume we will redirect to the checkout page //
  //assume we send request to server

  await new Promise((resolve) => setTimeout(resolve, 3000));

  //if something went wrong, throw an error
  if (false) {
    throw new Error("Something went wrong, Please try again.");
  }

  //return redirect("/checkout/success");

  return;
};
