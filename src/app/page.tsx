import MaxWidthWrapper from "./components/MaxWidthWrapper";
import ProductCard from "./components/ProductCard";
import { CATEGORY } from "./data/CategoryData";
import Hero from "./components/Hero";
import HighlightedProducts from "./components/HighlightedProducts";
import Navbar from "./components/Navbar";
import BottomDescription from "./components/BottomDescription";

export default function Home() {
  return (
    <MaxWidthWrapper className="px-8 lg:px-32 flex flex-col">
      <Navbar />
      <div
        className="bg-home-hero-mobile md:bg-home-hero-tablet xl:bg-home-hero-desktop 
      bg-center bg-no-repeat bg-cover absolute h-[900px] inset-0 -z-10 max-w-screen-2xl mx-auto"
      ></div>

      <Hero />

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

      <HighlightedProducts />

      <BottomDescription />
    </MaxWidthWrapper>
  );
}
