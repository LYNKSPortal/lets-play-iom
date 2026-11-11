import { cn } from "@/lib/utils";

const steps = ["Camp", "Parent", "Player", "Review", "Confirmation"];

export function BookingStepper({ current }: { current: number }) {
  return (
    <ol className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-3 text-xs font-semibold uppercase tracking-widest">
      {steps.map((label, i) => {
        const step = i + 1;
        const active = step === current;
        const done = step < current;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full border text-[11px]",
                active && "border-gold bg-gold text-black",
                done && "border-gold/40 bg-gold/10 text-gold",
                !active && !done && "border-border text-muted"
              )}
            >
              {step}
            </span>
            <span className={cn(active ? "text-white" : "text-muted")}>
              {label}
            </span>
            {step < steps.length && (
              <span aria-hidden className="mx-1 h-px w-5 bg-border sm:w-8" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
