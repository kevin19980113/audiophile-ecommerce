import Link from "next/link";
import imageZx9 from "../../../public/assets/home/desktop/image-speaker-zx9.png";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export default function FirstHighlightedProduct() {
  return (
    <div
      className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-16 bg-amber-600 rounded-md 
        px-6 py-16 relative overflow-hidden"
    >
      <div
        className="bg-circle-pattern absolute inset-0 bg-no-repeat
          bg-center bg-contain -top-1/2 lg:top-0 lg:right-1/2"
      ></div>

      <div className="relative max-w-40 md:max-w-52 lg:max-w-80 mx-auto lg:-bottom-20">
        <Image src={imageZx9} alt="ZX9 SPEAKER" className="h-auto" />
      </div>

      <div
        className="flex flex-col items-center lg:items-start justify-center
          text-center lg:text-left gap-y-8 z-10 w-full lg:mt-12"
      >
        <h1 className="text-white font-bold text-4xl md:text-5xl">
          ZX9
          <br />
          SPEAKER
        </h1>
        <p className="text-gray-300 text-sm md:text-base font-medium max-w-prose md:w-1/2 lg:w-2/3">
          Upgrade to premium speakers that are phenomenally build to deliver
          truly remarkable sound.
        </p>
        <Link
          href="/speakers/zx9"
          className={cn(
            buttonVariants(),
            "px-8 py-4 mb-4 bg-black md:px-12 md:py-6 text-sm md:text-base"
          )}
        >
          SEE PRODUCT
        </Link>
      </div>
    </div>
  );
}
