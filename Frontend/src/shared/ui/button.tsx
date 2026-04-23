import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-2 border-black bg-black text-white [box-shadow:3px_3px_0_#000] hover:[box-shadow:1px_1px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px]",
        secondary:
          "border-2 border-black bg-transparent text-black [box-shadow:3px_3px_0_rgba(0,0,0,0.15)] hover:bg-black/5 hover:[box-shadow:1px_1px_0_rgba(0,0,0,0.15)] hover:translate-x-[2px] hover:translate-y-[2px]",
        outline:
          "border-2 border-black bg-transparent text-black hover:bg-black/5",
        ghost: "hover:bg-black/5 hover:text-black",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-11 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
