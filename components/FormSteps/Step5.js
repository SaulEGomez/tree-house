"use client";

export default function Step5({ updateFormData, formData }) {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[370px]">
        <h2 className="text-[21px] md:text-[24px] mb-2 font-semibold mt-2">
          Any Comments or Things You Would Like To Share?
        </h2>

        <textarea
          placeholder="Please share any additional concerns or comments..."
          value={formData.additionalComments}
          onChange={(e) =>
            updateFormData({ additionalComments: e.target.value })
          }
          className="border p-3 mb-4 w-full h-40 outline-none bg-transparent rounded-[5px] placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
