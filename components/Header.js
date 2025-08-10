"use client";

import { IoMenuOutline } from "react-icons/io5";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link as ScrollLink } from "react-scroll";
import NextLink from "next/link";
import { urlFor } from "@/sanity/lib/image";

const isExternal = (url = "") => /^https?:\/\//i.test(url);
const isInternalPath = (url = "") => typeof url === "string" && url.startsWith("/");
const toAnchorId = (url = "") => String(url || "").replace(/^#/, "");
const isAnchor = (url = "") => !!url && !isExternal(url) && !isInternalPath(url);

function Header({ data = {} }) {
  const menuItems = Array.isArray(data.menuItems) ? data.menuItems : [];
  const special = data.specialButton || {};

  const NavItem = ({ item, className }) => {
    const key = item?._key ?? item?.title ?? item?.link ?? Math.random().toString(36);
    const title = item?.title ?? "";
    const link = item?.link ?? "";

    const isContact = title.toLowerCase() === "contact";

    // Prefer scrolling for Contact (force anchor to #contact if needed)
    if (isContact) {
      const target = toAnchorId(isAnchor(link) ? link : "contact");
      return (
        <li key={key} className={className}>
          <ScrollLink to={target} smooth duration={500} offset={-80}>
            {title}
          </ScrollLink>
        </li>
      );
    }

    if (isAnchor(link)) {
      return (
        <li key={key} className={className}>
          <ScrollLink to={toAnchorId(link)} smooth duration={500} offset={-80}>
            {title}
          </ScrollLink>
        </li>
      );
    }

    if (isInternalPath(link)) {
      return (
        <li key={key} className={className}>
          <NextLink href={link}>{title}</NextLink>
        </li>
      );
    }

    if (isExternal(link)) {
      return (
        <li key={key} className={className}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </li>
      );
    }

    return (
      <li key={key} className={className}>
        {title}
      </li>
    );
  };

  const SpecialButton = () => {
    const label = special.label ?? "";
    const link = special.link ?? "";
    const btn = (
      <button className="btn flex justify-center items-center outline-none border-none bg-black w-[220px] text-white px-6 py-[10px] rounded-[4px] cursor-pointer hover:scale-[0.9] transition-all duration-500 tracking-wider">
        {label}
      </button>
    );

    if (isAnchor(link)) {
      return (
        <ScrollLink to={toAnchorId(link)} smooth duration={500} offset={-80}>
          {btn}
        </ScrollLink>
      );
    }
    if (isInternalPath(link)) return <NextLink href={link}>{btn}</NextLink>;
    if (isExternal(link))
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {btn}
        </a>
      );
    return btn;
  };

  return (
    <div>
      <div className="bg-color-1 mx-auto flex justify-between px-[18px] py-[10px] items-center gap-[80px] lg:gap-0 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-center">
          {data.logo ? (
            <img
              src={urlFor(data.logo).width(240).url()}
              alt={data.logo?.alt || "logo"}
              className="w-[80px] md:w-[120px] cursor-pointer"
            />
          ) : null}
        </div>

        <nav className="hidden lg:block">
          <ul className="flex justify-evenly gap-7 mr-[-30px] items-center">
            {menuItems.map((item, i) => (
              <NavItem
                key={item?._key ?? `${item?.title ?? "item"}-${i}`}
                item={item}
                className="text-[17px] hover:text-green-600 cursor-pointer transition-all duration-300 font-medium focus:text-green-600"
              />
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <SpecialButton />
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger className="flex justify-center items-center bg-black rounded-[5px] py-[2px] px-[7px] hover:bg-red-600 transition-all duration-300 hover:scale-[1.03]">
              <IoMenuOutline className="text-3xl text-white" />
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col left-0 right-auto">
              <div className="ml-[-10px]">
                {data.logo ? (
                  <img
                    src={urlFor(data.logo).width(240).url()}
                    alt={data.logo?.alt || "logo"}
                    className="w-[80px] md:w-[120px] cursor-pointer"
                  />
                ) : null}
              </div>

              <nav>
                <ul className="flex flex-col justify-evenly gap-4 mr-[-30px] items-start ml-[14px]">
                  {menuItems.map((item, i) => (
                    <NavItem
                      key={item?._key ?? `${item?.title ?? "item"}-m-${i}`}
                      item={item}
                      className="text-[17px] hover:text-red-600 cursor-pointer transition-all duration-300 font-medium focus:text-red-600"
                    />
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default Header;
