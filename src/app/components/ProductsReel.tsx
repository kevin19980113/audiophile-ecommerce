import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

type ProductsReelProps = {
  image: string;
  title: string;
  description: string;
  isNew: boolean;
  slug: string;
  category: string;
};
export default function ProductsReel({
  image,
  title,
  description,
  isNew,
  slug,
  category,
}: ProductsReelProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 lg:space-x-8 items-center my-12 ${
        isNew ? "row-start-1" : ""
      }`}
    >
      <div className="w-full sm:w-1/2 lg:w-3/4 md:mx-auto mb-12 lg:mb-0 mx-auto">
        <img src={image} alt={title} className="w-full h-auto rounded-md" />
      </div>

      <div className="w-full flex flex-col gap-y-4 items-center justify-center lg:items-start">
        {isNew && (
          <div className="text-orange-600 tracking-widest text-lg lg:text-xl text-center">
            NEW PRODUCT
          </div>
        )}
        <h1 className="w-48 xl:w-60 text-xl md:text-2xl xl:text-3xl font-bold tracking-wide text-center lg:text-left">
          {title.toUpperCase()}
        </h1>
        <p className="text-muted-foreground text-sm lg:text-base max-w-prose lg:w-[400px] text-center lg:text-left">
          {description}
        </p>
        <Link href={`${category}/${slug}`}>
          <Button className="mt-4 xl:text-lg xl:px-8 xl:py-6">
            SEE PRODUCT
          </Button>
        </Link>
      </div>
    </div>
  );
}
