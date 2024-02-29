import React from "react";

export const Button: React.FC<any> = ({
  children,
  className,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      className={`${className} bg-secondary p-2 rounded-md text-white hover:opacity-95 hover:cursor-pointer hover:scale-110 hover:bg-zinc-800 transition duration-200`}
    >
      {children}
    </button>
  );
};
