"use client";

import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { ChevronLeft } from "lucide-react";
import CartItems from "../components/CartItems";
import { useForm } from "react-hook-form";
import { CheckoutSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/lib/schema";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
  });

  const paymentMethod = watch("paymentMethod");

  const handleRadioClick = (value: string) => {
    setValue("paymentMethod", value);
  };

  const onSubmit = (data: CheckoutSchemaType) => {
    console.log(data);
  };

  return (
    <MaxWidthWrapper className="px-8 lg:px-32 flex flex-col">
      <Navbar />

      <div className="absolute inset-0 bg-black h-[170px] md:h-[250px] -z-10 max-w-screen-2xl mx-auto"></div>

      <div className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mx-auto py-8 md:py-16">
        CHECK OUT
      </div>

      <Button
        className="text-muted-foreground text-base md:text-lg mr-auto mt-6 -ml-6 flex items-center"
        variant="link"
        onClick={() => router.back()}
      >
        <ChevronLeft className="size-5" /> Go back
      </Button>

      <div className="flex flex-col items-start gap-y-6 lg:flex-row lg:gap-x-6 lg:justify-between mt-8 mb-24">
        <div
          className="bg-gray-50 rounded-md px-4 py-6 lg:px-6 lg:py-8 flex-col items-start
        w-full lg:w-2/3"
        >
          <h1 className="text-xl lg:text-3xl font-semibold">CHECKOUT</h1>

          <form className="flex flex-col gap-y-4">
            <div className="text-xs lg:text-sm text-orange-500 font-medium mt-8">
              BILLING DETAILS
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold">
                  Name
                </Label>
                <Input
                  {...register("name")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.name,
                  })}
                  placeholder="YOUR NAME"
                />
                {errors?.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold">
                  Email Address
                </Label>
                <Input
                  {...register("email")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.email,
                  })}
                  placeholder="YOUR EMAIL ADDRESS"
                />
                {errors?.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="font-bold">
                  Phone Number
                </Label>
                <Input
                  {...register("phoneNumber")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.phoneNumber,
                  })}
                  placeholder="YOUR PHONE NUMBER"
                />
                {errors?.phoneNumber && (
                  <p className="text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="text-xs md:text-sm text-orange-500 font-medium mt-8">
              SHIPPING INFO
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="address" className="font-bold">
                  Address
                </Label>
                <Input
                  {...register("address")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.address,
                  })}
                  placeholder="YOUR ADDRESS"
                />
                {errors?.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode" className="font-bold">
                  ZIP Code
                </Label>
                <Input
                  {...register("zipCode")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.zipCode,
                  })}
                  placeholder="YOUR ZIP CODE"
                />
                {errors?.zipCode && (
                  <p className="text-sm text-red-500">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="font-bold">
                  City
                </Label>
                <Input
                  {...register("city")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.city,
                  })}
                  placeholder="YOUR CITY"
                />
                {errors?.city && (
                  <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="font-bold">
                  Country
                </Label>
                <Input
                  {...register("country")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.country,
                  })}
                  placeholder="YOUR COUNTRY"
                />
                {errors?.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            <div className="text-xs md:text-sm text-orange-500 font-medium mt-8">
              PAYMENT DETAILS
            </div>

            <div
              {...register("paymentMethod")}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 md:col-span-2">
                <Label htmlFor="paymentMethod" className="font-bold">
                  Payment Method
                </Label>

                <div className="flex flex-col gap-y-4">
                  <div
                    className="flex items-center space-x-2 border border-input rounded-md px-2 py-4 cursor-pointer has-[:checked]:border-orange-500 md:ml-2"
                    onClick={() => handleRadioClick("eMoney")}
                  >
                    <input
                      type="radio"
                      value="eMoney"
                      id="eMoney"
                      checked={paymentMethod === "eMoney"}
                      className="accent-orange-500"
                    />
                    <Label htmlFor="eMoney" className="cursor-pointer">
                      e-Money
                    </Label>
                  </div>

                  <div
                    className="flex items-center space-x-2 border border-input rounded-md px-2 py-4 cursor-pointer has-[:checked]:border-orange-500 md:ml-2"
                    onClick={() => handleRadioClick("cashOnDelivery")}
                  >
                    <input
                      type="radio"
                      value="cashOnDelivery"
                      id="cashOnDelivery"
                      checked={paymentMethod === "cashOnDelivery"}
                      className="accent-orange-500"
                    />
                    <Label htmlFor="cashOnDelivery" className="cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                  {errors?.paymentMethod && !getValues("paymentMethod") && (
                    <p className="text-sm text-red-500 md:ml-2">
                      {errors.paymentMethod.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eMoneyNumber" className="font-bold">
                  e-Money Number
                </Label>
                <Input
                  {...register("eMoneyNumber")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.eMoneyNumber,
                  })}
                  placeholder="YOUR EMONEY NUMBER"
                />
                {errors?.eMoneyNumber && (
                  <p className="text-sm text-red-500">
                    {errors.eMoneyNumber.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eMoneyPin" className="font-bold">
                  e-Money PIN
                </Label>
                <Input
                  {...register("eMoneyPin")}
                  className={cn({
                    "focus-visible:ring-red-500": errors.eMoneyPin,
                  })}
                  placeholder="YOUR EMONEY PIN"
                />
                {errors?.eMoneyPin && (
                  <p className="text-sm text-red-500">
                    {errors.eMoneyPin.message}
                  </p>
                )}
              </div>
            </div>

            <div></div>
          </form>
        </div>

        <div
          className="flex flex-col w-full lg:w-1/3 gap-y-4 bg-gray-50 rounded-md 
        items-center px-4 py-6 lg:px-6 lg:py-8"
        >
          <h1 className="w-full text-left text-base lg:text-lg font-semibold">
            SUMMARY
          </h1>
          <CartItems mode="checkout" />
          <Button className="w-full mt-4" onClick={handleSubmit(onSubmit)}>
            CONTINUE & PAY
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
