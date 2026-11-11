"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function MobileNavigation({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-border bg-surface shadow-2xl duration-300 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right"
        >
          <DialogPrimitive.Title className="sr-only">
            Navigation menu
          </DialogPrimitive.Title>
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Image
              src={siteConfig.logo}
              alt="Let's Play"
              width={40}
              height={34}
              className="h-12 w-auto"
            />
            <DialogPrimitive.Close className="flex size-10 items-center justify-center rounded-md text-white transition-colors hover:bg-card">
              <X className="size-6" />
              <span className="sr-only">Close menu</span>
            </DialogPrimitive.Close>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-4 py-3.5 font-display text-2xl font-semibold uppercase tracking-wide transition-colors",
                        active ? "text-gold" : "text-white hover:text-gold"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-border p-5">
            <Button asChild size="lg" className="w-full">
              <Link href="/football-camps">Book Now</Link>
            </Button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 block text-center text-sm text-muted hover:text-gold"
            >
              {siteConfig.email}
            </a>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
