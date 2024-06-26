import { notFound } from "next/navigation";
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

  if (categoryProducts.length === 0) notFound();

  return (
    <>
      <div className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mx-auto py-8 md:py-16 text-center">
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
            key={`${product.name}-${product.id}`}
          />
        ))}
      </div>
    </>
  );
}
