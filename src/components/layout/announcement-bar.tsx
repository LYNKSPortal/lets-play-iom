import Link from "next/link";
import { Megaphone } from "lucide-react";
import { announcement } from "@/config/site";

export function AnnouncementBar() {
  if (!announcement.enabled || !announcement.text) return null;
  return (
    <div className="flex items-center justify-center gap-2 border-b border-border-subtle bg-card px-4 py-2 text-center text-xs text-white/80">
      <Megaphone aria-hidden className="size-3.5 shrink-0 text-gold" />
      <span>{announcement.text}</span>
      <Link
        href={announcement.href}
        className="font-semibold text-gold underline-offset-4 hover:underline"
      >
        {announcement.linkLabel}
      </Link>
    </div>
  );
}
