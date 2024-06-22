import ProductReel from "../components/ProductReel";
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
    <>
      <div className="absolute inset-0 bg-black h-[170px] md:h-[250px] -z-10 max-w-screen-2xl mx-auto"></div>

      <div className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mx-auto py-8 md:py-16">
        {params.category.toUpperCase()}
      </div>

      <div className="grid grid-cols-1 py-12">
        {categoryProducts.map((product) => (
          <ProductReel
            image={product.image.desktop}
            title={product.name}
            description={product.description}
            isNew={product.new}
            slug={product.slug}
            category={params.category}
            id={product.id}
          />
        ))}
      </div>
    </>
  );
}
