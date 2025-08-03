'use client'

import { useState } from "react";
import { IoMailOpenOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegMap } from "react-icons/fa";
import { motion, useInView } from 'framer-motion'
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import handleSubmit from '@/lib/https'

function KingdomSoundForm({ data }) {
  const ref1 = useRef(null)
  const Inview1 = useInView(ref1, { once: true })
  const ref2 = useRef(null)
  const Inview2 = useInView(ref2, { once: true })
  const isMobile = useMediaQuery({ query: "(max-width: 668px)" })
  const responsive = useMediaQuery({ query: "(max-width: 400px)" })
  
  // Form state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    instruments: [],
    pastExperience: "",
    additionalComments: "",
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Instruments for Kingdom Sound program
  const instruments = ["Voice", "Guitar", "Bass", "Drums", "Piano"];
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  // Handle instrument selection (limit to exactly 2)
  const handleInstrumentChange = (e) => {
    const { value, checked } = e.target;
    let updatedInstruments = [...formData.instruments];
    
    if (checked) {
      // Only allow up to 2 instruments
      if (updatedInstruments.length < 2) {
        updatedInstruments.push(value);
      }
    } else {
      updatedInstruments = updatedInstruments.filter(inst => inst !== value);
    }
    
    setFormData(prev => ({
      ...prev,
      instruments: updatedInstruments
    }));
    
    // Clear error if user selects instruments
    if (errors.instruments && updatedInstruments.length > 0) {
      setErrors(prev => ({
        ...prev,
        instruments: ""
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
    
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    if (formData.instruments.length !== 2) {
      newErrors.instruments = "Please select exactly 2 instruments";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      handleSubmit(e, formData, "formSubmissions", setLoading, setSuccess, "kingdomsound");
      
      // Reset form after successful submission
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        instruments: [],
        pastExperience: "",
        additionalComments: "",
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="contact w-full py-[100px] px-[20px] bg-white h-auto">
      <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-center py-[60px] sm:px-[50px] px-9 bg-black h-auto text-white gap-5">
        <div ref={ref1} className="flex flex-col gap-4 basis-[47%] md:mt-[15px] lg:mt-[-40px] leading-snug">
          <motion.span
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75 } : { duration: 1 }}
            className="text-[18px] font-medium text-green-500 tracking-wide">
            {data?.subtitle || "Kingdom Sound"}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.1 } : { duration: 1, delay: 0.1 }}
            className="text-white text-[50px] md:text-[60px] leading-tight">
            Kingdom Sound Interest
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.2 } : { duration: 1, delay: 0.2 }}
          >
            {data?.description || "Please fill out this interest form for the Kingdom Sound program."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.3 } : { duration: 1, delay: 0.3 }}
            className="flex gap-3 justify-start items-center tracking-notmal">
            <FaRegMap className="text-green-500 text-[30px] " />
            <span className={`${responsive? " text-[14px]":"text-[18px]"}  font-medium `}>
              {data?.address || "123 Music Street, Los Angeles, CA 90001"}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.4 } : { duration: 1, delay: 0.4 }}
            className="flex gap-3 justify-start items-center tracking-notmal">
            <IoMailOpenOutline className="text-green-500 text-[30px] " />
            <a href="mailto:emailtreehousemusic@gmail.com" target="_blank" className={`${responsive? " text-[14px]":"text-[18px]"}  font-medium `}>
              {data?.email || "info@treehousemusic.org"}
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={Inview1 ? { opacity: 1, y: 0 } : {}}
            transition={isMobile ? { duration: 0.75, delay: 0.5 } : { duration: 1, delay: 0.5 }}
            className="flex gap-3 justify-start items-center tracking-notmal">
            <FiPhoneCall className="text-green-500 text-[30px] " />
            <a href="tel:+1 (323) 781-7221" target="_blank" className={`${responsive? " text-[14px]":"text-[18px]"}  font-medium `}>
              {data?.phone || "+1 (323) 781-7221"}
            </a>
          </motion.div>
        </div>
        
        <div className="basis-[47%] mx-auto">
          {success ? (
            <div className="w-full h-[460px] text-[28px] text-[white] flex justify-center items-center">
              <h1>Thank you for your interest in Kingdom Sound!</h1>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="w-full max-w-lg">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className={`w-full bg-transparent p-2 border ${errors.firstname ? 'border-red-500' : 'border-white'} rounded-[7px] text-lg focus:border-opacity-0 outline-none h-[53px] placeholder:text-gray-300`}
                    />
                    {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className={`w-full bg-transparent p-2 border ${errors.lastname ? 'border-red-500' : 'border-white'} rounded-[7px] text-lg focus:border-opacity-0 outline-none h-[53px] placeholder:text-gray-300`}
                    />
                    {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-transparent p-2 border ${errors.email ? 'border-red-500' : 'border-white'} rounded-[7px] text-lg focus:border-opacity-0 outline-none h-[53px] placeholder:text-gray-300`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-transparent p-2 border ${errors.phone ? 'border-red-500' : 'border-white'} rounded-[7px] text-lg focus:border-opacity-0 outline-none h-[53px] placeholder:text-gray-300`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                
                <div className="w-full">
                  <h3 className="text-white text-lg mb-2">Select exactly 2 instruments:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {instruments.map((instrument) => (
                      <div key={instrument} className="flex items-center">
                        <input
                          type="checkbox"
                          id={instrument}
                          value={instrument}
                          checked={formData.instruments.includes(instrument)}
                          onChange={handleInstrumentChange}
                          disabled={!formData.instruments.includes(instrument) && formData.instruments.length >= 2}
                          className="mr-2 h-5 w-5"
                        />
                        <label htmlFor={instrument} className="text-white">
                          {instrument}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.instruments && <p className="text-red-500 text-sm mt-1">{errors.instruments}</p>}
                  <p className="text-gray-400 text-sm mt-1">
                    Selected: {formData.instruments.length}/2 instruments
                  </p>
                </div>
                
                <div className="w-full">
                  <label className="text-white block mb-2">Past Experience</label>
                  <textarea
                    name="pastExperience"
                    placeholder="Please describe your musical experience..."
                    value={formData.pastExperience}
                    onChange={handleInputChange}
                    className="w-full bg-transparent p-3 border border-white rounded-[7px] text-lg focus:border-opacity-0 outline-none min-h-[100px] placeholder:text-gray-300"
                  />
                </div>
                
                <div className="w-full">
                  <label className="text-white block mb-2">Additional Comments</label>
                  <textarea
                    name="additionalComments"
                    placeholder="Any additional information you'd like to share..."
                    value={formData.additionalComments}
                    onChange={handleInputChange}
                    className="w-full bg-transparent p-3 border border-white rounded-[7px] text-lg focus:border-opacity-0 outline-none min-h-[100px] placeholder:text-gray-300"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 text-white px-6 py-3 rounded-[4px] font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Interest"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default KingdomSoundForm;