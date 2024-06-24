import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Price from "./Price";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ProductsReelProps = {
  image: string;
  title: string;
  description: string;
  isNew: boolean;
  slug: string;
  category: string;
  price?: number;
  id: number;
};
export default function ProductReel({
  image,
  title,
  description,
  isNew,
  slug,
  category,
  price,
  id,
}: ProductsReelProps) {
  return (
    <div
      className={`grid grid-cols-1 ${
        price ? "md:grid-cols-2 md:space-x-6" : "lg:grid-cols-2"
      } lg:space-x-8 items-center my-12 ${isNew ? "row-start-1" : ""}`}
    >
      <div
        className={`${
          price ? "w-full md:w-full lg:w-10/12" : "w-full sm:w-1/2 lg:w-3/4"
        } md:mx-auto mb-12 lg:mb-0 mx-auto`}
      >
        <div className="w-full h-[250px] md:h-[400px] rounded-md relative">
          <Image
            src={image}
            alt={title}
            fill
            className="absolute object-contain"
          />
        </div>
      </div>

      <div
        className={`w-full flex flex-col gap-y-4 items-center justify-center 
      ${price ? "md:items-start" : "lg:items-start"}`}
      >
        {isNew && (
          <div className="text-orange-600 tracking-widest text-lg lg:text-xl text-center">
            NEW PRODUCT
          </div>
        )}
        <h1
          className={`w-48 xl:w-60 text-xl md:text-2xl xl:text-3xl font-bold tracking-wide text-center  
        ${price ? "md:text-left" : "lg:text-left"}`}
        >
          {title.toUpperCase()}
        </h1>
        <p
          className={`text-muted-foreground text-sm lg:text-base md:pr-6 text-center lg:w-[400px] 
         ${price ? "md:text-left" : "lg:text-left"}`}
        >
          {description}
        </p>
        {price ? (
          <Price
            price={price}
            product={{
              id: id,
              name: title,
              slug: slug,
              image: image,
              price: price,
            }}
          />
        ) : (
          <Link
            href={`${category}/${slug}`}
            className={cn(
              buttonVariants(),
              "mt-4 xl:text-base xl:px-8 xl:py-6"
            )}
          >
            SEE PRODUCT
          </Link>
        )}
      </div>
    </div>
  );
}
