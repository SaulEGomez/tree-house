"use client";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import quotesimg from "../assets/quotesimg.png";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: true,
};


function Testimonials({ data }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <div className="testimonial w-full bg-color-1 h-auto py-[40px] my-[80px]">
      <div
        ref={ref}
        className="w-full py-[100px] px-[30px] lg:px-[60px] flex flex-col items-center justify-center gap-7 leading-tight"
      >
        <div className="flex items-center justify-center flex-col gap-3">
          <motion.span
            initial={{ opacity: 0, y: 180 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
            className="text-red text-[19px] font-medium text-center"
          >
            {data.subtitle}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 180 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={
              isMobile
                ? { duration: 0.75, delay: 0.1 }
                : { duration: 1, delay: 0.2 }
            }
            className="text-black text-[50px] md:text-[60px] font-semibold text-center"
          >
            {data.title}
          </motion.h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <Slider {...settings} className="max-w-[80%]">
            {data.testimonialList.map((item, i) => (
              <div className="flex flex-col gap-7 p-4 items-center" key={i}>
                <Image
                  src={quotesimg}
                  className="text-center w-[80px] h-[80px] object-fill "
                  alt={`Testimonial ${i}`}
                />
                <p className="text-[18px] text-center leading-tight w-full text-gray-700">
                  {item.message}
                </p>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-[19px] text-gray-900 font-medium">
                    {item.name}
                  </h3>
                  <h4 className="text-red font-medium">{item.designation}</h4>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
