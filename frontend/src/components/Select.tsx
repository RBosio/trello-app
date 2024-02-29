import React from "react";

export const Select: React.FC<any> = ({
  name,
  className,
  value,
  onChange,
  values,
}) => {
  return (
    <select
      name={name}
      className={`${className} border-b border-primary bg-transparent focus:outline-none w-full`}
      value={value}
      onChange={onChange}
    >
      <option key={0} value={0}></option>
      {values.map((v: any) => (
        <option key={v.id} value={v.id}>
          {v.name}
        </option>
      ))}
    </select>
  );
};
