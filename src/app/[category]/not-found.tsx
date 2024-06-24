import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-white text-2xl md:text-3xl lg:text-4xl font-medium mx-auto py-8 md:py-16">
        NOT FOUND PAGE
      </div>
      <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-8">Not Found</h2>
      <p className="text-base md:text-lg text-muted-foreground font-medium my-8 text-center">
        Could not find requested resource
      </p>
      <Link href="/" className={cn(buttonVariants(), "mb-16")}>
        Return Home
      </Link>
    </div>
  );
}
