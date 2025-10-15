"use client";

import { useState, useMemo } from "react";
import { urlFor } from "@/sanity/lib/image";

export default function ClassOfferingsCarousel({ data }) {
  const { title = "", subtitle = "", items = [] } = data || {};
  const slides = useMemo(
    () =>
      (items || []).map((c) => ({
        name: c?.name || "",
        desc: c?.description || "",
        img:
          c?.imageUrl ||
          (c?.image ? urlFor(c.image).width(1400).height(950).url() : ""),
        alt: c?.image?.alt || c?.name || "Class image",
      })),
    [items]
  );

  const count = slides.length;
  const [i, setI] = useState(0);
  const go = (d) => setI((p) => (p + d + count) % count);

  const current = count ? slides[i] : null;

  return (
    <section className="w-full bg-color-1">
      <div className="mx-auto max-w-6xl px-[40px] py-[120px]">
        {subtitle ? (
          <p className="text-[20px] tracking-wider text-green-600">{subtitle}</p>
        ) : null}
        {title ? (
          <h2 className="mt-2 text-[45px] md:text-[55px] font-semibold leading-tight text-black">
            {title}
          </h2>
        ) : null}

        {/* Carousel body */}
        <div className="mt-10">
          {/* Frame */}
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 bg-white/90 shadow-sm">
            {/* Media + Text */}
            {current ? (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <figure className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
                  {current.img && (
                    <img
                      src={current.img}
                      alt={current.alt}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {/* gradient bar for class name on mobile */}
                  <figcaption className="lg:hidden absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <span className="text-white text-lg font-semibold drop-shadow">
                      {current.name}
                    </span>
                  </figcaption>
                </figure>

                {/* Copy */}
                <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
                  <h3 className="hidden lg:block text-2xl font-semibold text-black">
                    {current.name}
                  </h3>
                  <p className="text-[16px] leading-relaxed text-gray-700">
                    {current.desc}
                  </p>

                  {/* Nav buttons (desktop top-right / mobile bottom) */}
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => go(-1)}
                      className="rounded-md bg-black/5 px-3 py-2 text-sm font-medium hover:bg-black/10"
                      aria-label="Previous class"
                    >
                      ‹ Prev
                    </button>
                    <button
                      onClick={() => go(1)}
                      className="rounded-md bg-black/5 px-3 py-2 text-sm font-medium hover:bg-black/10"
                      aria-label="Next class"
                    >
                      Next ›
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center text-gray-600">No classes yet</div>
            )}

            {/* Dots + thumbnails */}
            {count > 1 && (
              <div className="border-t border-black/5 bg-white/80 px-4 py-3">
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
                  {/* Dots */}
                  <div className="flex items-center gap-2">
                    {slides.map((_, idx) => {
                      const active = idx === i;
                      return (
                        <button
                          key={idx}
                          onClick={() => setI(idx)}
                          aria-label={`Go to ${slides[idx].name || `class ${idx + 1}`}`}
                          title={slides[idx].name || `Class ${idx + 1}`}
                          className={[
                            "h-2 rounded-full transition-all",
                            active ? "w-10 bg-black/80" : "w-6 bg-black/30 hover:bg-black/50",
                          ].join(" ")}
                        />
                      );
                    })}
                  </div>

                  {/* Tiny thumbs (hide on small screens) */}
                  <div className="hidden md:flex items-center gap-2 overflow-x-auto">
                    {slides.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setI(idx)}
                        className={[
                          "h-12 w-16 overflow-hidden rounded-md ring-1",
                          idx === i ? "ring-black/60" : "ring-black/10 hover:ring-black/30",
                        ].join(" ")}
                        aria-label={`Select ${s.name || `class ${idx + 1}`}`}
                        title={s.name || `Class ${idx + 1}`}
                      >
                        {s.img ? (
                          <img
                            src={s.img}
                            alt={s.alt}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-black/5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
