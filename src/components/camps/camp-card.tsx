import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { Camp } from "@/types";
import { formatDateRange, formatPrice } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/badge";

export function CampCard({ camp }: { camp: Camp }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-border-subtle bg-card p-6 transition-colors duration-300 hover:border-gold/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-wide text-white">
          {camp.name}
        </h3>
        <StatusBadge status={camp.status} className="shrink-0" />
      </div>
      <dl className="mt-5 space-y-2.5 text-sm text-muted">
        <div className="flex items-center gap-2.5">
          <CalendarDays aria-hidden className="size-4 shrink-0 text-gold" />
          <dt className="sr-only">Dates</dt>
          <dd>{formatDateRange(camp.sessionDates)}</dd>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock aria-hidden className="size-4 shrink-0 text-gold" />
          <dt className="sr-only">Duration</dt>
          <dd>
            {camp.days}-day camp &middot; {formatPrice(camp.pricePence)}
          </dd>
        </div>
      </dl>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
        {camp.description}
      </p>
      <Link
        href={`/football-camps/${camp.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-hover"
      >
        View Details
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}
