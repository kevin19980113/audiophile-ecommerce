"use client";

import Link from "next/link";
import zx7SpeakerMobile from "../../../public/assets/home/mobile/image-speaker-zx7.jpg";
import zx7SpeakerTablet from "../../../public/assets/home/tablet/image-speaker-zx7.jpg";
import zx7SpeakerDesktop from "../../../public/assets/home/desktop/image-speaker-zx7.jpg";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

export default function SecondHighlightedProduct() {
  const [zx7SpeakerImage, setZx7SpeakerImage] = useState(zx7SpeakerMobile);

  useLayoutEffect(() => {
    const updateImage = () => {
      if (window.innerWidth >= 1024) {
        setZx7SpeakerImage(zx7SpeakerDesktop);
      } else if (window.innerWidth >= 714) {
        setZx7SpeakerImage(zx7SpeakerTablet);
      } else {
        setZx7SpeakerImage(zx7SpeakerMobile);
      }
    };

    updateImage(); // Set the initial image
    window.addEventListener("resize", updateImage); // Update image on resize

    return () => {
      window.removeEventListener("resize", updateImage); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        className="absolute grid grid-cols-1 gap-y-4 left-[7%] sm:left-[10%] top-1/3 sm:top-1/2 md:top-1/3
       md:gap-y-8 xl:gap-y-12 md:left-[8%]"
      >
        <h1 className="text-black text-xl md:text-4xl xl:text-5xl tracking-wide font-bold md:-mt-8">
          ZX7 SPEAKER
        </h1>

        <Link
          href="/speakers/zx7-speaker"
          className="w-36 py-2 bg-transparent text-sm border border-black font-semibold
           whitespace-nowrap text-center hover:bg-gray-100 md:w-52 md:py-4 md:text-base cursor-pointer"
        >
          SEE PRODUCT
        </Link>
      </div>

      <Image
        src={zx7SpeakerImage}
        alt="zx7 Speaker"
        className="rounded-md w-full h-auto"
      />
    </div>
  );
}
