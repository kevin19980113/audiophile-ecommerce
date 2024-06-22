"use client";

import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import { useCart } from "../hooks/use-cart";
import { useState } from "react";
import productsData from "../data/data.json";

export default function Price({
  price,
  product,
}: {
  price: number;
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: number;
  };
}) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center md:items-start gap-y-4">
      <h3 className="text-lg font-bold">
        {formatPrice({ price: price, options: {} })}
      </h3>

      <div className="grid grid-cols-3 gap-x-2 w-64 sm:w-80">
        <div className="grid grid-cols-3 items-center bg-gray-100 col-span-1">
          <button
            className="px-3 h-full flex items-center justify-center hover:bg-slate-200 cursor-pointer"
            onClick={decrement}
          >
            -
          </button>
          <div className="px-3 h-full flex items-center justify-center">
            {quantity}
          </div>
          <button
            className="px-3 h-full flex items-center justify-center hover:bg-slate-200 cursor-pointer"
            onClick={increment}
          >
            +
          </button>
        </div>

        <Button
          className="col-span-2"
          onClick={() => addItem(product, quantity)}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
}
