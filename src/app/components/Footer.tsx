import Link from "next/link";
import { MENU_SECTIONS } from "./Menu";
import { Button } from "./ui/button";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import MaxWidthWrapper from "./MaxWidthWrapper";
export default function Footer() {
  return (
    <div
      className="w-full flex flex-col items-center gap-y-10 bg-gray-950 pb-16 md:items-start
     px-8 md:px-16 lg:px-32"
    >
      <div className="w-[150px] h-1 bg-orange-500"></div>

      <div className="flex flex-col items-center gap-y-8 md:items-start xl:flex-row w-full justify-between">
        <h1 className="text-white font-bold text-2xl lg:text-3xl">
          aduiophile
        </h1>

        <div className="flex flex-col items-center justify-center gap-y-2 md:flex-row md:gap-x-2 md:-ml-4 xl:-mr-4">
          {MENU_SECTIONS.map((section) => (
            <Button variant="link">
              <Link href={section.href} className="text-white">
                {section.name.toUpperCase()}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <p className="max-w-prose text-gray-500 text-center text-sm xl:text-base md:text-left">
        {" "}
        Audiophile is an all in one stop to fulfill your audio needs. We're a
        small team of music lovers and sound specialists who are devoted to
        helping you get the most out of personal audio. Come and visit our demo
        facility - we’re open 7 days a week.
      </p>

      <div className="flex flex-col items-center md:flex-row justify-between w-full gap-y-8">
        <div className="text-gray-500 text-center text-sm xl:text-base row-start-2 col-start-1">
          Copyright 2021. All Rights Reserved
        </div>

        <div className="flex gap-x-6 items-center text-white">
          <a href="#">
            <FaFacebookSquare className="size-6 hover:text-orange-600 cursor-pointer xl:size-8" />
          </a>
          <a href="#">
            <FaXTwitter className="size-6 hover:text-orange-600 cursor-pointer xl:size-8" />
          </a>
          <a href="#">
            <FaInstagram className="size-6 hover:text-orange-600 cursor-pointer xl:size-8" />
          </a>
        </div>
      </div>
    </div>
  );
}
