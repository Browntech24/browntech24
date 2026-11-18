import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
        secondary: "border border-border bg-surface text-foreground hover:bg-surface-2",
        ghost: "text-foreground hover:bg-surface",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-3.5 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ComponentProps<"button"> & ButtonBaseProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & ButtonBaseProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
