import React from "react";
import { Link } from "react-router-dom";

export const Button: React.FC<any> = ({ children, className, link }) => {
  return (
    <Link to={link}>
      <button
        className={`${className} bg-secondary p-2 rounded-md text-white hover:opacity-95 hover:cursor-pointer hover:scale-110`}
      >
        {children}
      </button>
    </Link>
  );
};
