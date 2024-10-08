"use client";
import Electricguitar from "@/assets/Guitaricon.png";
import Image from "next/image";

const Instruments = [
  {
    title: "Electric Guitar",
    img: Electricguitar,
  },
  {
    title: "Acoustic Guitar",
    img: Electricguitar,
  },
  {
    title: "Piano",
    img: Electricguitar, 
  },
  {
    title: "Ukulele",
    img: Electricguitar, 
  },
  {
    title: "Voice",
    img: Electricguitar, 
  },
  {
    title: "Bass Guitar",
    img: Electricguitar, 
  },
];

export default function FormStep2({ updateFormData, formData }) {
  const handleInstrumentChange = (e) => {
    const { value, checked } = e.target;

    let updatedInstruments = Array.isArray(formData.instruments)
      ? [...formData.instruments]
      : [];

    if (checked) {
      updatedInstruments.push(value);
    } else {
      updatedInstruments = updatedInstruments.filter(
        (instrument) => instrument !== value
      );
    }

    updateFormData({ instruments: updatedInstruments });
  };

  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-col  h-[370px] w-full">
        <h3 className="mb-4 text-lg md:text-2xl font-medium text-white w-full mt-4">
          Choose your instruments:
        </h3>
        <ul className="grid w-full gap-3 gap-x-6 md:gap-6 grid-cols-2 md:grid-cols-3">
          {Instruments.map((inst, i) => {
            return (
              <li
                key={i}
                className="flex flex-col gap-1 font-medium text-[15px] md:text-[17px]"
              >
                <input
                  type="checkbox"
                  id={inst.title}
                  value={inst.title}
                  className="hidden peer "
                  onChange={handleInstrumentChange}
                  checked={
                    Array.isArray(formData.instruments) &&
                    formData.instruments.includes(inst.title)
                  }
                />
                <label
                  htmlFor={inst.title}
                  className="inline-flex items-center justify-between max-w-[120px] md:max-w-[140px] h-[80px] md:h-[120px]  text-white border-2 border-white border-opacity-0 rounded-lg cursor-pointer peer-checked:border-white peer-checked:border-opacity-1 p-3  md:p-[10px] shadow-sm shadow-[#aa6646] hover:scale-[1.02] transition duration-300"
                >
                  <div className="block">
                    <div className="w-full text-sm font-semibold text-center">
                      <Image
                        src={inst.img}
                        alt={inst.title}
                        width={70}
                        height={65}
                        className="mx-auto text-center w-[40px] md:w-[70px] max-h-[42px] md:max-h-[65px]"
                      />
                      <p className="mt-1 text-center text-[13px] md:text-sm">
                        {inst.title}
                      </p>
                    </div>
                  </div>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
