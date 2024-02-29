import React from "react";

export const Input: React.FC<any> = ({
  type = "text",
  placeholder,
  name,
  className,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className={`${className} border-b border-primary bg-transparent focus:outline-none`}
      value={value}
      onChange={onChange}
    />
  );
};
