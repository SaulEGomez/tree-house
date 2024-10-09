import { Link } from "react-scroll";

export default function Step5({ prevStep, updateFormData, formData }) {
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

        <div className="flex flex-col items-start -mt-2">
          <label className="mb-2 text-lg font-medium">
            Are you interested in the
            <Link to="program" smooth={true} duration={500} className="text-green-500 underline ml-1 cursor-pointer">
              CMP
            </Link>{" "}
            program?
          </label>

          <div id="cmp-interest" className="flex flex-col justify-start items-start gap-1">
            <label className="flex justify-center items-center gap-2">
              <input
                type="radio"
                name="cmp_interest"
                value="yes"
                className="w-4 h-4"
                onChange={(e) => updateFormData({ CMPValue: e.target.value })}
              />
              Yes
            </label>
            <label className="flex justify-center items-center gap-2">
              <input
                type="radio"
                name="cmp_interest"
                value="no"
                className="w-4 h-4"
                onChange={(e) => updateFormData({ CMPValue: e.target.value })}
              />
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
