import type { SVGProps } from "react";

/**
 * Facebook "f" logomark.
 * lucide-react no longer ships brand icons, so this is a small inline SVG
 * sized to match lucide's default 24x24 viewBox / currentColor convention.
 */
export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13.5 21v-7.8h2.6l.4-3h-3V8.2c0-.87.24-1.46 1.5-1.46h1.6V4.1C15.9 4.06 15 4 13.9 4c-2.2 0-3.7 1.34-3.7 3.8v2.4H7.6v3h2.6V21h3.3Z" />
    </svg>
  );
}
