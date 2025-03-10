"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaCheck } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-scroll";
function OurPrograms({ data }) {
  const ref1 = useRef(null);
  const InView1 = useInView(ref1, { once: true });
  const ref2 = useRef(null);
  const InView2 = useInView(ref2, { once: true });

  const isMobile = useMediaQuery({ query: "(max-width: 668px)" });

  // Prepare program data with refs and inView hooks
  const programs = data.cards.map((card, index) => {
    const cardRef = useRef(null);
    const cardInView = useInView(cardRef, { once: true });
    
    return {
      ...card, // Spread operator to include all card properties [ toFixed(2)]
      price: `${card.price}`,
      class: card.learnMoreButton?.url,
      learnMoreText: card.learnMoreButton?.text, // Text for Learn More button
      ref: cardRef,
      InView: cardInView,
    };
  });
  const handledelay = (index) => {
    const totalitems = 1;
    return totalitems * index;
  };
  return (
    <div className="program w-full py-[60px] px-3">
      <div className="w-full h-auto">
        <div ref={ref1} className="flex flex-col gap-3 items-center justify-center w-full leading-tight mt-[70px]">
          <motion.span
            initial={{ opacity: 0, y: 180 }}
            animate={InView1 ? { opacity: 1, y: 1 } : {}}
            transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
            className="text-red text-[17px] font-medium"
          >
            {data.subtitle}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 180 }}
            animate={InView1 ? { opacity: 1, y: 1 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.1 }}
            className="text-black text-[50px] md:text-[55px] font-semibold text-center"
          >
            {data.title}
          </motion.h1>
          <div className="max-w-full bg-white shadow-lg border border-gray-200 rounded-lg p-6 text-center mt-4">
            <motion.p
              initial={{ opacity: 0, y: 180 }}
              animate={InView1 ? { opacity: 1, y: 1 } : {}}
              transition={isMobile ? { duration: 0.75, delay: 0.2 } : { duration: 1, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-700 leading-relaxed"
            >
              {data.description}
            </motion.p>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-9">
            {programs.map((card, i) => (
              <motion.div
                initial={{ opacity: 0, y: 150 }}
                animate={card.InView ? { opacity: 1, y: 1 } : {}}
                transition={isMobile ? { duration: 0.75 } : { duration: 1,delay:(0.1*i) }}
                key={i} // Use index as key for the outer map
                ref={card.ref}
                className="py-10 px-6 bg-black text-white transition-all hover:scale-[1.04] duration-500 w-full"
              >
                <div className="h-auto mb-4 w-full">
                  <div className="flex gap-4 items-center  h-auto">
                    <h1 className="text-[80px] text-white font-semibold">{card.price}</h1>
                    <span className="text-red text-[20px]">{card.redText}</span>
                  </div>
                  <h2 className="text-[30px] font-semibold text-white my-3">{card.title}</h2>
                  <div className="mb-8">
                    <p className="my-5 inline">{card.description}</p>
                  </div>
                  <hr />
                  <h2 className="my-6 text-[25px] font-semibold tracking-wider">{card.titleBottom}</h2>
                  {card.list.map((item, i)=>(
                    <div key={i} className="flex items-center gap-4">
                    <FaCheck className="text-green-600" />
                    <p className="text-[16px] font-medium">{item}</p>
                  </div>
                  ))}
                  <Link to="contact" smooth={true} duration={500}
                    className="btn flex justify-center items-center outline-none text-[17px] bg-white !important w-[250px] xl:w-[300px] text-black px-6 py-[10px] mt-8 rounded-[4px] cursor-pointer hover:scale-[0.9] transition-all duration-500 tracking-wider font-medium"
                  >
                    {card.learnMoreText}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          ref={ref2}
          initial={{ opacity: 0, y: 180 }}
          animate={InView2 ? { opacity: 1, y: 1 } : {}}
          transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
          className="w-full bg-black flex flex-col md:flex-row p-4 md:p-6 items-center justify-center mt-[-22px] tracking-wider gap-1"
        >
          <h2 className="text-[30px] text-white font-medium cursor-pointer"><Link to="contact" smooth={true} duration={500}>{data.whiteText}</Link></h2>
          <h2 className="text-[30px] text-green-600 font-medium cursor-pointer"><Link to="contact" smooth={true} duration={500}>{data.redText}</Link></h2>
        </motion.div>
      </div>
    </div>
  );
}

export default OurPrograms;
