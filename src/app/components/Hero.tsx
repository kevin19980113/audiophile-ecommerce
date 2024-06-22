import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <div className="w-full flex flex-col items-center xl:items-start gap-y-7">
      <h4 className="text-lg text-neutral-500 font-normal mt-56 xl:mt-40 tracking-widest whitespace-nowrap">
        NEW PRODUCT
      </h4>
      <h1 className="text-4xl md:text-6xl text-center text-white font-medium whitespace-nowrap">
        XX99 MARK II
        <br /> HEADPHONES
      </h1>
      <p className="text-base md:text-lg md:w-2/3 xl:w-[420px] xl:text-left text-center text-gray-400 font-medium max-w-prose">
        Experience natural, lifelike audio and exceptional build quality made
        for the passionate music enthusiast.
      </p>
      <Link
        href="/headphones/xx99-mark-ii"
        className={cn(buttonVariants(), "px-10 py-6 mt-12")}
      >
        SEE PRODUCT
      </Link>
    </div>
  );
}
