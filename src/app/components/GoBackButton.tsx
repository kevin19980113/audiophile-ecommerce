"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <Button
      className="text-muted-foreground text-base md:text-lg mr-auto mt-6 -ml-6 flex items-center"
      variant="link"
      onClick={() => router.back()}
    >
      <ChevronLeft className="size-5" /> Go back
    </Button>
  );
}
