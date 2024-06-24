import { buttonVariants } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const MENU_SECTIONS = [
  { name: "home", href: "/" },
  { name: "headphones", href: "/headphones" },
  { name: "speakers", href: "/speakers" },
  { name: "earphones", href: "/earphones" },
];

export default async function MenuButton() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <Sheet>
      <SheetTrigger className="xl:hidden group">
        <Menu className="text-white size-6 group-hover:text-slate-400" />
      </SheetTrigger>

      <SheetContent side="left" className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold mr-auto mb-4">
            Menu
          </SheetTitle>
          <SheetDescription className="text-base font-medium">
            Welcome Audiophile
          </SheetDescription>
        </SheetHeader>

        <ul className="mt-8">
          {MENU_SECTIONS.map((section) => (
            <li key={`${section.href}-${section.name}`} className="w-full">
              <SheetTrigger className="w-full group" asChild>
                <Link
                  href={section.href}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "lg",
                    }),
                    "w-full text-lg font-medium text-muted-foreground group-hover:text-black"
                  )}
                >
                  {section.name.toUpperCase()}
                </Link>
              </SheetTrigger>

              <div className="border-t border-black w-full my-4"></div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-y-4 mt-16">
          {!user && (
            <>
              {" "}
              <LoginLink
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-black bg-gray-200 hover:bg-slate-300"
                )}
              >
                Sign in
              </LoginLink>
              <RegisterLink
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-black bg-gray-200 hover:bg-slate-300"
                )}
              >
                Create Account
              </RegisterLink>
            </>
          )}

          {user && (
            <LogoutLink
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-black bg-gray-200 hover:bg-slate-300"
              )}
            >
              Sign Out
            </LogoutLink>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
