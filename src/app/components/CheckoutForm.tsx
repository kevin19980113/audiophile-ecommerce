import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { CheckoutSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/lib/schema";

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
  });

  const paymentMethod = watch("paymentMethod");

  const handleRadioClick = (value: string) => {
    setValue("paymentMethod", value);
  };

  return (
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
        </div>
      </div>

      <div className="text-xs md:text-sm text-orange-500 font-medium mt-8">
        PAYMENT DETAILS
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 md:col-span-2">
          <Label htmlFor="paymentMethod" className="font-bold">
            Payment Method
          </Label>

          <div {...register("paymentMethod")} className="flex flex-col gap-y-4">
            <div
              className={cn(
                {
                  "focus-visible:ring-red-500": errors.paymentMethod,
                },
                "flex items-center space-x-2 border border-input rounded-md px-2 py-4 cursor-pointer has-[:checked]:border-orange-500 md:ml-2"
              )}
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
              className={cn(
                {
                  "focus-visible:ring-red-500": errors.paymentMethod,
                },
                "flex items-center space-x-2 border border-input rounded-md px-2 py-4 cursor-pointer has-[:checked]:border-orange-500 md:ml-2"
              )}
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
        </div>
      </div>

      <div></div>
    </form>
  );
}
