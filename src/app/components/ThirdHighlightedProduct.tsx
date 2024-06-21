import Image from "next/image";
import yx1EarphonesImage from "../../../public/assets/home/desktop/image-earphones-yx1.jpg";
import Link from "next/link";
export default function ThirdHighlightedProduct() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-8">
      <div className="relative w-full">
        <Image
          src={yx1EarphonesImage}
          alt="Yx1 Earphones"
          className="rounded-md w-full h-full"
        />
      </div>

      <div
        className="bg-gray-100 flex flex-col items-start justify-center gap-y-5
      md:gap-y-8 rounded-md px-8 md:px-12 xl:px-16 py-12"
      >
        <h1 className="text-black text-xl md:text-2xl xl:text-4xl tracking-wide font-bold whitespace-nowrap">
          YX1 EARPHONES
        </h1>
        <Link
          href="/earphones/yx1"
          className="w-36 py-2 bg-transparent text-sm border border-black font-semibold
           whitespace-nowrap text-center hover:bg-white lg:w-52 lg:py-4 lg:text-base cursor-pointer"
        >
          SEE PRODUCT
        </Link>
      </div>
    </div>
  );
}
