import Link from "next/link";
import MenuButton, { MENU_SECTIONS } from "./Menu";
import Cart from "./Cart";
import { Button } from "@/app/components/ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function Navbar() {
  return (
    <MaxWidthWrapper className="px-4 md:px-8 lg:px-32 fixed backdrop-blur-lg custom-backdrop-blur">
      <div
        className="w-full flex items-center justify-between gap-x-2  
        border-b border-neutral-600 py-4 md:py-6"
      >
        <MenuButton />

        <Link href="/" className="text-white font-bold text-2xl">
          aduiophile
        </Link>

        <div className="gap-x-6 text-base font-medium hidden lg:flex">
          {MENU_SECTIONS.map((section) => (
            <Button variant="link">
              <Link href={section.href} className="text-white">
                {section.name.toUpperCase()}
              </Link>
            </Button>
          ))}
        </div>

        <Cart />
      </div>
    </MaxWidthWrapper>
  );
}
