import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export const Header: React.FC<any> = () => {
  return (
    <header className="flex items-center justify-between p-4 text-white">
      <Link to={"/"}>
        <h1 className="text-3xl uppercase font-semibold">Trello</h1>
      </Link>
      <div className="flex items-center justify-center gap-4">
        <p>Welcome Surname, Name!</p>
        <NavLink
          to={"/"}
          className="flex items-center gap-2 hover:cursor-pointer hover:opaciy-70 hover:underline"
        >
          Home <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink
          to={"/signup"}
          className="flex items-center gap-2 hover:cursor-pointer hover:opaciy-70 hover:underline"
        >
          Signup <FontAwesomeIcon icon={faUserPlus} />
        </NavLink>
        <NavLink
          to={"/signin"}
          className="flex items-center gap-2 hover:cursor-pointer hover:opaciy-70 hover:underline"
        >
          Signin <FontAwesomeIcon icon={faRightToBracket} />
        </NavLink>
        <NavLink
          to={"/logout"}
          className="hover:cursor-pointer hover:opaciy-70 hover:underline"
        >
          Logout
        </NavLink>
      </div>
    </header>
  );
};
