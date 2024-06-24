import Link from "next/link";
import MenuButton, { MENU_SECTIONS } from "./Menu";
import Cart from "./Cart";
import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-x-2 border-b border-neutral-600 py-4 md:py-6",
        className
      )}
    >
      <MenuButton />

      <Link href="/" className="text-white font-bold text-2xl">
        aduiophile
      </Link>

      <div className="gap-x-6 text-base font-medium hidden lg:flex">
        {MENU_SECTIONS.map((section) => (
          <Link
            href={section.href}
            className={cn(buttonVariants({ variant: "link" }), "text-white")}
            key={section.name}
          >
            {section.name.toUpperCase()}
          </Link>
        ))}
      </div>

      <Cart />
    </div>
  );
}
