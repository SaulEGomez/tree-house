// import handleSubmit from "@/lib/https";

export default function Step5({ prevStep, updateFormData, formData }) {
 

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-[370px]">
        <h2 className="text-[23px] md:text-[28px] mb-6 font-semibold mt-5">
          {" "}
          Additional Concerns or Comments
        </h2>

        <textarea
          placeholder="Please share any additional concerns or comments..."
          value={formData.additionalComments}
          onChange={(e) =>
            updateFormData({ additionalComments: e.target.value })
          }
          className="border p-3 mb-4 w-full h-40 outline-none bg-transparent rounded-[5px] placeholder:text-gray-400 "
        />
      </div>
    </div>
  );
}
