"use client";

function QuoteSection({ data }) {
  // Destructure the necessary fields from data
  const {
    totalUsers: { redText: totalUsersLabel, whiteText: totalUsersCount },
    rating: { redText: ratingLabel, whiteText: ratingValue },
    mainText,
  } = data;

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center md:justify-between items-center h-auto w-full mt-[-12px] bg-black text-white p-[40px] gap-[20px]">
        <h2 className="text-center max-w-[85%] lg:text-left lg:max-w-[700px] text-[35px] leading-tight">
          "{mainText}"
        </h2>
        <div className="md:w-full flex flex-col gap-[45px] items-center md:justify-evenly md:flex-row md:gap-[60px]">
          <div className="flex flex-col justify-center items-center leading-tight">
            <h1 className="text-[55px] font-semibold">{totalUsersCount}</h1>
            <span className="text-[17px] font-semibold text-red-600 tracking-widest">
              {totalUsersLabel}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center leading-tight">
            <h1 className="text-[55px] font-semibold">{ratingValue}</h1>
            <span className="text-[17px] font-semibold text-red-600 tracking-widest">
              {ratingLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteSection;
