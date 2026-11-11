import Image from "next/image";
import type { Coach } from "@/types";
import { PlaceholderImage } from "@/components/ui/placeholder-image";

export function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border-subtle bg-card transition-colors duration-300 hover:border-gold/40">
      <div className="relative aspect-4/5 overflow-hidden">
        {coach.image ? (
          <Image
            src={coach.image}
            alt={`Portrait of ${coach.name}`}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderImage label={`Photo of ${coach.name} coming soon`} />
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
          {coach.name}
        </h3>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
          {coach.role}
        </p>
        {coach.bio && (
          <p className="mt-3 text-sm leading-relaxed text-muted">{coach.bio}</p>
        )}
      </div>
    </article>
  );
}
