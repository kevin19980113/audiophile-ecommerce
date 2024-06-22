"use client";

import { Button, buttonVariants } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../hooks/use-cart";

export default function Cart() {
  const { items, clearCart, addItem, removeItem } = useCart();
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
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

      <DialogContent className="rounded-lg max-w-[280px] sm:max-w-md overflow-y-scroll max-h-screen">
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

        <ScrollArea className="w-full max-h-60 md:max-h-80 flex flex-col items-center px-1">
          {items.map((item) => (
            <div
              key={item.product.name}
              className="w-full flex items-center justify-between gap-x-6 mb-8"
            >
              <div className="flex items-center gap-x-2 w-2/3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-12 md:size-24 rounded-md"
                />
                <div className="flex flex-col items-start">
                  <h1 className="text-xs sm:text-sm font-semibold">
                    {item.product.name}
                  </h1>
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {formatPrice({
                      price: item.product.price,
                      options: { maximumFractionDigits: 0 },
                    })}
                  </span>
                </div>
              </div>

              <div className="w-1/3 grid grid-cols-3 items-center bg-gray-100 col-span-1 text-xs sm:text-sm">
                <button
                  className="px-2 py-1 h-full flex items-center justify-center hover:bg-slate-200 cursor-pointer
                  sm:px-3 sm:py-2"
                  onClick={() => removeItem(item.product)}
                >
                  -
                </button>
                <div className="px-2 h-full flex items-center justify-center">
                  {item.quantity}
                </div>
                <button
                  className="px-2 h-full flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                  onClick={() => addItem(item.product, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="w-full flex flex-col items-center gap-y-4">
          <div className="w-full flex items-center justify-between gap-x-4">
            <span className="text-sm md:text-lg font-medium text-muted-foreground">
              TOTAL
            </span>
            <span className="text-sm md:text-lg font-bold">
              {formatPrice({
                price: totalPrice,
                options: { maximumFractionDigits: 2 },
              })}
            </span>
          </div>

          <div className="w-full flex items-center justify-between gap-x-4">
            <span className="text-sm md:text-lg font-medium text-muted-foreground">
              SHIPPING
            </span>
            <span className="text-sm md:text-lg font-bold">
              {formatPrice({ price: 1, options: { maximumFractionDigits: 0 } })}
            </span>
          </div>

          <div className="w-full flex items-center justify-between gap-x-4">
            <span className="text-sm md:text-lg font-medium text-muted-foreground">
              TAX (13%)
            </span>
            <span className="text-sm md:text-lg font-bold">
              {formatPrice({
                price: totalPrice * 0.13,
                options: { maximumFractionDigits: 2 },
              })}
            </span>
          </div>

          <div className="w-full flex items-center justify-between mt-6 gap-x-4">
            <span className="text-sm md:text-lg font-medium text-muted-foreground">
              GRADN TOTAL
            </span>
            <span className="text-sm md:text-lg font-bold">
              {formatPrice({ price: totalPrice * 1.13, options: {} })}
            </span>
          </div>
        </div>

        <Link className={cn(buttonVariants(), "w-full mt-12")} href="/checkout">
          CONTINUE & PAY
        </Link>
      </DialogContent>
    </Dialog>
  );
}
