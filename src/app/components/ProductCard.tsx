import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function ProductCard({
  category,
  href,
  image,
}: {
  category: string;
  href: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="relative w-full flex flex-col justify-center items-center gap-y-2 flex-shrink-0 py-8
    group hover:scale-105 tansition-scale duration-300 ease cursor-pointer"
    >
      <div className="w-full h-36 md:h-44 lg:h-52 relative">
        <Image
          src={image}
          alt={category}
          fill
          className="object-contain object-center absolute drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
        />
      </div>

      <div className="bg-gray-100 absolute inset-0 -z-10 rounded-lg top-1/3"></div>

      <h3 className="text-lg md:text-xl font-bold tracking-wide top-1/2 inset-0">
        {category.toUpperCase()}
      </h3>
      <div
        className="flex gap-x-2 items-center text-muted-foreground font-medium group-hover:underline
      underline-offset-4"
      >
        Shop{" "}
        <ChevronRight className="size-5 text-orange-500 group-hover:text-orange-700" />
      </div>
    </Link>
  );
}
