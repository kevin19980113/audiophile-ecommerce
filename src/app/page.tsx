import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <MaxWidthWrapper className="px-8 lg:px-32">
      <div
        className="bg-home-hero-mobile md:bg-home-hero-tablet lg:bg-home-hero-desktop 
      bg-center bg-no-repeat bg-cover absolute h-[800px] inset-0 -z-10"
      ></div>

      <div className="w-full flex flex-col items-center lg:items-start gap-y-7">
        <h4 className="text-lg text-neutral-500 font-normal mt-56 lg:mt-40 tracking-widest whitespace-nowrap">
          NEW PRODUCT
        </h4>
        <h1 className="text-4xl md:text-6xl text-center text-white font-medium whitespace-nowrap">
          XX99 MARK II
          <br /> HEADPHONES
        </h1>
        <p className="text-base md:text-lg md:w-2/3 lg:w-[420px] lg:text-left text-center text-gray-400 font-medium max-w-prose">
          Experience natural, lifelike audio and exceptional build quality made
          for the passionate music enthusiast.
        </p>
        <Button className="px-10 py-6 bg-orange-400 hover:bg-orange-500 active:bg-orange-400 mt-12">
          SEE PRODUCT
        </Button>
      </div>
    </MaxWidthWrapper>
  );
}
