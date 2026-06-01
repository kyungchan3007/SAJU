import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../utils";

// [DS] 역할: CTA, 보조 액션, outline/ghost 버튼을 제공하는 공용 버튼 primitive.
// [DS] 현재 사용처: payment, auth/home 계열 버튼 패턴과 신규/수정 UI의 기준 버튼.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-0 bg-saju-gradient text-white shadow-saju-btn hover:-translate-y-0.5 hover:shadow-saju-lg",
        secondary:
          "border border-saju-primary bg-white text-saju-primary shadow-saju-sm hover:bg-saju-light hover:shadow-saju-md",
        outline:
          "border border-surface-border bg-white text-content-secondary hover:border-saju-primary hover:text-saju-primary",
        ghost: "hover:bg-saju-light hover:text-saju-primary",
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

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

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
