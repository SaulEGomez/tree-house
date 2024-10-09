"use client";
import { Link } from "react-scroll";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { TfiYoutube } from "react-icons/tfi";
import { useState } from "react";
import handleSubmit from "@/lib/https";
import { urlFor } from "../sanity/lib/client";

const iconMap = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  instagram: <CiInstagram />,
  youtube: <TfiYoutube />,
};

function Footer({ data }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Function to validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Handle newsletter submission
  const handleNewsletterSubmit = (e) => {
    if (validateEmail(email)) {
      handleSubmit(e, { email: email }, 'newsletter', setLoading, setSuccess)
      setEmail('');
    } else {
      console.error("Invalid email address");
      alert("Please enter a valid email address.");
    }
  };

  const renderMenus = () => {
    return data.menus.map((item, index) => (
      <div key={index} className="flex flex-col gap-2 items-start ">
        <h3 className="text-white text-[26px] ">{item.title}</h3>
        <span className=" w-[50px] border-t-[2px] border-t-green-500"></span>
        {
          item.subLinks.map((subItem, subIndex) => (
            <p key={subIndex} className="text-[18px] hover:text-green-500 cursor-pointer">
              <Link to={subItem.url} smooth={true} duration={500}>
                {subItem.title}
              </Link>
            </p>
          ))
        }
      </div>
    ))
  }

  return (
    <div className="w-full bg-black ">
      <div>
        <div className="w-full flex  lg:flex-row px-4 lg:px-8 justify-center items-center md:justify-start md:items-start py-8">
          {/* <div className="flex flex-col md:flex-row justify-between basis-[47%] flex-wrap text-white px-8">
            {renderMenus()}
          </div> */}
          <div className=" w-full flex flex-col items-start justify-start max-w-[600px] gap-4 px-8">
            <h3 className="text-white text-[26px] ">Newsletter</h3>
            <span className=" w-[50px] border-t-[2px] border-t-green-500"></span>
            <p className="text-white my-2 tracking-wide">
              {data.newsletterText}
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder={data.emailPlaceholder}
              className="w-[100%]  bg-white p-3  rounded-[5px] text-[20px] text-black outline-none transition-all duration-500 placeholder:text-gray-700"
            />
            {loading ? <div className="loader m-auto" /> : <button
              onClick={handleNewsletterSubmit}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75 }}
              className="w-[100%]   bg-white p-3  rounded-[7px] text-[20px] font-medium  outline-none transition-all duration-500 text-black hover:scale-[1.03]"
            >
              {data.sendButtonText}
            </button>
            }
            {success ? <h4
              className="w-[100%] md:w-[90%]  text-white p-3  rounded-[7px] text-[20px] font-medium  outline-none transition-all duration-500 hover:scale-[1.03]">
              {success}
            </h4> : ""
            }
          </div>
        </div>
        <hr className="w-[96%] mx-auto bg-white text-white " />
        <div className="flex flex-col justify-center items-center">
          {data.socialMediaGroup ? <ul className="flex gap-6 justify-center items-center py-[50px]">
            {Object.keys(data.socialMediaGroup).map((icon, key) => {
              return (
                <li key={key}

                  className={key === 0 ? 'text-[22px] text-green-600 hover:text-green-600' : 'text-xl text-white hover:text-green-600'}>
                  <a href={data.socialMediaGroup[icon]} target="_blank" rel="noopener noreferrer">
                    {iconMap[icon]}
                  </a>
                </li>
              );
            })}
          </ul> : ""}
          <p className="text-white text-center px-2">
            {data.footerDescription}
          </p>
          <img className="w-[240px] mt-6 mb-16"
            src={urlFor(data.logo).url()}
            alt={urlFor(data.logo).alt}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
