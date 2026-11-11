"use client";

import { useEffect, useState } from "react";
import { MuxBackgroundVideo } from "@mux/mux-background-video/react";

const MUX_PLAYBACK_ID = "txw5vgbcCQIsVbOydQyuderPAFCC01yszgYjSDRdSzB8";

/**
 * Full-bleed Mux-hosted background video for the homepage hero.
 * Falls back to a static poster frame when the visitor has requested
 * reduced motion, so no autoplaying video is forced on them.
 */
export function HeroVideo() {
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const poster = `https://image.mux.com/${MUX_PLAYBACK_ID}/thumbnail.webp?time=0`;

  if (reduceMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <MuxBackgroundVideo
      src={`https://stream.mux.com/${MUX_PLAYBACK_ID}.m3u8`}
      className="absolute inset-0 h-full w-full [&_video]:h-full [&_video]:w-full [&_video]:object-cover"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="h-full w-full object-cover" />
    </MuxBackgroundVideo>
  );
}
