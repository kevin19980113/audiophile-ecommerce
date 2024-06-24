"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const redirectToCheckout = async () => {
  // assume we will redirect to the checkout page //
  //assume we send request to server

  //auth check
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    throw new Error("User is not authenticated. Please Sign in first.");
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  //if something went wrong, throw an error
  if (false) {
    throw new Error("Something went wrong, Please try again.");
  }

  //return redirect("/checkout/success");

  return;
};

export async function getCheckoutData(formData: FormData) {
  console.log(formData);

  //auth check
  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  //update db ,,,,,
  //await prisma.customerCheckoutInfo.update({
  //where: {
  //id: "1",
  //},
  //data: {
  //name: formData.get("name"),
  //email: formData.get("email"),
  //phone: formData.get("phone"),
  //address: formData.get("address"),
  // ......
}
