"use client";
import { Link as ScrollLink } from "react-scroll";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { TfiYoutube } from "react-icons/tfi";
import { useState } from "react";
import handleSubmit from "@/lib/https";
import { urlFor } from "@/sanity/lib/image";

const iconMap = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  instagram: <CiInstagram />,
  youtube: <TfiYoutube />,
};

function Footer({ data = {} }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleNewsletterSubmit = (e) => {
    if (validateEmail(email)) {
      handleSubmit(e, { email }, "newsletter", setLoading, setSuccess, "newsletter");
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const renderMenus = () => {
    const menus = Array.isArray(data.menus) ? data.menus : [];
    return menus.map((item, index) => (
      <div key={item?._key ?? index} className="flex flex-col gap-2 items-start">
        <h3 className="text-white text-[26px]">{item?.title}</h3>
        <span className="w-[50px] border-t-[2px] border-t-green-500"></span>
        {Array.isArray(item?.subLinks) &&
          item.subLinks.map((subItem, subIndex) => (
            <p key={subItem?._key ?? subIndex} className="text-[18px] hover:text-green-500 cursor-pointer">
              <ScrollLink
                to={String(subItem?.url || "").replace(/^#/, "")}
                smooth={true}
                duration={500}
              >
                {subItem?.title}
              </ScrollLink>
            </p>
          ))}
      </div>
    ));
  };

  return (
    <div className="w-full bg-black">
      <div>
        <div className="w-full flex lg:flex-row px-4 lg:px-8 justify-center items-center md:justify-start md:items-start py-8">
          {/* If you want menus visible, uncomment this block */}
          {/* <div className="flex flex-col md:flex-row justify-between basis-[47%] flex-wrap text-white px-8">
            {renderMenus()}
          </div> */}
          <div className="w-full flex flex-col items-start justify-start max-w-[600px] gap-4 px-8">
            <h3 className="text-white text-[26px]">Newsletter</h3>
            <span className="w-[50px] border-t-[2px] border-t-green-500"></span>
            <p className="text-white my-2 tracking-wide">
              {data.newsletterText}
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder={data.emailPlaceholder}
              className="w-full bg-white p-3 rounded-[5px] text-[20px] text-black outline-none transition-all duration-500 placeholder:text-gray-700"
            />
            {loading ? (
              <div className="loader m-auto" />
            ) : (
              <button
                onClick={handleNewsletterSubmit}
                className="w-full bg-white p-3 rounded-[7px] text-[20px] font-medium outline-none transition-all duration-500 text-black hover:scale-[1.03]"
              >
                {data.sendButtonText}
              </button>
            )}
            {success ? (
              <h4 className="w-full md:w-[90%] text-white p-3 rounded-[7px] text-[20px] font-medium transition-all duration-500 hover:scale-[1.03]">
                {success}
              </h4>
            ) : null}
          </div>
        </div>

        <hr className="w-[96%] mx-auto bg-white text-white" />

        <div className="flex flex-col justify-center items-center">
          {data.socialMediaGroup ? (
            <ul className="flex gap-6 justify-center items-center py-[50px]">
              {Object.keys(data.socialMediaGroup).map((iconKey, i) => (
                <li
                  key={iconKey}
                  className={
                    i === 0
                      ? "text-[22px] text-green-600 hover:text-green-600"
                      : "text-xl text-white hover:text-green-600"
                  }
                >
                  <a
                    href={data.socialMediaGroup[iconKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {iconMap[iconKey]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="text-white text-center px-2">{data.footerDescription}</p>

          {data.logo ? (
            <img
              className="w-[240px] mt-6 mb-16"
              src={urlFor(data.logo).url()}
              alt={data.logo?.alt || "Treehouse Music logo"}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Footer;
