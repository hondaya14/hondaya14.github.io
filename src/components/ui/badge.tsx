import React from "react";
import clsx from "clsx";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-foreground",
    secondary: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
