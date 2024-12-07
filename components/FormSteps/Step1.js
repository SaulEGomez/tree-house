"use client";

export default function FormStep1({
  updateFormData,
  formData,
  firstnameError,
  lastnameError,
  emailError,
  phoneError, 
}) {
  return (
    <div className=" flex flex-col w-full max-w-full h-auto">
      <div className="h-[370px] flex flex-col gap-2 w-full ">
        <h1 className="text-[22px] md:text-[28px]  font-semibold mt-[30px] w-full">
          Personal Info
        </h1>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstname}
          onChange={(e) => updateFormData({ firstname: e.target.value })}
          className={`${firstnameError ? "border-red-500" : "border-white"} w-[100%] min-w-[230px] max-w-[500px] mx-auto bg-transparent p-2 border-[1px]  rounded-[7px] text-lg focus:border-opacity-0 outline-none  m-2 h-[53px] placeholder:text-gray-300`}
          required=""
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={(e) => updateFormData({ lastname: e.target.value })}
          className={`${lastnameError ? "border-red-500" : "border-white"} w-[100%] max-w-[500px] mx-auto bg-transparent p-2 border-[1px]  rounded-[7px] text-lg focus:border-opacity-0 outline-none  m-2 h-[53px] placeholder:text-gray-300 min-w-[230px]`}
          required=""
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className={`${emailError ? "border-red-500" : "border-white"} w-[100%] max-w-[500px] mx-auto bg-transparent p-2 border-[1px]  rounded-[7px] text-lg focus:border-opacity-0 outline-none  m-2 h-[53px] placeholder:text-gray-300 min-w-[230px]`}
          required=""
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          className={`${phoneError ? "border-red-500" : "border-white"} w-[100%] max-w-[500px] mx-auto bg-transparent p-2 border-[1px] rounded-[7px] text-lg focus:border-opacity-0 outline-none m-2 h-[53px] placeholder:text-gray-300 min-w-[230px]`}
          required=""
        />
      </div>
    </div>
  );
}
