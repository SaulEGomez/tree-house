"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { urlFor } from "../sanity/lib/client";
import { Link } from "react-scroll";
const handledelay = (index) => {
  const totalitems = 1;
  return totalitems * index;
};

function Instruments({ data }) {
  const ref1 = useRef(null);
  const InView1 = useInView(ref1, { once: true });
  const ref2 = useRef(null);
  const InView2 = useInView(ref2, { once: true });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <div className="instruments">
      <div className="w-full bg-white">
        <div className="w-full flex flex-col gap-[20px] px-[10px] py-[80px]">
          <div
            className="w-full flex flex-col gap-[10px] justify-between items-center mt-[15px] mb-[14px]"
            ref={ref1}
          >
            <motion.span
              initial={{ opacity: 0, y: 180 }}
              animate={InView1 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
              className="text-[18px] text-green-500 mt-[22px] font-medium text-center"
            >
              {data.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 180 }}
              animate={InView1 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.1 }}
              className="text-[40px] md:text-[55px] text-black font-semibold text-center"
            >
              {data.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 180 }}
              animate={InView1 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75, delay: 0.2 } : { duration: 1, delay: 0.2 }}
              className="max-w-full mx-auto bg-white shadow-lg border border-gray-200 rounded-lg p-6 text-center mt-4"
            >
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {data.description}
              </p>
            </motion.div>
          </div>
          <div className="w-full h-auto mx-auto mb-[28px]" ref={ref2}>
            <ul className="grid grid-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 px-[8px] py-[16px] w-full">
              {data.classCards
                .filter(card =>
                  !card.title?.toLowerCase().includes('certificate of musical proficiency') &&
                  !card.title?.toLowerCase().includes('cmp')
                )
                .map((card, i) => {
                  return (
                    <motion.li
                      key={card._key} // Use unique key from the card data
                      initial={{ opacity: 0, y: 190 }}
                      animate={InView2 ? { opacity: 1, y: 0 } : {}}
                      transition={isMobile ? { duration: 0.75, delay: handledelay(i * 0.1) } : { duration: 1, delay: handledelay(i * 0.1) }}
                    >
                      <div className="bg-black text-white px-[25px] py-[60px] flex flex-col gap-[14px] w-full rounded-md">
                        <img
                          src={urlFor(card.image).url()}
                          alt={urlFor(card.image).alt}
                          className="w-[100px] h-[100px] object-cover rounded-[4px]"
                        />
                        <div className="flex items-center gap-2">
                        <h2 className="text-white text-[35px] font-semibold mt-2 inline">
                          {card.title}
                        </h2>
                        {i===7 && <p className="text-green-600 text-[17px] mt-3">(coming soon)</p>}
                        </div>
                          
                        
                        {/* <p>{card.description}</p> */}
                        <div>
                          <Link to="contact" smooth={true} duration={500} offset={-100}>
                            <button className="btn flex justify-center items-center outline-none text-[17px] bg-white !important w-[236px] text-black px-6 py-[10px] rounded-[4px] cursor-pointer hover:scale-[0.9] transition-all duration-500 tracking-wider font-medium mt-2">
                              {card.buttonText}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </motion.li>
                  );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instruments;
