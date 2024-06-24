import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import { AudioLines, Headphones, Speaker } from "lucide-react";
import Link from "next/link";

export default function SuccessCheckoutPage() {
  return (
    <>
      <div className="text-white min-h-60 text-2xl md:text-3xl lg:text-4xl font-medium mx-auto py-8 md:py-16">
        CHECKOUT SUCCESS
      </div>

      <div className="flex flex-col items-center gap-y-8 mb-36">
        <div className="text-base font-medium text-orange-600">
          Order successful
        </div>

        <div className="text-3xl md:text-4xl font-bold text-center">
          THANK YOU FOR SHOPPING
        </div>

        <p className="mt-2 text-base text-muted-foreground text-center">
          Your order was processed and your items are goint to be delivered.
          <br />
          We&apos;ve sent your receipt and order details to your email.
        </p>

        <div className="text-center text-muted-foreground font-bold text-base md:text-lg">
          Would you like to look around our Brand new Items more?
        </div>

        <div className="flex gap-x-6 md:gap-x-10 items-center text-orange-600">
          <Headphones className="size-8 md:size-12" />
          <Speaker className="size-8 md:size-12" />
          <AudioLines className="size-8 md:size-12" />
        </div>

        <Link href="/" className={cn(buttonVariants(), "px-12 md:px-24 py-4")}>
          Go Back Home
        </Link>
      </div>
    </>
  );
}
