'use client'
import { useState } from "react";
import FormWapper from '@/components/FormWapper'
import { IoMailOpenOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegMap } from "react-icons/fa";
import { motion, useInView } from 'framer-motion'
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import handleSubmit from '@/lib/https'

function Contact({ data }) {
  const ref1 = useRef(null)
  const Inview1 = useInView(ref1, { once: true })
  const ref2 = useRef(null)
  const Inview2 = useInView(ref2, { once: true })
  const isMobile = useMediaQuery({ query: "(max-width: 668px)" })
  const responsive = useMediaQuery({ query: "(max-width: 400px)" })
  

  return (
    <div className="contact w-full  py-[100px] px-[20px] bg-white h-auto">
      <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-center py-[60px] sm:px-[50px] px-9 bg-black h-auto text-white gap-5">
        <div ref={ref1} className="flex flex-col gap-4 basis-[47%] md:mt-[15px] lg:mt-[-40px] leading-snug">
          <motion.span
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
            className="text-[18px] font-medium text-green-500 tracking-wide">
            {data.subtitle}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.1 }}
            className="text-white text-[50px] md:text-[60px]  leading-tight">
            {data.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.2 } : { duration: 1, delay: 0.2 }}
          >
            {data.description}

          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.3 } : { duration: 1, delay: 0.3 }}
            className="flex gap-3 justify-start items-center tracking-notmal">
            <FaRegMap className="text-green-500 text-[30px] " />
            <span className={`${responsive? " text-[14px]":"text-[18px]"}  font-medium `}>
              {data.address}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.4 } : { duration: 1, delay: 0.4 }}
            className="flex gap-3 justify-start items-center tracking-notmal">
            <IoMailOpenOutline className="text-green-500 text-[30px] " />
            <a href="mailto:emailtreehousemusic@gmail.com" target="_blank" className={`${responsive? " text-[14px]":"text-[18px]"}  font-medium `}>
              {data.email}
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.5 } : { duration: 1, delay: 0.5 }}
            className="flex gap-3 justify-start items-center tracking-notmal">
            <FiPhoneCall className="text-green-500 text-[30px] " />
            <a href="tel:+1 (323) 781-7221" target="_blank" className={`${responsive? " text-[14px]":"text-[18px]"}  font-medium `}>{data.phone}</a>
          </motion.div>
        </div>
         <div className="basis-[47%] mx-auto">
          <FormWapper/>
         </div>
        
      </div>
    </div>
  );
}

export default Contact;
