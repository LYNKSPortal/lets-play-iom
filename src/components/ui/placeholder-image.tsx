import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * On-brand placeholder used until authentic photography is supplied.
 * Replace by passing a real `src` to the consuming component.
 */
export function PlaceholderImage({
  label = "Photography coming soon",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-pitch relative flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden bg-card",
        className
      )}
      role="img"
      aria-label={label}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-px bg-border/50"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/50"
      />
      <Image
        src={siteConfig.logo}
        alt=""
        width={72}
        height={62}
        className="relative h-14 w-auto opacity-60"
      />
      <span className="relative text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
        {label}
      </span>
    </div>
  );
}
