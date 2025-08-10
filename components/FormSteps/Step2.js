"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Electricguitar from "@/assets/Guitaricon.png";

const Instruments = [
  { title: "Electric Guitar", img: Electricguitar },
  { title: "Acoustic Guitar", img: Electricguitar },
  { title: "Piano", img: Electricguitar },
  { title: "Ukulele", img: Electricguitar },
  { title: "Voice", img: Electricguitar },
  { title: "Bass Guitar", img: Electricguitar },
  { title: "Other", img: Electricguitar },
];

export default function FormStep2({ updateFormData, formData }) {
  const [otherInstrument, setOtherInstrument] = useState("");

  // Initialize "Other" input if a custom value is present
  useEffect(() => {
    const custom =
      Array.isArray(formData.instruments) &&
      formData.instruments.find(
        (inst) => !Instruments.some((i) => i.title === inst)
      );
    if (custom) setOtherInstrument(custom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInstrumentChange = (e) => {
    const { value, checked } = e.target;

    let updated = Array.isArray(formData.instruments)
      ? [...formData.instruments]
      : [];

    if (value === "Other") {
      if (checked) {
        updated.push(otherInstrument.trim() || "Other");
      } else {
        updated = updated.filter(
          (x) => x !== "Other" && x !== otherInstrument.trim()
        );
      }
    } else {
      if (checked) updated.push(value);
      else updated = updated.filter((x) => x !== value);
    }

    // de-dupe
    updateFormData({ instruments: [...new Set(updated)] });
  };

  const handleOtherInputChange = (e) => {
    const val = e.target.value;
    setOtherInstrument(val);

    let updated = Array.isArray(formData.instruments)
      ? [...formData.instruments]
      : [];

    // remove previous custom/Other
    updated = updated.filter((x) => x !== otherInstrument && x !== "Other");

    // keep checkbox selection if user had chosen "Other"
    const hadOtherChecked = formData.instruments?.some(
      (x) => x === otherInstrument || x === "Other"
    );

    if (hadOtherChecked) {
      updated.push(val.trim() ? val.trim() : "Other");
    }

    updateFormData({ instruments: [...new Set(updated)] });
  };

  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-col h-[370px] w-full">
        <h3 className="mb-4 text-lg md:text-2xl font-medium text-white w-full mt-4">
          Choose your instruments:
        </h3>

        <ul className="grid w-full gap-2 gap-x-3 md:gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-4">
          {Instruments.map((inst) => {
            const key = inst.title;
            const isCustomSelected =
              Array.isArray(formData.instruments) &&
              formData.instruments.some(
                (instr) => !Instruments.some((i) => i.title === instr)
              );
            const isChecked =
              Array.isArray(formData.instruments) &&
              (formData.instruments.includes(inst.title) ||
                (inst.title === "Other" && isCustomSelected));

            return (
              <li
                key={key}
                className="flex flex-col gap-1 font-medium text-[12px] md:text-[14px]"
              >
                <input
                  type="checkbox"
                  id={key}
                  value={key}
                  className="hidden peer"
                  onChange={handleInstrumentChange}
                  checked={isChecked}
                />
                <label
                  htmlFor={key}
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
