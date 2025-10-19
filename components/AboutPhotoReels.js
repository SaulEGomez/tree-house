// components/AboutPhotoReels.js
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { urlFor } from "@/sanity/lib/image";

export default function AboutPhotoReels({ data }) {
  const {
    subtitle = "",
    title = "",
    description = "",
    list = [],
    photos = [],
  } = data ?? {};

  const slides = (Array.isArray(photos) ? photos : [])
    .map((img) => {
      const url = img?.url || (img ? urlFor(img).url() : "");
      const ratio =
        typeof img?.ratio === "number"
          ? img.ratio
          : img?.asset?.metadata?.dimensions?.aspectRatio ?? 16 / 9;
      const alt = img?.alt || title || "Photo";
      return { url, ratio, alt };
    })
    .filter((s) => !!s.url);

  const hasSlides = slides.length > 0;
  const [index, setIndex] = useState(0);

  const textRef = useRef(null);
  const inView = useInView(textRef, { once: true });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  const current = hasSlides ? slides[index] : null;

  return (
    <section className="bg-black w-full">
      <div className="w-full py-[140px] px-[40px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* LEFT: text */}
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
            className="my-3 mb-[6px] text-black text-[45px] md:text-[55px] font-semibold leading-tight"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 180 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.2 } : { duration: 1, delay: 0.2 }}
            className="text-gray-600 text-[18px] font-normal mt-2"
          >
            {description}
          </motion.p>

          {Array.isArray(list) &&
            list.map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 180 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={
                  isMobile
                    ? { duration: 0.75, delay: 0.3 + i * 0.1 }
                    : { duration: 1, delay: 0.3 + i * 0.1 }
                }
                className="my-[16px] text-black text-[18px] font-medium"
              >
                {item}
              </motion.p>
            ))}
        </div>

        {/* RIGHT: photo reel */}
        <div className="basis-[47%]">
          <div className="relative w-full overflow-hidden rounded-md shadow-sm">
            <div className="relative w-full" style={{ aspectRatio: current?.ratio ?? 16 / 9 }}>
              {hasSlides ? (
                <img
                  key={index}
                  src={current.url}
                  alt={current.alt}
                  className="absolute inset-0 h-full w-full object-contain bg-black/5"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <p className="text-sm text-gray-700">No photos configured</p>
                </div>
              )}
            </div>

            {hasSlides && (
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-3 bg-gradient-to-t from-black/40 to-transparent">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={prev}
                    className="rounded-md bg-white/90 p-2 hover:bg-white"
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                  <button
                    onClick={next}
                    className="rounded-md bg-white/90 p-2 hover:bg-white"
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pt-1">
                  {slides.map((_, i) => {
                    const active = i === index;
                    return (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={[
                          "h-2 rounded-full transition-all",
                          active ? "w-10 bg-white" : "w-6 bg-white/70 hover:bg-white",
                        ].join(" ")}
                        aria-label={`Go to photo ${i + 1}`}
                        title={`Photo ${i + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
