import React from "react";

const TextInput = ({
  label,
  placeholder,
  className,
  value,
  setValue,
  labelClassName,
  // disabled = false,
}) => {
  return (
    <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
      <label for={label} className={`font-semibold ${labelClassName}`}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-2 border  border-gray-400 border-solid rounded placeholder-gray-500"
        id={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // disabled={disabled}
      />
    </div>
  );
};

export default TextInput;
