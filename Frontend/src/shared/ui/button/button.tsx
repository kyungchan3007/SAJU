import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-0 text-white [background:linear-gradient(to_right,#5956E9,#7C3AED)] [box-shadow:0_4px_14px_rgba(89,86,233,0.35)] hover:[box-shadow:0_6px_20px_rgba(89,86,233,0.45)] hover:-translate-y-0.5",
        secondary:
          "border border-[#5956E9] bg-white text-[#5956E9] [box-shadow:0_2px_8px_rgba(89,86,233,0.10)] hover:bg-[#F0EEFF] hover:[box-shadow:0_4px_12px_rgba(89,86,233,0.15)]",
        outline:
          "border border-[#E5E7EB] bg-white text-[#374151] hover:border-[#5956E9] hover:text-[#5956E9]",
        ghost: "hover:bg-[#F0EEFF] hover:text-[#5956E9]",
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
