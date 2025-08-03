"use client";
import Electricguitar from "@/assets/Guitaricon.png";
import Image from "next/image";
import { useState, useEffect } from "react";

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
  {
    title: "Other",
    img: Electricguitar, 
  },
];

export default function FormStep2({ updateFormData, formData }) {
  const [otherInstrument, setOtherInstrument] = useState("");

  // Initialize otherInstrument from formData if it exists
  useEffect(() => {
    const other = Array.isArray(formData.instruments) 
      ? formData.instruments.find(inst => !Instruments.some(i => i.title === inst))
      : "";
    if (other) {
      setOtherInstrument(other);
    }
  }, []);

  const handleInstrumentChange = (e) => {
    const { value, checked } = e.target;

    let updatedInstruments = Array.isArray(formData.instruments)
      ? [...formData.instruments]
      : [];

    if (value === "Other") {
      if (checked) {
        // Add "Other" to the list and include the custom instrument if it exists
        if (otherInstrument.trim()) {
          updatedInstruments.push(otherInstrument.trim());
        } else {
          updatedInstruments.push("Other");
        }
      } else {
        // Remove the custom instrument or "Other" from the list
        updatedInstruments = updatedInstruments.filter(
          (instrument) => instrument !== otherInstrument.trim() && instrument !== "Other"
        );
      }
    } else {
      if (checked) {
        updatedInstruments.push(value);
      } else {
        updatedInstruments = updatedInstruments.filter(
          (instrument) => instrument !== value
        );
      }
    }

    updateFormData({ instruments: updatedInstruments });
  };

  const handleOtherInputChange = (e) => {
    const value = e.target.value;
    setOtherInstrument(value);
    
    // Update the formData with the custom instrument
    let updatedInstruments = Array.isArray(formData.instruments)
      ? [...formData.instruments]
      : [];
    
    // Remove the old "Other" or custom instrument
    updatedInstruments = updatedInstruments.filter(
      (instrument) => instrument !== otherInstrument && instrument !== "Other"
    );
    
    // Add the new custom instrument if it's not empty, otherwise add "Other"
    if (value.trim()) {
      updatedInstruments.push(value.trim());
    } else if (updatedInstruments.includes("Other") || otherInstrument) {
      updatedInstruments.push("Other");
    }
    
    updateFormData({ instruments: updatedInstruments });
  };

  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-col  h-[370px] w-full">
        <h3 className="mb-4 text-lg md:text-2xl font-medium text-white w-full mt-4">
          Choose your instruments:
        </h3>
        <ul className="grid w-full gap-2 gap-x-3 md:gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-4">
          {Instruments.map((inst, i) => {
            const isChecked = Array.isArray(formData.instruments) &&
              (formData.instruments.includes(inst.title) ||
               (inst.title === "Other" &&
                formData.instruments.some(instr => !Instruments.some(i => i.title === instr))));

            return (
              <li
                key={i}
                className="flex flex-col gap-1 font-medium text-[12px] md:text-[14px]"
              >
                <input
                  type="checkbox"
                  id={inst.title}
                  value={inst.title}
                  className="hidden peer "
                  onChange={handleInstrumentChange}
                  checked={isChecked}
                />
                <label
                  htmlFor={inst.title}
                  className="inline-flex items-center justify-between max-w-[80px] sm:max-w-[90px] md:max-w-[100px] h-[60px] md:h-[80px] text-white border-2 border-white border-opacity-0 rounded-lg cursor-pointer peer-checked:border-white peer-checked:border-opacity-1 p-2 md:p-3 shadow-sm shadow-[#aa6646] hover:scale-[1.02] transition duration-300"
                >
                  <div className="block">
                    <div className="w-full text-sm font-semibold text-center">
                      <Image
                        src={inst.img}
                        alt={inst.title}
                        width={40}
                        height={40}
                        className="mx-auto text-center w-[25px] sm:w-[30px] md:w-[40px] max-h-[25px] sm:max-h-[30px] md:max-h-[40px]"
                      />
                      <p className="mt-1 text-center text-[10px] sm:text-[11px] md:text-[12px]">
                        {inst.title}
                      </p>
                      {inst.title === "Other" && isChecked && (
                        <input
                          type="text"
                          value={otherInstrument}
                          onChange={handleOtherInputChange}
                          placeholder="Specify..."
                          className="mt-1 w-full px-1 py-1 text-black text-[10px] rounded"
                        />
                      )}
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
