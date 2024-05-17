import React from "react";

const Button = ({
  handleAction,
  title,
  secondaryColor = false,
  thirdColor = false,
}) => {
  let borderColor = "border-[#00B087]";
  let borderBackgroundColor = "bg-[rgba(22,192,152,0.38)]";

  let textColor = "text-[#008767]";
  if (secondaryColor) {
    borderBackgroundColor = "bg-[rgba(225,197,197,1)]";
    borderColor = "border-[#DF0404]";
    textColor = "text-[#DF0404]";
  }
  if (thirdColor) {
    borderColor = "border-[#FFFF00]";
    borderBackgroundColor = "bg-[rgba(255,255,0,0.38)]";
    textColor = "text-[#FFD700]";
  }
  return (
    <button
      type=""
      onClick={handleAction}
      className={`px-6 py-2  my-5 rounded-lg  font-medium    border-2 ${borderBackgroundColor} ${borderColor} ${textColor} `}
    >
      {title}
    </button>
  );
};

export default Button;
