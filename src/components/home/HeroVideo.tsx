"use client";

import { useEffect, useRef } from "react";

/** Downloads nothing until the video is about to scroll into view, and pauses once it leaves. */
export function HeroVideo({ poster, av1Src, h264Src }: { poster: string; av1Src: string; h264Src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React can skip this when hydrating, and browsers refuse to start unmuted video by themselves.
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // A refused play() (e.g. iOS Low Power Mode) just leaves the poster showing.
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "50% 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video-slide__plate"
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
    >
      {/* Browsers that can't decode AV1 skip this source and use the H.264 file. */}
      <source src={av1Src} type='video/mp4; codecs="av01.0.05M.08"' />
      <source src={h264Src} type="video/mp4" />
    </video>
  );
}
