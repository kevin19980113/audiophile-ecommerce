import MaxWidthWrapper from "../components/MaxWidthWrapper";
import Navbar from "../components/Navbar";
import ProductsReel from "../components/ProductsReel";
import productData from "../data/data.json";

export default function CategoryPage({
  params,
}: {
  params: {
    category: string;
  };
}) {
  const categoryProducts = productData.filter(
    (product) => product.category === params.category.toLowerCase()
  );

  return (
    <MaxWidthWrapper className="px-8 lg:px-32 flex flex-col">
      <div className="absolute inset-0 bg-black h-[170px] md:h-[250px] -z-10"></div>

      <Navbar />

      <div className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mx-auto py-8 md:py-16">
        {params.category.toUpperCase()}
      </div>

      <div className="grid grid-cols-1 py-12">
        {categoryProducts.map((product) => (
          <ProductsReel
            image={product.image.desktop}
            title={product.name}
            description={product.description}
            isNew={product.new}
            slug={product.slug}
            category={params.category}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
