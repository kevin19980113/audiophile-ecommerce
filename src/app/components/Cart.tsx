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
import Link from "next/link";
import { useCart } from "../hooks/use-cart";
import CartItems from "./CartItems";

export default function Cart() {
  const { items, clearCart } = useCart();
  const totalAmount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Dialog>
      <DialogTrigger className="group" asChild>
        <div className="flex items-start gap-x-1 cursor-pointer">
          <span className="text-white font-semibold group-hover:text-slate-400">
            {totalAmount > 0 ? totalAmount : ""}
          </span>
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
              {`Cart(${totalAmount})`}
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

        <Link className={cn(buttonVariants(), "w-full mt-6")} href="/checkout">
          CHECK OUT
        </Link>
      </DialogContent>
    </Dialog>
  );
}
