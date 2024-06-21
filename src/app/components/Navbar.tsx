import Link from "next/link";
import MenuButton, { MENU_SECTIONS } from "./Menu";
import Cart from "./Cart";
import { Button } from "@/app/components/ui/button";

export default function Navbar() {
  return (
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
  );
}
