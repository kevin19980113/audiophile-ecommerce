"use client";

import { cn, formatPrice } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { useCart } from "../hooks/use-cart";
import { useState } from "react";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle, InfoIcon } from "lucide-react";

export default function Price({
  price,
  product,
}: {
  price: number;
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
  };
}) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  //const { toast } = useToast();
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      const toastId = toast(
        <div className="flex flex-col items-start gap-y-1">
          <div className="flex gap-x-2 items-center">
            <InfoIcon className="size-4 text-orange-500" />
            <div className="text-sm font-semibold">
              Please sign in to check out
            </div>
          </div>

          <LoginLink
            postLoginRedirectURL="/checkout"
            className={cn(buttonVariants(), "px-6 py-1 mt-2")}
            onClick={() => {
              toast.dismiss(toastId);
            }}
          >
            Sign in
          </LoginLink>
        </div>
      );
      return;
    }
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    const toastId = toast(
      <div className="flex flex-col items-start gap-y-1">
        <CheckCircle className="size-4 text-orange-500" />
        <div className="text-sm font-semibold">Added it to your cart</div>
        <div className="text-sm">Would you like to check out?</div>
        <Button
          className="px-4 py-1 mt-2"
          onClick={() => {
            toast.dismiss(toastId);
            handleCheckout();
          }}
        >
          Check out
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center md:items-start gap-y-4">
      <h3 className="text-lg font-bold">
        {formatPrice({ price: price, options: {} })}
      </h3>

      <div className="grid grid-cols-3 gap-x-2 w-64 sm:w-80">
        <div className="grid grid-cols-3 items-center bg-gray-100 col-span-1">
          <button
            className="px-3 h-full flex items-center justify-center hover:bg-slate-200 cursor-pointer"
            onClick={decrement}
          >
            -
          </button>
          <div className="px-3 h-full flex items-center justify-center">
            {quantity}
          </div>
          <button
            className="px-3 h-full flex items-center justify-center hover:bg-slate-200 cursor-pointer"
            onClick={increment}
          >
            +
          </button>
        </div>

        <Button className="col-span-2" onClick={handleAddToCart}>
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
