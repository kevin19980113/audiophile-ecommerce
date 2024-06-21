import FirstHighlightedProduct from "./FirstHighlightedProduct";
import SecondHighlightedProduct from "./SecondHighlightedProduct";
import ThirdHighlightedProduct from "./ThirdHighlightedProduct";

export default function HighlightedProducts() {
  return (
    <div className="flex-grow flex flex-col gap-y-6 items-center py-16">
      <FirstHighlightedProduct />
      <SecondHighlightedProduct />
      <ThirdHighlightedProduct />
    </div>
  );
}
