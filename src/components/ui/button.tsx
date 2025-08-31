import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "text-white shadow px-6 py-3 bg-gradient-to-r from-[#facc15] to-[#eab308] hover:-translate-y-[1px] hover:shadow-lg focus-visible:ring-accent-500",
        secondary: "px-6 py-3 border-2 border-primary-500 text-primary-500 bg-white hover:bg-primary-50 focus-visible:ring-primary-500",
        ghost: "px-5 py-3 text-neutral-600 hover:text-accent-600 hover:bg-neutral-50 focus-visible:ring-accent-500",
        text: "px-0 py-0 text-accent-500 underline decoration-2 underline-offset-4 hover:text-accent-600 focus-visible:ring-accent-500",
      },
      size: {
        sm: "text-sm px-4 py-2",
        md: "text-base px-6 py-3",
        lg: "text-base px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
