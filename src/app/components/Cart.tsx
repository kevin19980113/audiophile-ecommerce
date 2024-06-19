import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger className="group">
        <ShoppingCart className="text-white size-6 group-hover:text-slate-400" />
      </SheetTrigger>

      <SheetContent side="right" className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold mr-auto mb-4">
            Cart
          </SheetTitle>
        </SheetHeader>

        {/* TODO: Cart List */}

        <div className="w-full flex flex-col items-center gap-y-4 mt-8">
          <div className="w-full flex items-center justify-between gap-x-4">
            <span className="text-sm md:text-lg font-medium text-muted-foreground">
              TOTAL
            </span>
            <span className="text-sm md:text-lg font-bold">
              {formatPrice({ price: 0, options: {} })}
            </span>
          </div>

          <div className="w-full flex items-center justify-between gap-x-4">
            <span className="text-sm md:text-lg font-medium text-muted-foreground">
              SHIPPING
            </span>
            <span className="text-sm md:text-lg font-bold">
              {formatPrice({ price: 0, options: {} })}
            </span>
          </div>

          <div className="w-full flex items-center justify-between gap-x-4">
            <span className="text-sm md:text-lg font-medium text-muted-foreground">
              VAT (INCLUDED)
            </span>
            <span className="text-sm md:text-lg font-bold">
              {formatPrice({ price: 0, options: {} })}
            </span>
          </div>

          <div className="w-full flex items-center justify-between mt-6 gap-x-4">
            <span className="text-sm md:text-lg font-medium text-muted-foreground">
              GRADN TOTAL
            </span>
            <span className="text-sm md:text-lg font-bold">
              {formatPrice({ price: 0, options: {} })}
            </span>
          </div>
        </div>

        <Button className="w-full mt-12">
          <Link href="/checkout">CONTINUE & PAY</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
