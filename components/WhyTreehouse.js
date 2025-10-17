'use client';
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from 'react-countup';
import { useMediaQuery } from "react-responsive";
import { urlFor } from "@/sanity/lib/image";

function WhyTreehouse({ data }) {
    
    const ref = useRef(null);
    const InView = useInView(ref, { once: true });
    const refitem1 = useRef(null);
    const InViewitem1 = useInView(refitem1, { once: true });
    const refitem2 = useRef(null);
    const InViewitem2 = useInView(refitem2, { once: true });
    const refitem3 = useRef(null);
    const InViewitem3 = useInView(refitem3, { once: true });
    const ref1 = useRef(null);
    const InView1 = useInView(ref1, { once: true });
    const ref2 = useRef(null);
    const InView2 = useInView(ref2, { once: true });
    const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

    // Extracting testimonials from the data
    const testimonials = data.cards.map(card => ({
        title: card.title,
        number: card.number.replace(/,/g, ''), // Remove commas for CountUp
        description: card.description,
        ref: refitem1, // Reference for animation
        InView: InViewitem1 // In view state
    }));

    return (
        <div className="bg-color-1 w-full h-auto px-[16px] py-[100px]">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col lg:flex-row gap-5 px-3 mx-auto">
                    <div ref={ref1} className="flex flex-col items-start justify-center basis-[47%] mt-[30px]">
                        <motion.span
                            initial={{ opacity: '0', y: 180 }}
                            animate={InView1 ? { opacity: 1, y: 0 } : {}}
                            transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
                            className="text-[18px] font-medium text-red-600"
                        >
                            {data.subtitle}
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: '0', y: 180 }}
                            animate={InView1 ? { opacity: 1, y: 0 } : {}}
                            transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.1 }}
                            className="text-black text-[45px] md:text-[55px] leading-tight font-semibold"
                        >
                            {data.title}
                        </motion.h1>
                    </div>
                    <div ref={ref2} className="basis-[47%] mt-[10px]">
                        <motion.p
                            initial={{ opacity: '0', y: 180 }}
                            animate={InView2 ? { opacity: 1, y: 0 } : {}}
                            transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
                        >
                            {data.ceoSection.ceoMessage}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: '0', y: 180 }}
                            animate={InView2 ? { opacity: 1, y: 0 } : {}}
                            transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.1 }}
                            className="mt-[20px] flex gap-4 items-center"
                        >
                            <img 
                                src={urlFor(data.ceoSection.ceoImage).url()} 
                                alt={data.ceoSection.ceoImage.alt} 
                                className="w-[70px] h-[70px] rounded-full" 
                            />
                            <div>
                                <h3 className="text-[22px] tracking-widest font-semibold">{data.ceoSection.ceoName}</h3>
                                <span className="text-red text-[16px] font-medium">{data.ceoSection.ceoPosition}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="w-full my-[80px]">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 px-4 gap-[50px]">
                        {testimonials.map((item, i) => {
                            return (
                                <div key={i} className="h-auto border-t-[2px] border-t-gray-700 hover:border-t-red-600 px-2">
                                    <div className="flex gap-2 items-center my-3">
                                        <span className="w-[12px] h-[12px] rounded-full bg-red-600"></span>
                                        <span className="text-black text-[19px] font-medium">{item.title}</span>
                                    </div>
                                    <div className="flex items-center mb-[18px]" ref={ref}>
                                    {InView && (
                                       <CountUp
                                         start={0}
                                         end={parseInt(item.number)}
                                         duration={1.5}
                                         className="text-black text-[50px] font-semibold"
                                       />
                                      )}
                                        <h1 className="text-black text-[50px] font-medium">
                                            {i === 0 ? "K" : i === 2 ? "+" : ""}
                                        </h1>
                                    </div>
                                    <p>{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyTreehouse;
