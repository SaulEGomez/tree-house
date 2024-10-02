"use client";
import { IoMenuOutline } from "react-icons/io5";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-scroll";
import { urlFor } from "../sanity/lib/client";

function Header({data}) {
  return (
    <div>
      <div className="bg-color-1 mx-auto flex justify-between  px-[18px] py-[10px] items-center gap-[80px] lg:gap-0 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-center  ">
          <img
            src={urlFor(data.logo).url()}
            alt="logo"
            className="w-[80px] md:w-[120px] cursor-pointer"
          />
        </div>
        <nav className="hidden lg:block">
          <ul className="flex justify-evenly gap-7 mr-[-30px] items-center">
            
           {data.menuItems.map((item,i)=>{
            return(
              <li key={i} className="text-[17px] hover:text-red-600 cursor-pointer  transition-all duration-300 font-medium focus:text-red-600">
              <Link to={item.link} smooth={true} duration={500}>
                {item.title}
              </Link>
            </li>
            )
           })}
          </ul>
        </nav>
        <div className="hidden lg:block">
        <Link to={data.specialButton.link} smooth={true} duration={500}>
          <button className=" btn flex justify-center items-center outline-none border-none bg-black w-[220px] text-white px-6 py-[10px] rounded-[4px] cursor-pointer hover:scale-[0.9] transition-all duration-500 tracking-wider">
            {data.specialButton.label}
          </button>
          </Link>
        </div>
        {/* mobile menu */}
        <div className="lg:hidden ">
          <Sheet>
            <SheetTrigger className="flex justify-center items-center bg-black rounded-[5px] py-[2px] px-[7px] hover:bg-red-600 transition-all duration-300 hover:scale-[1.03] ">
              <IoMenuOutline className="text-3xl text-white" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col left-0 right-auto"
            >
              <div className="ml-[-10px] ">
                <img
                  src={urlFor(data.logo).url()}
                  alt="logo"
                  className="w-[80px] md:w-[120px] cursor-pointer"
                />
              </div>

              <nav className="">
                <ul className="flex flex-col justify-evenly gap-4 mr-[-30px] items-start ml-[14px]">
                {data.menuItems.map((item,i)=>{
            return(
              <li key={i} className="text-[17px] hover:text-red-600 cursor-pointer  transition-all duration-300 font-medium focus:text-red-600">
              <Link to={item.link} smooth={true} duration={500}>
                {item.title}
              </Link>
            </li>
            )
           })}
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
