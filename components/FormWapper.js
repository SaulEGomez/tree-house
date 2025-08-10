'use client'
import { useState } from "react";
import Step1 from "@/components/FormSteps/Step1";
import Step2 from "@/components/FormSteps/Step2";
import Step3 from "@/components/FormSteps/Step3";
import Step4 from "@/components/FormSteps/Step4";
import Step5 from "@/components/FormSteps/Step5";
import handleSubmit from "@/lib/https";

function FormWrapper() {
  const [firstnameError, setFirstNameError] = useState(false);
  const [lastnameError, setLastNameError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    instruments: [],
    pastExperience: "",
    availability: [],
    additionalComments: "",
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setFirstNameError(false);
    setLastNameError(false);
    setemailError(false);
    setPhoneError(false);
  };

  const steps = [
    { title: "Personal" },
    { title: "Instruments" },
    { title: "Experience" },
    { title: "Availability" },
  ];

  const checkEmptyField = (e) => {
    if (formData.firstname && formData.lastname) {
      handleSubmit(e, formData, "formSubmissions", setLoading, setSuccess, "general");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        instruments: [],
        pastExperience: "",
        availability: [],
        additionalComments: "",
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
        checkEmptyField(e);
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
            phoneError={phoneError}
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

    if (!formData.firstname.trim()) {
      setFirstNameError(true);
      isValid = false;
    } else setFirstNameError(false);

    if (!formData.lastname.trim()) {
      setLastNameError(true);
      isValid = false;
    } else setLastNameError(false);

    if (!formData.email.trim()) {
      setemailError(true);
      isValid = false;
    } else setemailError(false);

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      setPhoneError(true);
      isValid = false;
    } else setPhoneError(false);

    if (isValid) setActiveStep((s) => s + 1);
  };

  return (
    <div className="w-full mt-[50px] lg:mt-[0px]" onKeyDown={handleKeyDown} tabIndex={0}>
      {success ? (
        <div className="w-full h-[460px] text-[28px] text-white flex justify-center items-center">
          <h1>{success}</h1>
        </div>
      ) : (
        <div className="w-full mx-auto">
          {/* Stepper — same width/placement as before */}
          <div className="relative w-full mx-auto max-w-[280px] sm:max-w-[450px] px-2">
            {/* faint connector line behind the dots */}

            <ol className="flex items-start justify-between">
              {steps.map((step, index) => {
                const active = index <= activeStep
                return (
                  <li key={step.title || index} className="flex flex-col items-center text-center">
                    <span
                      className={[
                        'flex h-10 w-10 items-center justify-center rounded-full',
                        active ? 'bg-green-500 text-gray-800' : 'bg-white text-gray-500',
                      ].join(' ')}
                    >
                      {index + 1}
                    </span>

                    <span
                      className={[
                        'mt-2 hidden sm:block font-medium',
                        'text-[12px] sm:text-[13px] lg:text-[14px] xl:text-[15px]',
                        active ? 'text-green-400' : 'text-white',
                      ].join(' ')}
                    >
                      {step.title}
                    </span>

                    {active && <span className="mt-1 h-1 w-12 bg-white" />}
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Form Steps */}
          <div style={{ padding: "20px" }} className="w-full">
            {getSectionComponent()}

            {/* Nav buttons */}
            <div className="flex justify-between items-center mt-4">
              {activeStep !== 0 && (
                <button
                  className="text-[18px] font-semibold px-3 py-2 bg-white rounded-[2px] transition duration-300 text-gray-800 hover:scale-[0.9] hover:bg-[#fcddb0]"
                  onClick={() => setActiveStep((s) => s - 1)}
                >
                  Back
                </button>
              )}

              <div className="flex-grow" />

              {activeStep !== steps.length - 1 ? (
                <button
                  className="text-[18px] font-semibold px-3 py-2 bg-white rounded-[2px] transition duration-300 text-gray-800 hover:scale-[0.9] hover:bg-[#fce5c3]"
                  onClick={checkInputField}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={checkEmptyField}
                  className="bg-green-500 text-white px-6 py-2 transition duration-300 hover:scale-[1.03] hover:bg-green-600 rounded-[2px] shadow-sm"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormWrapper;
