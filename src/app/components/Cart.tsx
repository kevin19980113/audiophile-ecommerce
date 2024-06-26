"use client";

import { Button, buttonVariants } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { InfoIcon, ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/use-cart";
import CartItems from "./CartItems";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Cart() {
  const { items, clearCart } = useCart();
  const { user } = useKindeBrowserClient();
  const router = useRouter();

  const totalAmount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    if (user) {
      router.push("/checkout");
      return;
    }
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
        onOpenAutoFocus={(e) => e.preventDefault()}
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
