import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/types";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest",
  {
    variants: {
      variant: {
        available: "border-gold/40 bg-gold/10 text-gold",
        limited: "border-amber-400/40 bg-amber-400/10 text-amber-300",
        "fully-booked": "border-white/20 bg-white/5 text-white/70",
        "coming-soon": "border-white/20 bg-white/5 text-white/70",
        completed: "border-white/15 bg-white/5 text-muted",
        neutral: "border-border bg-card text-muted",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

const statusLabels: Record<AvailabilityStatus, string> = {
  available: "Available",
  limited: "Limited Spaces",
  "fully-booked": "Fully Booked",
  "coming-soon": "Coming Soon",
  completed: "Completed",
};

function StatusBadge({
  status,
  className,
}: {
  status: AvailabilityStatus;
  className?: string;
}) {
  return (
    <Badge variant={status} className={className}>
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          status === "available" && "bg-gold",
          status === "limited" && "bg-amber-300",
          (status === "fully-booked" ||
            status === "coming-soon" ||
            status === "completed") &&
            "bg-white/40"
        )}
      />
      {statusLabels[status]}
    </Badge>
  );
}

export { Badge, badgeVariants, StatusBadge };
