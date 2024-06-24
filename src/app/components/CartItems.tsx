import { formatPrice } from "@/lib/utils";
import { useCart } from "../hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";

export default function CartItems({ mode }: { mode: "checkout" | "cart" }) {
  const { items, addItem, removeItem } = useCart();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  return (
    <>
      <ScrollArea className="w-full max-h-60 md:max-h-80 flex flex-col items-center pr-3">
        <div className="w-full flex flex-col items-center gap-y-6">
          {items.map((item) => (
            <div
              key={`${item.product.name}-${item.product.id}`}
              className="w-full flex items-center justify-between gap-x-6"
            >
              <div className="flex items-center gap-x-3 w-full">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="size-12 md:size-20 xl:size-24 rounded-md"
                />

                <div className="flex items-start justify-between gap-x-4 w-full">
                  <div className="flex flex-col items-start">
                    <h1 className="text-xs xl:text-sm font-semibold">
                      {item.product.name}
                    </h1>
                    <span className="text-xs xl:text-sm font-medium text-muted-foreground">
                      {formatPrice({
                        price: item.product.price,
                        options: { maximumFractionDigits: 0 },
                      })}
                    </span>
                  </div>

                  {mode === "checkout" && (
                    <div className="text-muted-foreground font-medium text-xs md:text-sm xl:text-base">
                      x{item.quantity}
                    </div>
                  )}
                </div>
              </div>

              {mode === "cart" && (
                <div className="w-1/3 grid grid-cols-3 items-center bg-gray-100 col-span-1 text-xs sm:text-sm">
                  <button
                    className="px-2 py-1 h-full flex items-center justify-center hover:bg-slate-200 cursor-pointer
                  sm:px-3 sm:py-2"
                    onClick={() => removeItem(item.product)}
                  >
                    -
                  </button>
                  <div className="px-2 h-full flex items-center justify-center">
                    {item.quantity}
                  </div>
                  <button
                    className="px-2 h-full flex items-center justify-center hover:bg-slate-200 cursor-pointer"
                    onClick={() => addItem(item.product, 1)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="w-full flex flex-col items-center gap-y-4">
        <div className="w-full flex items-center justify-between gap-x-4">
          <span className="text-sm xl:text-lg font-medium text-muted-foreground">
            TOTAL
          </span>
          <span className="text-sm xl:text-lg font-bold">
            {formatPrice({
              price: totalPrice,
              options: { maximumFractionDigits: 2 },
            })}
          </span>
        </div>

        {mode === "checkout" && (
          <>
            <div className="w-full flex items-center justify-between gap-x-4">
              <span className="text-sm xl:text-lg font-medium text-muted-foreground">
                SHIPPING
              </span>
              <span className="text-sm xl:text-lg font-bold">
                {formatPrice({
                  price: 1,
                  options: { maximumFractionDigits: 0 },
                })}
              </span>
            </div>

            <div className="w-full flex items-center justify-between gap-x-4">
              <span className="text-sm xl:text-lg font-medium text-muted-foreground">
                TAX (13%)
              </span>
              <span className="text-sm xl:text-lg font-bold">
                {formatPrice({
                  price: totalPrice * 0.13,
                  options: { maximumFractionDigits: 2 },
                })}
              </span>
            </div>

            <div className="w-full flex items-center justify-between mt-6 gap-x-4">
              <span className="text-sm xl:text-lg font-medium text-muted-foreground">
                GRAND TOTAL
              </span>
              <span className="text-sm xl:text-lg font-bold">
                {formatPrice({ price: totalPrice * 1.13, options: {} })}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
