import Link from "next/link";
import MenuButton, { MENU_SECTIONS } from "./Menu";
import Cart from "./Cart";
import { buttonVariants } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar({ className }: { className?: string }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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

      <div className="gap-x-6 text-base font-medium hidden xl:flex mx-auto">
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

      <div className="hidden items-center gap-x-4 xl:flex ml-auto mr-4">
        {!user && (
          <>
            <RegisterLink
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-white"
              )}
            >
              Create Account
            </RegisterLink>
            <div className="bg-white h-8 w-px"></div>
            <LoginLink
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-white"
              )}
            >
              Sign in
            </LoginLink>
          </>
        )}

        {user && (
          <LogoutLink
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-white"
            )}
          >
            Sign Out
          </LogoutLink>
        )}
      </div>

      <Cart />
    </div>
  );
}
