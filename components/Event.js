'use client'
import { RiArrowRightUpLine } from "react-icons/ri";
import { PiClockBold } from "react-icons/pi";
import { FaRegMap } from "react-icons/fa";
import {motion, useInView} from 'framer-motion'
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";




function Event() {

   const isMobile=useMediaQuery({ query: "(max-width: 668px)" })
   const isMobile1=useMediaQuery({ query: "(max-width: 880px)" })
    const ref=useRef(null)
    const inview =useInView(ref,{once:true})
    const ref1=useRef(null)
    const inview1 =useInView(ref1,{once:true})
    const ref2=useRef(null)
    const inview2 =useInView(ref2,{once:true})
    const ref3=useRef(null)
    const inview3 =useInView(ref3,{once:true})


    const events=[
        {
            data:'25',
            month:'MAY',
            title:'Music Festival 1',
            time:'09 : 00 AM',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
            address:'Pekanbaru, Riau',
            icon:<RiArrowRightUpLine />,
            ref:ref1,
            inview:inview1
        },
        {
            data:'16',
            month:'Aug',
            title:'Music Festival 2',
            time:'09 : 00 AM',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
            address:'Pekanbaru, Riau',
            icon:<RiArrowRightUpLine />,
             ref:ref2,
            inview:inview2
        },
        {
            data:'29',
            month:'Sept',
            title:'Music Festival 3',
            time:'09 : 00 AM',
            description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
            address:'Pekanbaru, Riau',
            icon:<RiArrowRightUpLine />,
             ref:ref3,
            inview:inview3
        },
    ]
  return (
    <div className="event bg-color-1 w-full py-[80px] h-auto">
        <div className="w-full py-[30px] "> 
            <div className="flex flex-col w-full justify-center items-center gap-4 leading-snug mx-auto" ref={ref}>
                <motion.span
                initial={{opacity:0,y:150}}
                animate={inview?{opacity:1,y:0}:{}}
                transition={isMobile?{duration:0.75}:{duration:1}}
                className="text-[18px] text-red-600 font-medium mb-[-5px] text-center">OUR EVENT</motion.span>
                <motion.h1
                initial={{opacity:0,y:150}}
                animate={inview?{opacity:1,y:0}:{}}
                transition={isMobile?{duration:0.75,delay:0.1}:{duration:1,delay:0.1}}
                className="text-[50px] md:text-[60px] text-black font-semibold text-center">Upcoming event</motion.h1>
                <motion.p
                className="text-center"
                initial={{opacity:0,y:150}}
                animate={inview?{opacity:1,y:0}:{}}
                transition={isMobile?{duration:0.75,delay:0.2}:{duration:1,delay:0.2}}
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</motion.p>
            </div>
            <div className="w-full px-4 py-10">
              <div className="flex flex-col gap-2">
                   {
                    events.map((event, index)=>{
                        return (
                            <motion.div ref={event.ref} key={index} 
                            initial={{opacity:0,y:150}}
                            animate={event.inview?{opacity:1,y:0}:{}}
                            transition={isMobile1?{duration:0.75}:{duration:1}}
                            className="w-full p-8 py-6 bg-black flex flex-col  lg:flex-row  lg:justify-between lg:items-center h-auto gap-2 text-white px-8">
                                <div className="justify-start flex items-start leading-tight lg:flex-col">
                                    <h1 className="text-white text-[55px] mb-[-10px] font-semibold">{event.data}</h1>
                                    <h1 className="text-white text-[55px] font-semibold">{event.month}</h1>
                                </div>
                                <div className=" w-full  md:max-w-[600px] lg:max-w-[680px] xl:max-w-[700px] flex flex-col gap-5 lg:ml-[20px] lx:ml-[-70px]">
                                    <h1 className="text-[33px] font-medium">{event.title}</h1>
                                    <div className=" w-full flex flex-col lg:flex-row lg:justify-between lg:items-center max-w-[550px] gap-2 ">
                                        <div className="w-full flex gap-3 lg:justify-start lg:items-center">
                                        <PiClockBold className="text-red-600 text-[20px]"/>
                                        <span className="text-[17px] font-medium">{event.time}</span>
                                        </div>
                                        <div className="w-full flex gap-3 lg:justify-center lg:items-center">
                                        <FaRegMap className="text-red-600 text-[22px]"/>
                                        <h1 className="text-[17px] tracking-wide font-semibold">{event.address}</h1>
                                        </div>
                                    </div>
                                    <p>{event.description}</p>
                                </div>

                                <div className="  lg:h-[170px]">
                                   <span className="text-red text-[65px] font-extrabold md:mb-[110px] cursor-pointer " > {event.icon}</span>
                                </div>
                            </motion.div>
                        )
                    } )
                   }
              </div>

            </div>
        </div>
    </div>
  )
}

export default Event