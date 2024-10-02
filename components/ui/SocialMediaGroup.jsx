import React, { useRef } from 'react'
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { TfiYoutube } from "react-icons/tfi";
const iconMap = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  instagram: <CiInstagram />,
  youtube: <TfiYoutube />,
};

const handledelay = (index) => {
  const totalitems = 1;
  return totalitems * index;
};

const SocialMediaGroup = ({socialMediaGroup}) => {
	const ref3 = useRef(null);
  const InView3 = useInView(ref3, { once: true });
	const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

	return (
		<ul className="flex gap-6 justify-center items-center">
			{Object.keys(socialMediaGroup).map((key, i) => {
				const url = socialMediaGroup[key];
				return (
					<motion.li
						key={key}
						initial={{ y: 80 }}
						animate={InView3 ? { y: 0 } : {}}
						transition={
							isMobile
								? { duration: 0.75, delay: handledelay(i * 0.1) }
								: { duration: 1, delay: handledelay(i * 0.1) }
						}
						className={
							key === "facebook"
								? "text-[22px] text-red-600 hover:text-red-600"
								: "text-xl text-black hover:text-red-600"
						}
					>
						<a href={url} target="_blank" rel="noopener noreferrer">
							{iconMap[key]}
						</a>
					</motion.li>
				);
			})}
		</ul>
	)
}

export default SocialMediaGroup