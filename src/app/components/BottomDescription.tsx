"use client";

import Image from "next/image";
import descriptionImageMobile from "../../../public/assets/shared/desktop/image-best-gear.jpg";
import descriptionImageTablet from "../../../public/assets/shared/tablet/image-best-gear.jpg";
import descriptionImageDesktop from "../../../public/assets/shared/desktop/image-best-gear.jpg";
import { useLayoutEffect, useState } from "react";
export default function BottomDescription() {
  const [descriptionImage, setDescriptionImage] = useState(
    descriptionImageMobile
  );

  useLayoutEffect(() => {
    const updateImage = () => {
      if (window.innerWidth >= 1280) {
        setDescriptionImage(descriptionImageDesktop);
      } else if (window.innerWidth >= 714) {
        setDescriptionImage(descriptionImageTablet);
      } else {
        setDescriptionImage(descriptionImageMobile);
      }
    };

    updateImage(); // Set the initial image
    window.addEventListener("resize", updateImage); // Update image on resize

    return () => {
      window.removeEventListener("resize", updateImage); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center xl:flex-row-reverse gap-y-10 gap-x-10 py-16 mb-16">
      <div className="relattive w-full">
        <Image
          src={descriptionImage}
          alt="best gear"
          className="w-full h-auto rounded-md"
        />
      </div>

      <div className="flex flex-col items-center w-full space-y-6 xl:items-start">
        <h1
          className="text-center text-xl md:text-3xl xl:text-5xl font-semibold 
        tracking-normal w-[200px] md:w-[400px] xl:w-[500px] xl:text-left"
        >
          BRINGING YOU THE <span className="text-orange-600">BEST</span> AUDIO
          GEAR
        </h1>
        <p
          className="text-center text-sm max-w-prose text-muted-foreground font-medium 
        xl:text-left xl:w-[550px] lg:text-lg"
        >
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
    </div>
  );
}
