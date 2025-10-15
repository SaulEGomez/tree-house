"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import quotesimg from "@/assets/quote-svgrepo-com.svg";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { urlFor } from "@/sanity/lib/image";

function Dot({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={[
        "h-2 rounded-full transition-all",
        active ? "w-10 bg-black/80" : "w-6 bg-black/40 hover:bg-black/60",
      ].join(" ")}
    />
  );
}

export default function Testimonials({ data }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const {
    subtitle = "",
    title = "",
    testimonialList = [],
    gallery = [],
  } = data || {};

  // Normalize gallery images (up to 12)
  const images = (Array.isArray(gallery) ? gallery : [])
    .slice(0, 12)
    .map((img, idx) => {
      const url = img ? urlFor(img).url() : "";
      const alt = img?.alt || `Gallery image ${idx + 1}`;
      return { url, alt };
    })
    .filter((g) => !!g.url);

  // Simple slider state for testimonials
  const [index, setIndex] = useState(0);
  const total = Array.isArray(testimonialList) ? testimonialList.length : 0;
  const current = total ? testimonialList[index] : null;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="testimonial w-full bg-color-1 h-auto py-[40px] my-[80px]">
      <div
        ref={ref}
        className="w-full py-[100px] px-[30px] lg:px-[60px] flex flex-col gap-8 leading-tight"
      >
        {/* Header */}
        <div className="flex items-center justify-center flex-col gap-3">
          <motion.span
            initial={{ opacity: 0, y: 180 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
            className="text-red text-[19px] font-medium text-center"
          >
            {subtitle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 180 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.2 }}
            className="text-black text-[50px] md:text-[60px] font-semibold text-center"
          >
            {title}
          </motion.h1>
        </div>

        {/* Content split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: photo gallery */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="rounded-2xl p-4 bg-white/70 shadow-sm"
          >
            {images.length ? (
              <div
                className={[
                  "grid gap-3",
                  // Responsive grid that feels airy: 2 cols on small, 3 cols on md+
                  "grid-cols-2 sm:grid-cols-3",
                ].join(" ")}
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-sm"
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-xl bg-white/60">
                <p className="text-gray-600">Add 8–12 photos in Studio to fill this gallery.</p>
              </div>
            )}
          </motion.div>

          {/* Right: testimonials slider */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl p-6 bg-white/90 shadow-sm flex flex-col items-center justify-between min-h-[360px]"
          >
            {current ? (
              <>
                <Image
                  src={quotesimg}
                  alt="quote icon"
                  className="w-[64px] h-[64px] opacity-80"
                />
                <p className="text-[18px] text-center leading-tight w-full text-gray-700 mt-4">
                  {current.message}
                </p>
                <div className="flex flex-col items-center justify-center mt-4">
                  <h3 className="text-[19px] text-gray-900 font-medium">
                    {current.name}
                  </h3>
                  <h4 className="text-red font-medium">{current.designation}</h4>
                </div>

                {/* Controls */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="rounded-md bg-black text-white p-2 hover:opacity-90"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <div className="flex items-center gap-2">
                    {testimonialList.map((_, i) => (
                      <Dot
                        key={i}
                        active={i === index}
                        onClick={() => setIndex(i)}
                        label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="rounded-md bg-black text-white p-2 hover:opacity-90"
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex h-[300px] items-center justify-center">
                <p className="text-gray-600">Add testimonials in Studio to populate this slider.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
