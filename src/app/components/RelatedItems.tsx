import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import productsData from "@/app/data/data.json";
import Image from "next/image";

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
  const relatedItemCategory = others.map((other) => {
    return productsData.find((product) => product.slug === other.slug)
      ?.category;
  });

  return (
    <div className="w-full flex flex-col items-center gap-y-6 mt-16 -mb-44">
      <h1 className="text-xl md:text-2xl font-bold">YOU MAY ALSO LIKE</h1>

      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-10 xl:gap-x-24">
        {others.map((other, index) => (
          <div key={other.name} className="flex flex-col items-center gap-y-6">
            <div className="rounded-md w-full h-full">
              <Image
                src={other.image.desktop}
                alt={other.name}
                width={250}
                height={250}
                layout="responsive"
                className="rounded-md"
              />
            </div>

            <h1 className="text-xl lg:text-2xl font-semibold">
              {other.name.toUpperCase()}
            </h1>
            <Link
              href={`/${relatedItemCategory[index]}/${other.slug}`}
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
