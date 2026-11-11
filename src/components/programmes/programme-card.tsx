import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Programme } from "@/types";
import { StatusBadge } from "@/components/ui/badge";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function ProgrammeCard({ programme }: { programme: Programme }) {
  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-xl border border-border-subtle bg-card transition-colors duration-300 hover:border-gold/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:min-h-[440px]"
    >
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        {programme.image ? (
          <Image
            src={programme.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <PlaceholderImage label={programme.category} />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
      <div className="absolute left-5 top-5">
        <StatusBadge status={programme.status} />
      </div>
      <div className="relative p-6 md:p-8">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
          {programme.category}
        </p>
        <h3 className="font-display text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
          {programme.name}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
          {programme.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">
          Explore Programme
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </span>
      </div>
    </Link>
  );
}
