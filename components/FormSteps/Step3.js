"use client";

export default function Step3({ updateFormData, formData }) {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[370px]">
        <h2 className="text-[21px] sm:text-[28px] font-semibold w-full mb-4 mt-7">
          What is your past experience?
        </h2>

        <textarea
          placeholder="Describe your past experience..."
          value={formData.pastExperience}
          onChange={(e) => updateFormData({ pastExperience: e.target.value })}
          className="border p-3 mb-4 w-[100%] h-40 outline-none bg-transparent rounded-[5px] placeholder:text-[#b4a181]"
        />
      </div>
    </div>
  );
}
