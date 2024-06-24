"use client";

import { cn, formatPrice } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { useCart } from "../hooks/use-cart";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import Link from "next/link";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

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
  const { toast } = useToast();
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
      toast({
        title: "Please Sign in to checkout",
        description: "Would you like to checkout?",
        action: (
          <LoginLink postLoginRedirectURL="/checkout">
            <ToastAction
              altText="Sign in"
              className={cn(buttonVariants(), "whitespace-nowrap")}
            >
              Sign in
            </ToastAction>
          </LoginLink>
        ),
        className:
          "flex flex-col gap-y-2 items-start text-sm md:flex-row md:gap-x-4 md:items-center",
      });
      return;
    }
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: `Added ${product.name} to cart`,
      description: "Would you like to checkout?",
      action: (
        <ToastAction
          altText="Checkout"
          className={cn(buttonVariants(), "whitespace-nowrap")}
          onClick={handleCheckout}
        >
          Checkout
        </ToastAction>
      ),
      className:
        "flex flex-col gap-y-2 items-start text-sm md:flex-row md:gap-x-4 md:items-center",
    });
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
