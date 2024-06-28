"use client";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import CartItems from "./CartItems";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { CheckoutSchemaType, checkoutSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { CheckoutSuccessDialog } from "./CheckoutSuccessDialog";
import { checkout, sendEmail } from "@/lib/actions";
import { CheckCircle2, Loader } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import Image from "next/image";
import cashOnDeliveryIcon from "../../../public/assets/checkout/icon-cash-on-delivery.svg";
import { toast } from "sonner";

type CheckoutSuccessDialogRef = {
  open: () => void;
};

export default function CheckoutForm() {
  const successDialogRef = useRef<CheckoutSuccessDialogRef | null>(null);
  const [isPaySucceed, setIsPaySucceeded] = useState(false);
  const { items } = useCart();

  const totalAmount = items.reduce(
    (total, { quantity }) => total + quantity,
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    trigger,
    watch,
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
  });
  //validating info on client side(handleSubmit with zod schema)

  const paymentMethod = watch("paymentMethod");

  const handleRadioClick = (value: string) => {
    setValue("paymentMethod", value);
  };

  const handleUppercaseChange =
    (field: keyof CheckoutSchemaType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(field, e.target.value.toUpperCase());
      trigger(field);
    };

  const onSubmit = async (checkoutData: CheckoutSchemaType) => {
    setIsPaySucceeded(false);

    const result = await checkout(checkoutData);

    switch (result.message) {
      case "Payment Succeed":
        const { errorMessage } = await sendEmail(
          checkoutData,
          items,
          result.trackingNumber,
          result.orderNumber
        );

        if (errorMessage) {
          toast.error(errorMessage);
          //payment is okay but email is not sent
        }

        setIsPaySucceeded(true);
        successDialogRef.current?.open();
        break;
      case "Payment Failed":
        toast.error(
          "something went wrong during payment process, please try again"
        );
        break;
      case "Checkout information is invalid":
        //one more handling validation errors which are from server side
        break;
      case "User is not authenticated":
        toast.warning("Please sign in to checkout");
        break;
    }
  };

  return (
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                placeholder="+1 555 555-5555"
                disabled={isSubmitting}
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
                placeholder="123 ABC STREET"
                disabled={isSubmitting}
                onChange={handleUppercaseChange("address")}
              />
              {errors?.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
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
                placeholder="A1B 3DF"
                disabled={isSubmitting}
                onChange={handleUppercaseChange("zipCode")}
              />
              {errors?.zipCode && (
                <p className="text-sm text-red-500">{errors.zipCode.message}</p>
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
                placeholder="TORONTO"
                disabled={isSubmitting}
                onChange={handleUppercaseChange("city")}
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
                placeholder="CANADA"
                disabled={isSubmitting}
                onChange={handleUppercaseChange("country")}
              />
              {errors?.country && (
                <p className="text-sm text-red-500">{errors.country.message}</p>
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
                  className={`flex items-center space-x-2 border-2 border-input rounded-md px-2 py-4 
                  cursor-pointer has-[:checked]:border-orange-500 md:ml-2 ${
                    isSubmitting ? "pointer-events-none" : ""
                  }`}
                  onClick={() => handleRadioClick("eMoney")}
                >
                  <input
                    type="radio"
                    value="eMoney"
                    id="eMoney"
                    checked={paymentMethod === "eMoney"}
                    readOnly
                    className="accent-orange-500"
                  />
                  <Label htmlFor="eMoney" className="cursor-pointer">
                    e-Money
                  </Label>
                </div>

                <div
                  className={`flex items-center space-x-2 border-2 border-input rounded-md px-2 py-4 
                  cursor-pointer has-[:checked]:border-orange-500 md:ml-2 ${
                    isSubmitting ? "pointer-events-none" : ""
                  }`}
                  onClick={() => handleRadioClick("cashOnDelivery")}
                >
                  <input
                    type="radio"
                    value="cashOnDelivery"
                    id="cashOnDelivery"
                    checked={paymentMethod === "cashOnDelivery"}
                    readOnly
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

            {paymentMethod === "eMoney" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="eMoneyNumber" className="font-bold">
                    e-Money Number
                  </Label>
                  <Input
                    {...register("eMoneyNumber")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.eMoneyNumber,
                    })}
                    placeholder="12345678"
                    disabled={isSubmitting}
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
                    placeholder="1234"
                    disabled={isSubmitting}
                  />
                  {errors?.eMoneyPin && (
                    <p className="text-sm text-red-500">
                      {errors.eMoneyPin.message}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {paymentMethod === "cashOnDelivery" && (
            <div className="flex items-start justify-between gap-x-4 mt-4">
              <Image
                src={cashOnDeliveryIcon}
                alt="cash on delivery"
                className="size-10 md:size-14"
              />
              <p className="text-muted-foreground font-medium text-sm xl:text-base">
                The &apos;Cash on Delivery&apos; option enables you to pay in
                cash when our delivery courier arrives at your residence. Just
                make sure your address is correct so that your order will not be
                cancelled.
              </p>
            </div>
          )}

          <div></div>
        </form>
      </div>

      <div
        className="flex flex-col w-full lg:w-1/3 gap-y-4 bg-gray-50 rounded-md 
        items-center px-4 py-6 lg:py-8 xl:px-6"
      >
        <h1 className="w-full text-left text-base lg:text-lg font-semibold">
          SUMMARY
        </h1>
        <CartItems mode="checkout" />
        {totalAmount > 0 && (
          <Button
            className={`w-full mt-4 flex items-center ${
              isPaySucceed
                ? "bg-green-600 transition-all duration-200 ease"
                : ""
            }`}
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || isPaySucceed}
          >
            {`${!isSubmitting && !isPaySucceed ? "CONTINUE & PAY" : ""}`}
            {isSubmitting && <Loader className="size-6 animate-spin" />}
            {!isSubmitting && isPaySucceed && (
              <div className="flex gap-x-2 items-center">
                <CheckCircle2 className="size-7 text-white" />
                <div className="text-sm font-bold">Payed Successfully!!</div>
              </div>
            )}
          </Button>
        )}
      </div>

      <CheckoutSuccessDialog ref={successDialogRef} />
    </div>
  );
}
