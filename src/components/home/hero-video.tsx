"use client";

import { useEffect, useState } from "react";
import MuxVideo from "@mux/mux-video/react";

const MUX_PLAYBACK_ID = "txw5vgbcCQIsVbOydQyuderPAFCC01yszgYjSDRdSzB8";

/**
 * Full-bleed Mux-hosted background video for the homepage hero.
 *
 * Uses `@mux/mux-video`, which plays HLS natively on Safari/iOS and via
 * hls.js elsewhere — this is Mux's mature, broadly-compatible player
 * element (as opposed to the newer `@mux/mux-background-video`, which
 * relies on MediaSource/ManagedMediaSource and has inconsistent mobile
 * support).
 *
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
        className="hero-video-frame absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <MuxVideo
      playbackId={MUX_PLAYBACK_ID}
      streamType="on-demand"
      poster={poster}
      muted
      autoplay
      loop
      playsInline
      preload="auto"
      disableTracking
      disablePictureInPicture
      disableRemotePlayback
      className="hero-video-frame absolute inset-0 h-full w-full object-cover"
    />
  );
}
