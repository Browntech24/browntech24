import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <p className="text-sm font-medium tracking-[0.14em] text-accent uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-pretty text-muted-foreground">
        The page you are looking for does not exist or has moved.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        Back home
      </Link>
    </Container>
  );
}
