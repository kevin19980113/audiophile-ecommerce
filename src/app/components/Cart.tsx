"use client";

import { Button, buttonVariants } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import CartItems from "./CartItems";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

export default function Cart() {
  const { items, clearCart } = useCart();
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const { toast } = useToast();

  const totalAmount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    if (user) {
      router.push("/checkout");
      return;
    }

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
  };

  return (
    <Dialog>
      <DialogTrigger className="group" asChild>
        <div className="flex items-start gap-x-1 cursor-pointer relative">
          {totalAmount > 0 && (
            <span
              className="size-5 rounded-full bg-red-700 flex items-center justify-center 
              text-white text-xs font-semibold absolute -top-4 -right-3"
            >
              {totalAmount}
            </span>
          )}
          <ShoppingCart className="text-white size-6 group-hover:text-slate-400" />
        </div>
      </DialogTrigger>

      <DialogContent
        className="rounded-lg max-w-[280px] sm:max-w-md overflow-y-scroll max-h-screen"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="w-full flex items-center justify-between gap-x-6">
              {`Cart (${totalAmount})`}
              <Button
                variant="link"
                className="text-slate-500 -mr-3"
                onClick={clearCart}
              >
                Remove all
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <CartItems mode="cart" />

        {totalAmount > 0 && (
          <Button className="w-full mt-6" onClick={handleCheckout}>
            CHECK OUT
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
