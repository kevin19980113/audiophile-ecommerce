import Link from "next/link";
import ProductsData from "../../data/data.json";
import { buttonVariants } from "@/app/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductReel from "@/app/components/ProductReel";
import { CATEGORY } from "@/app/data/CategoryData";
import ProductCard from "@/app/components/ProductCard";
import BottomDescription from "@/app/components/BottomDescription";
import Features from "@/app/components/Features";
import Gallery from "@/app/components/Gallery";
import RelatedItems from "@/app/components/RelatedItems";
import { notFound } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: {
    productCode: string;
  };
}) {
  const productData = ProductsData.find(
    (product) => product.slug === params.productCode
  );

  if (!productData) return notFound();

  return (
    <>
      <div className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mx-auto py-8 md:py-16">
        PRODUCT DETAILS
      </div>

      <Link
        href={`/${productData?.category}`}
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-muted-foreground text-base md:text-lg mr-auto mt-6 -ml-6 flex items-center"
        )}
      >
        <ChevronLeft /> Go back
      </Link>

      <ProductReel
        image={productData.image.desktop}
        title={productData.name}
        description={productData.description}
        isNew={productData.new}
        slug={productData.slug}
        category={productData.category}
        price={productData.price}
        id={productData.id}
      />

      <Features
        features={productData.features}
        includes={productData.includes}
      />

      <Gallery gallery={productData.gallery} />

      <RelatedItems others={productData.others} />

      <div
        className="flex-grow grid grid-cols-1 md:grid-cols-3 md:gap-x-12
      justify-between items-center mt-[240px] mb-16"
      >
        {CATEGORY.map((category) => (
          <ProductCard
            category={category.category}
            href={category.href}
            image={category.image}
          />
        ))}
      </div>

      <BottomDescription />
    </>
  );
}
