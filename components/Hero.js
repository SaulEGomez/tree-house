"use client";
import bgimage from "../assets/backgroundheroasli.png";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { TfiYoutube } from "react-icons/tfi";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";
import { urlFor } from "@/sanity/lib/image";
import { Link as ScrollLink } from "react-scroll";

const iconMap = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  instagram: <CiInstagram />,
  youtube: <TfiYoutube />,
};

const handledelay = (index) => 1 * index;

function Hero({ data = {} }) {
  const ref1 = useRef(null);
  const InView1 = useInView(ref1, { once: true });
  const ref2 = useRef(null);
  const InView2 = useInView(ref2, { once: true });
  const ref3 = useRef(null);
  const InView3 = useInView(ref3, { once: true });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const {
    socialMediaGroup = {},
    welcomeText,
    blackButton = {},
    blackButtonDropdown = [], 
    topImage,
    redTitle,
    description,
    blackTitle,
    transparentButton = {},
  } = data;

  const blackButtonText = blackButton.text;
  const blackButtonUrl = (blackButton.url || "about").replace(/^#/, "");
  const transparentButtonText = transparentButton.text;
  const transparentButtonUrl = (transparentButton.url || "contact").replace(/^#/, "");

  const topImageUrl = topImage ? urlFor(topImage).url() : "";
  const dropdownLinks = Array.isArray(blackButtonDropdown) ? blackButtonDropdown : [];

  return (
    <section className="/ bg-color-1 h-auto w-full pt-6 pb-[140px]">
      <div
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%",
        }}
        className="pt-[150px] mx-auto w-full h-auto"
      >
        <div>
          <div className="flex flex-col justify-center items-center gap-[20px] h-auto">
            {/* --- TOP IMAGE (KEPT) --- */}
            <motion.div
              ref={ref1}
              initial={{ opacity: 0, y: 150 }}
              animate={InView1 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
            >
              {topImageUrl ? (
                <img
                  src={topImageUrl}
                  alt={topImage?.alt || "hero image"}
                  className="w-[950px] max-w-full h-[400px] object-cover mx-auto pt-8"
                />
              ) : null}
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 150 }}
              animate={InView1 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.1 }}
              className="text-[16px] md:text-[18px] text-red tracking-widest font-medium text-center mx-[5px]"
            >
              {welcomeText}
            </motion.h3>

            <motion.h1
              initial={{ opacity: 0, y: 150 }}
              animate={InView1 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75, delay: 0.2 } : { duration: 1, delay: 0.2 }}
              className="text-[65px] md:text-[77px] mlg:text-[88px] mx-[4px] font-semibold tracking-wide text-center leading-tight"
            >
              {blackTitle}
            </motion.h1>

            <motion.h1
              initial={{ opacity: 0, y: 150 }}
              animate={InView1 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75, delay: 0.3 } : { duration: 1, delay: 0.3 }}
              className="mt-[-38px] text-red text-[45px] md:text-[57px] mlg:text-[68px] mx-auto font-semibold tracking-wide text-center leading-tight"
            >
              {redTitle}
            </motion.h1>

            <div className="w-full mx-auto flex justify-center items-start pl-14">
              <motion.svg
                width="100%"
                height="100"
                viewBox="0 0 600 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-[-67px] max-w-[600px] mb-[-30px]"
              >
                <motion.path
                  d="M 10 50 Q 450 20, 495 60"
                  stroke="black"
                  strokeWidth="8"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.75, delay: 1 }}
                />
              </motion.svg>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 150 }}
              animate={InView1 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75, delay: 0.4 } : { duration: 1, delay: 0.4 }}
              className="max-w-[580px] text-center tracking-wide mt-[20px]"
            >
              {description}
            </motion.p>

            {/* --- BUTTONS --- */}
            <motion.div
              ref={ref2}
              initial={{ opacity: 0, y: 150 }}
              animate={InView2 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.5 }}
              className="flex justify-center items-center gap-[20px] flex-wrap mt-[18px]"
            >
              <motion.div
                initial={{ opacity: 0, y: 110 }}
                animate={{ opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0.75, delay: 0.5 } : { duration: 1, delay: 0.5 }}
              >
                {/* Wrap button for hover dropdown */}
                <div className="relative group inline-block">
                  <ScrollLink
                    to={blackButtonUrl}
                    smooth
                    duration={500}
                    offset={-80}
                    className="btn flex justify-center items-center outline-none border-none bg-black w-[200px] text-white px-6 py-[10px] rounded-[4px] cursor-pointer hover:scale-[0.9] transition-all duration-500 tracking-wider font-medium"
                  >
                    {blackButtonText}
                  </ScrollLink>

                  {/* Dropdown (only if there are items) */}
                  {dropdownLinks.length > 0 && (
                    <ul className="absolute z-20 left-0 mt-2 w-[200px] bg-white border border-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-300">
                      {dropdownLinks.map((item, idx) => {
                        if (!item) return null;
                        const { text = "", url = "" } = item;
                        const target = String(url || "").replace(/^#/, "");
                        return (
                          <li key={idx} className="block text-left">
                            <ScrollLink
                              to={target}
                              smooth
                              duration={500}
                              offset={-80}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                            >
                              {text}
                            </ScrollLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </motion.div>

              <ScrollLink
                to={transparentButtonUrl}
                smooth
                duration={500}
                offset={-80}
                className="btn flex justify-center items-center outline-none border-[1px] border-black bg-transparent w-[180px] text-black px-6 py-[10px] rounded-[4px] cursor-pointer hover:scale-[0.9] transition-all duration-500 tracking-wider font-medium"
              >
                {transparentButtonText}
              </ScrollLink>
            </motion.div>

            {/* --- SOCIALS --- */}
            <div className="mt-[30px]" ref={ref3}>
              <ul className="flex gap-6 justify-center items-center">
                {Object.entries(socialMediaGroup).map(([key, url], i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, y: 80 }}
                    animate={InView3 ? { opacity: 1, y: 0 } : {}}
                    transition={
                      isMobile
                        ? { duration: 0.75, delay: handledelay(i * 0.1) }
                        : { duration: 1, delay: handledelay(i * 0.1) }
                    }
                    className="text-[30px] text-black hover:text-green-700"
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                      {iconMap[key]}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default Hero;
