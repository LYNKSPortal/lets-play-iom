import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "bg-pitch border-b border-border-subtle px-5 pb-16 pt-36 sm:px-8 md:pb-20 md:pt-44",
        className
      )}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          {eyebrow && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.9] tracking-wide text-white sm:text-6xl md:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {description}
            </p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
