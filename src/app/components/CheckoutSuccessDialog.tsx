import { forwardRef, useImperativeHandle, useRef } from "react";
import { buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { useCart } from "../hooks/use-cart";
import { useRouter } from "next/navigation";

export const CheckoutSuccessDialog = forwardRef(function CheckoutSuccessDialog(
  {},
  ref
) {
  const dialogTriggerRef = useRef<HTMLButtonElement | null>(null);
  const { items, clearCart } = useCart();
  const router = useRouter();

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          dialogTriggerRef.current?.click();
        },
      };
    },
    []
  );

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          clearCart();
          router.push("/");
        }
      }}
    >
      <DialogTrigger
        aria-label="dialog-trigger"
        className="hidden"
        ref={dialogTriggerRef}
      />

      <DialogContent
        className="max-w-[280px] md:max-w-lg aspect-square px-8 py-6 
      left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 rounded-md"
      >
        <DialogHeader>
          <DialogTitle className="flex flex-col items-start">
            <CheckCircle className="size-10 text-orange-500 mb-4" />
            <div className="text-xl font-bold md:text-2xl text-left">
              THANK YOU <br />
              FOR YOUR ORDER
            </div>
          </DialogTitle>
          <DialogDescription className="text-left text-muted-foreground text-sm md:text-base">
            You will receive an email confirmation shortly.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="w-full h-52 md:h-36 grid grid-cols-1 px-4">
          {items.map((item) => (
            <div
              className="w-full flex flex-col md:flex-row mb-3"
              key={item.product.name}
            >
              <div
                className="w-full md:w-1/2 px-4 py-3 flex items-center justify-between bg-gray-100 
              rounded-t-md md:rounded-l-md md:rounded-tr-none"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-16 md:size-20 mr-1"
                />
                <div className="flex items-start">
                  <div className="grid grid-cols-1">
                    <h3 className="text-sm font-semibold mb-1">
                      {item.product.name}
                    </h3>
                    <div className="text-muted-foreground font-medium text-sm">
                      {formatPrice({
                        price: item.product.price,
                        options: { maximumFractionDigits: 2 },
                      })}
                    </div>
                  </div>
                  <div className="w-1/3 text-muted-foreground font-medium text-sm">
                    x{item.quantity}
                  </div>
                </div>
              </div>

              <div
                className="bg-black w-full md:w-1/2 px-4 py-3 flex flex-col justify-center text-white 
              rounded-b-md md:rounded-r-md md:rounded-bl-none"
              >
                <div className="text-sm text-muted-foreground font-medium">
                  GRAND TOTAL
                </div>
                <div className="text-base font-bold">
                  {formatPrice({
                    price: item.product.price * item.quantity,
                    options: { maximumFractionDigits: 2 },
                  })}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <DialogFooter className="w-full">
          <Link
            href="/"
            className={cn(buttonVariants(), "w-full")}
            onClick={clearCart}
          >
            BACK TO HOME
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
