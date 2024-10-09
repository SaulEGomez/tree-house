import React, { useEffect, useState } from "react";
import Step1 from "@/components/FormSteps/Step1";
import Step2 from "@/components/FormSteps/Step2";
import Step3 from "@/components/FormSteps/Step3";
import Step4 from "@/components/FormSteps/Step4";
import Step5 from "@/components/FormSteps/Step5";
import handleSubmit from "@/lib/https";
import { useMediaQuery } from "react-responsive";

function FormWrapper() {
  const [firstnameError, setFirstNameError] = useState(false);
  const [lastnameError, setLastNameError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email:"",
    instruments: [],
    pastExperience: "",
    availability: [],
    additionalComments: "",
    CMPValue:"",
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setFirstNameError(false);
    setLastNameError(false);
    setemailError(false);
  };

  const steps = [
    { title: "Personal" },
    { title: "Instruments" },
    { title: "Experience" },
    { title: "Availability" },
    { title: "CMP" },
  ];

// const  handleSubmit=()=>{
//   alert(JSON.stringify(formData))
// }  

  const checkEmptyField = (e) => {
    if (formData.firstname && formData.lastname) {
      handleSubmit(e, formData, "formSubmissions", setLoading, setSuccess);
      setFormData({
        firstname: "",
        lastname: "",
        email:"",
        instruments: [],
        pastExperience: "",
        availability: [],
        additionalComments: "",
        CMPValue:"",
      });

      setTimeout(() => {
        setActiveStep(0);
        setSuccess(false);
      }, 3000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (activeStep !== steps.length - 1) {
        checkInputField();
      } else {
        checkEmptyField();
      }
    }
  };

  const getSectionComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Step1
            formData={formData}
            updateFormData={updateFormData}
            firstnameError={firstnameError}
            lastnameError={lastnameError}
            emailError={emailError}
          />
        );
      case 1:
        return <Step2 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step3 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step4 formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step5 formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  const checkInputField = () => {
    let isValid = true;
    if (formData.firstname.length === 0) {
      setFirstNameError(true);
      isValid = false;
    } else {
      setFirstNameError(false);
    }

    if (formData.lastname.length === 0) {
      setLastNameError(true);
      isValid = false;
    } else {
      setLastNameError(false);
    }
    if (formData.email.length === 0) {
      setemailError(true);
      isValid = false;
    } else {
      setemailError(false);
    }

    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div
      className="w-full mt-[50px] lg:mt-[0px]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {success ? (
        <div className="w-full h-[460px] text-[28px] text-[white] flex justify-center items-center">
          <h1>{success}</h1>
        </div>
      ) : (
        <div className="w-full mx-auto">
          {/* Custom Stepper with Numbers */}
          <ol className="flex max-w-[280px] sm:max-w-[450px] w-full items-center justify-center mx-auto lg:ml-12">
            {steps.map((step, index) => (
              <div className="flex flex-col items-center w-full">
                <li
                  key={index}
                  className={`flex items-center w-full ${
                    index < steps.length - 1
                      ? "after:content-[''] after:w-full sm:after:w-[8vw] lg:after:w-[6vw] after:h-1 after:border-b after:border-4 cursor-pointer"
                      : ""
                  } ${
                    index < activeStep
                      ? "text-blue-600 after:border-green-500  transition-all duration-500 cursor-pointer"
                      : "after:border-gray-100 dark:after:border-gray-700"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:h-10 lg:w-10 rounded-full cursor-pointer ${
                      index <= activeStep
                        ? "bg-green-500 text-gray-800 dark:bg-blue-800 dark:text-blue-300 transition-all duration-500"
                        : "bg-white text-gray-500 dark:bg-gray-700 dark:text-gray-100"
                    }`}
                  >
                    {index + 1}
                  </span>
                </li>
                <p
                  className={`${
                    index <= activeStep
                      ? "text-green-400 transition-all duration-500"
                      : "text-white"
                  } hidden mt-2 sm:block text-[12px] sm:text-[13px] lg:text-[14px] xl:text-[15px] font-medium  ${
                    index === 0 && "sm:-ml-[55px] md:-ml-[70px] "
                  } ${index === 1 && "sm:-ml-[53px] md:-ml-[60px]  lg:-ml-[68px]"} ${index === 2 ? "sm:-ml-[53px] md:-ml-[60px] lg:-ml-[68px]" : ""} ${
                    index === 3 && "-ml-[52px] md:-ml-[60px] lg:-ml-[68px] "
                  } ${index === 4 && "sm:-ml-1  md:-ml-[5px] "}`}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </ol>

          {/* Form Steps */}
          <div style={{ padding: "20px" }} className="w-full">
            {getSectionComponent()}

            {/* Back Button */}
            {activeStep !== 0 && (
              <button
                className="text-[18px] font-semibold px-3 py-2 bg-white rounded-[2px] transition duration-300 text-gray-800 hover:scale-[0.9] hover:bg-[#fcddb0]"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </button>
            )}

            {/* Next or Send Button */}
            {activeStep !== steps.length - 1 ? (
              <button
                className="float-right text-[18px] font-semibold px-3 py-2 bg-white rounded-[2px] transition duration-300 text-gray-800 hover:scale-[0.9] hover:bg-[#fce5c3]"
                onClick={checkInputField}
              >
                Next
              </button>
            ) : (
              <button
                onClick={checkEmptyField}
                className="bg-green-500 text-white px-6 py-2 transition duration-300 hover:scale-[1.03] hover:bg-green-600 rounded-[2px] shadow-sm float-right"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FormWrapper;
