import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type RelatedItemsProps = {
  others: {
    slug: string;
    name: string;
    image: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }[];
};

export default function RelatedItems({ others }: RelatedItemsProps) {
  return (
    <div className="w-full flex flex-col items-center gap-y-6 mt-16 -mb-44">
      <h1 className="text-xl md:text-2xl font-bold">YOU MAY ALSO LIKE</h1>

      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-10">
        {others.map((other) => (
          <div key={other.name} className="flex flex-col items-center gap-y-6">
            <img
              src={other.image.desktop}
              alt={other.name}
              className="rounded-md w-full h-full"
            />
            <h1 className="text-xl lg:text-2xl font-semibold">
              {other.name.toUpperCase()}
            </h1>
            <Link
              href={`${other.slug}`}
              className={cn(buttonVariants(), "lg:px-8")}
            >
              SEE PRODUCT
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
