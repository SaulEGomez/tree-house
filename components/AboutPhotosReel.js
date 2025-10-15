// components/AboutPhotosReel.js
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi";
import { urlFor } from "@/sanity/lib/image";

export default function AboutPhotosReel({ data }) {
  const {
    subtitle = "",
    title = "",
    description = "",
    list = [],
    videos = [],
  } = data || {};

  const clips = (videos || [])
    .map((v) => {
      const src = v?.fileUrl || v?.src || v?.video?.asset?.url || "";
      const poster = v?.posterUrl || (v?.poster && v.poster.asset ? urlFor(v.poster).url() : v?.poster || "");
      return { src, poster, label: v?.label || "" };
    })
    .filter((c) => !!c.src);

  const hasClips = clips.length > 0;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);

  const textRef = useRef(null);
  const inView = useInView(textRef, { once: true });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.load();
    if (playing) {
      el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const onTogglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.muted = false;
      el.volume = 1.0;
      setMuted(false);
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const prev = () => setIndex((i) => (i - 1 + clips.length) % clips.length);
  const next = () => setIndex((i) => (i + 1) % clips.length);
  const current = hasClips ? clips[index] : null;

  return (
    <section className="bg-black w-full">
      <div className="w-full py-[140px] px-[40px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* LEFT: video */}
        <div className="basis-[47%]">
          <div className="relative w-full overflow-hidden rounded-md shadow-sm">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              {hasClips ? (
                <video
                  key={index}
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={current.src}
                  poster={current.poster || undefined}
                  muted={muted}
                  playsInline
                  preload="metadata"
                  controls={false}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <p className="text-sm text-gray-200">No videos configured</p>
                </div>
              )}
            </div>

            {hasClips && (
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-3 bg-gradient-to-t from-black/50 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onTogglePlay}
                      className="inline-flex items-center gap-2 rounded-md bg-white/90 px-3 py-1 text-sm font-medium hover:bg-white"
                    >
                      {playing ? <FiPause /> : <FiPlay />}
                      {playing ? "Pause" : "Play"}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="inline-flex items-center gap-2 rounded-md bg-white/90 px-3 py-1 text-sm font-medium hover:bg-white"
                      aria-label={muted ? "Unmute video" : "Mute video"}
                      title={muted ? "Unmute" : "Mute"}
                    >
                      {muted ? <FiVolumeX /> : <FiVolume2 />}
                      {muted ? "Unmute" : "Mute"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={prev} className="rounded-md bg-white/90 p-2 hover:bg-white" aria-label="Previous clip">
                      <FiChevronLeft />
                    </button>
                    <button onClick={next} className="rounded-md bg-white/90 p-2 hover:bg-white" aria-label="Next clip">
                      <FiChevronRight />
                    </button>
                  </div>
                </div>

                {/* dots */}
                <div className="flex items-center gap-2 overflow-x-auto pt-1">
                  {clips.map((c, i) => {
                    const active = i === index;
                    return (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={[
                          "h-2 rounded-full transition-all",
                          active ? "w-10 bg-white" : "w-6 bg-white/60 hover:bg-white/80",
                        ].join(" ")}
                        aria-label={c.label ? `Go to ${c.label}` : `Go to clip ${i + 1}`}
                        title={c.label || `Clip ${i + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: text */}
        <div ref={textRef} className="flex basis-[47%] flex-col items-start">
          <motion.span
            initial={{ opacity: 0, y: 180 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
            className="text-green-600 tracking-wider text-[20px]"
          >
            {subtitle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 180 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.1 }}
            className="my-3 mb-[6px] text-white text-[45px] md:text-[55px] font-semibold leading-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 180 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.2 } : { duration: 1, delay: 0.2 }}
            className="text-white text-[18px] font-normal mt-2"
          >
            {description}
          </motion.p>

          {Array.isArray(list) &&
            list.map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 180 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={isMobile ? { duration: 0.75, delay: 0.3 + i * 0.1 } : { duration: 1, delay: 0.3 + i * 0.1 }}
                className="my-[16px] text-white text-[18px] font-medium"
              >
                {item}
              </motion.p>
            ))}
        </div>
      </div>
    </section>
  );
}
