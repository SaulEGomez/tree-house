"use client";

import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const WeekDays = [
  "All",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Step4({ updateFormData, formData }) {
  const [availability, setAvailability] = useState(formData.availability || []);
  const responsive = useMediaQuery({ query: "(max-width: 350px)" });

  const handleDayChange = (e) => {
    const { value, checked } = e.target;
    let updatedAvailability = [...availability];

    if (value === "All") {
      updatedAvailability = checked
        ? WeekDays.map((day) => ({ day, fromTime: "", toTime: "" })) 
        : []; 
    } else {
      if (checked) {
        updatedAvailability.push({ day: value, fromTime: "", toTime: "" });
      } else {
        updatedAvailability = updatedAvailability.filter(
          (entry) => entry.day !== value
        );
      }

      if (updatedAvailability.length === WeekDays.length - 1) {
        updatedAvailability.push({ day: "All", fromTime: "", toTime: "" });
      } else {
        updatedAvailability = updatedAvailability.filter(
          (entry) => entry.day !== "All"
        );
      }
    }

    setAvailability(updatedAvailability);
    updateFormData({ ...formData, availability: updatedAvailability });
  };

  const handleTimeChange = (day, timeType, value) => {
    const updatedAvailability = availability.map((entry) =>
      entry.day === day ? { ...entry, [timeType]: value } : entry
    );
    setAvailability(updatedAvailability);
    updateFormData({ ...formData, availability: updatedAvailability });
  };

  return (
    <div className="flex flex-col w-full h-[370px]">
      <h3
        className={`${responsive ? "text-[18px]" : "text-[20px]"} sm:text-[24px] font-semibold mb-4 mt-2`}
      >
        What days are you available?
      </h3>

      <div className="flex flex-col gap-[6px]">
        {WeekDays.map((day) => {
          const isChecked = availability.some((entry) => entry.day === day);

          return (
            <div key={day} className="flex items-center gap-5 h-[26px]">
              {/* Checkbox for selecting the day */}
              <label
                className={`${responsive ? "text-[14px]" : "text-[16px]"} font-semibold text-white flex items-center gap-3 min-w-[130px] `}
              >
                <input
                  type="checkbox"
                  value={day}
                  checked={isChecked}
                  onChange={handleDayChange}
                  className="w-5 h-5"
                />
                {day}
              </label>

              {isChecked && day !== "All" && (
                <div className="flex items-center gap-1">
                  {/* From time selector */}
                  <select
                    value={
                      availability.find((entry) => entry.day === day)
                        ?.fromTime || ""
                    }
                    onChange={(e) =>
                      handleTimeChange(day, "fromTime", e.target.value)
                    }
                    className="border rounded px-2 py-[2px] text-black outline-none"
                  >
                    <option value="">From</option>
                    {["AM", "PM"].map((period) =>
                      [...Array(12)].map((_, i) => (
                        <option key={i + 1} value={`${i + 1} ${period}`}>
                          {i + 1} {period}
                        </option>
                      ))
                    )}
                  </select>

                  {/* To time selector */}
                  <select
                    value={
                      availability.find((entry) => entry.day === day)?.toTime ||
                      ""
                    }
                    onChange={(e) =>
                      handleTimeChange(day, "toTime", e.target.value)
                    }
                    className="border rounded px-2 py-[2px] text-black outline-none"
                  >
                    <option value="">To</option>
                    {["AM", "PM"].map((period) =>
                      [...Array(12)].map((_, i) => (
                        <option key={i + 1} value={`${i + 1} ${period}`}>
                          {i + 1} {period}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
