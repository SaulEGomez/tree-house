"use client";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import { urlFor } from "@/sanity/lib/image";

function About({ data }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  // Destructure the data
  const { title, subtitle, description, list, image } = data;

  return (
    <div className="about bg-color-1 h-auto w-full bg">
      <div className="w-full">
        <div className="py-[140px] flex flex-col justify-center items-center lg:justify-between lg:flex-row px-[40px]">
          <div ref={ref} className="flex flex-col basis-[47%] items-start">
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
              transition={
                isMobile
                  ? { duration: 0.75, delay: 0.1 }
                  : { duration: 1, delay: 0.1 }
              }
              className="my-3 mb-[6px] text-black text-[45px] md:text-[55px] font-semibold leading-tight"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 180 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={
                isMobile
                  ? { duration: 0.75, delay: 0.2 }
                  : { duration: 1, delay: 0.2 }
              }
              className="text-gray-600 text-[18px] font-normal mt-2"
            >
              {description}
            </motion.p>
            {list.map((item, index) => (
              <motion.p
              key={index}
              initial={{ opacity: 0, y: 180 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75, delay: 0.3 + index * 0.1 } : { duration: 1, delay: 0.3 + index * 0.1 }}
              className="my-[16px] text-black text-[18px] font-medium"
            >
              {item}
            </motion.p>
            ))}
          </div>
          <motion.div
          initial={{opacity:0}}
          animate={ inView?{opacity:1}:{}}
          transition={{duration:1,delay:0.5}}
          className="basis-[47%] p-[5px]">
            <img
              src={urlFor(image).url()}
              alt={urlFor(image).alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
