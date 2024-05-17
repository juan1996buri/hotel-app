import React from "react";

const InputText = ({
  title,
  placeholder,
  onChange,
  name,
  value,
  disable = false,
  error = false,
}) => {
  let actionEvent = "";
  if (disable) {
    actionEvent = "pointer-events-none";
  }
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 items-center ">
        <h3 className="font-semibold min-w-40">{title}</h3>
        <div className="flex flex-col w-full">
          <input
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            className={`border border-[#B5B7C0] bg-white rounded-lg p-3 ${actionEvent} w-full`}
          />

          {error && (
            <h5 className="font-extralight text-sm text-red-600  ">
              el campo es obligatorio
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputText;
