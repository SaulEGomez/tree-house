'use client'
import { useState } from "react";
import { IoMailOpenOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegMap } from "react-icons/fa";
import { motion, useInView } from 'framer-motion'
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import handleSubmit from '@/lib/https'

function Contact({ data }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const ref1 = useRef(null)
  const Inview1 = useInView(ref1, { once: true })
  const ref2 = useRef(null)
  const Inview2 = useInView(ref2, { once: true })
  const isMobile = useMediaQuery({ query: "(max-width: 668px)" })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  const {
    emailPlaceholder,
    messagePlaceholder,
    namePlaceholder,
    phonePlaceholder,
    sendButtonText,
    subjectPlaceholder,
  } = data.placeholders;

  return (
    <div className="contact w-full h-auto py-[100px] px-[20px] bg-white">
      <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-center py-[60px] px-[50px] bg-black h-auto text-white gap-5">
        <div ref={ref1} className="flex flex-col gap-4 basis-[47%] md:mt-[15px] lg:mt-[-40px] leading-snug">
          <motion.span
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
            className="text-[18px] font-medium text-red-600">
            {data.subtitle}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.1 }}
            className="text-white text-[50px] md:text-[60px]">
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
            <FaRegMap className="text-red-600 text-[30px] " />
            <span className="text-[18px] font-medium max-w-[350px]">
              {data.address}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.4 } : { duration: 1, delay: 0.4 }}
            className="flex gap-3 justify-start items-center tracking-notmal">
            <IoMailOpenOutline className="text-red-600 text-[30px] " />
            <span className="text-[18px] font-medium">
              {data.email}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.5 } : { duration: 1, delay: 0.5 }}
            className="flex gap-3 justify-start items-center tracking-notmal">
            <FiPhoneCall className="text-red-600 text-[30px] " />
            <span className="text-[18px] font-medium">{data.phone}</span>
          </motion.div>
        </div>
        <form onSubmit={(e) => handleSubmit(e, formData, 'formSubmissions', setLoading, setSuccess)}
          initial={{ opacity: 0 }}
          animate={Inview2 ? { opacity: 1 } : {}}
          transition={isMobile ? { duration: 0.75, delay: 0.3 } : { duration: 1, delay: 0.3 }}
          ref={ref2} className=" w-full basis-[47%] my-8 md:my-8">
          <div className="w-full flex flex-col items-center  gap-6 mx-auto">
            <input
              type="text"
              placeholder={namePlaceholder}
              className="w-[100%] mx-auto md:w-[90%] bg-transparent p-3 border-[2px] border-gary-700 rounded-[7px] text-lg focus:border-black outline-none transition-all duration-500"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <div className="w-full md:w-[90%]  flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder={phonePlaceholder}
                className=" w-[100%] lg:w-[50%]   bg-transparent p-3 border-[2px] border-white rounded-[7px] text-lg  focus:border-black outline-none transition-all duration-500"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder={emailPlaceholder}
                className=" w-[100%] lg:w-[50%] bg-transparent p-3 border-[2px] border-white rounded-[7px] text-lg  focus:border-black outline-none transition-all duration-500"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              placeholder={subjectPlaceholder}
              className="w-[100%] md:w-[90%] bg-transparent p-3 border-[2px] border-white rounded-[7px] text-lg  focus:border-black outline-none transition-all duration-500"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder={messagePlaceholder}
              className="w-[100%] md:w-[90%] h-[100px] bg-transparent p-3 border-[2px] border-white rounded-[7px] text-lg  focus:border-black outline-none transition-all duration-500"
            ></textarea>
            {loading ? <div className="loader" /> :
              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 50 }}
                animate={Inview2 ? { opacity: 1, y: 0 } : {}}
                transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
                className="w-[100%] md:w-[90%]  bg-white p-3  rounded-[7px] text-[20px] font-medium  outline-none transition-all duration-500 text-black hover:scale-[1.03]">
                {sendButtonText}
              </motion.button>
            }

            {success ? <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={Inview2 ? { opacity: 1, y: 0 } : {}}
              transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
              className="w-[100%] md:w-[90%]  text-white p-3  rounded-[7px] text-[20px] font-medium  outline-none transition-all duration-500 hover:scale-[1.03]">
              {success}
            </motion.h2> : ""
            }

          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
