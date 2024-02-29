import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/userContext";
import axios from "axios";

export const Header: React.FC<any> = () => {
  const { user, loadUser } = useContext(UserContext);

  useEffect(() => {
    const isLogged = async () => {
      try {
        if (window.localStorage.getItem("token")) {
          const response = await axios.get(
            "http://localhost:3000/api/v1/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
              },
            }
          );

          const user = await response.data;
          loadUser(user);
        }
      } catch (error) {
        loadUser(null);
      }
    };

    isLogged();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 text-white">
      <Link to={"/"}>
        <h1 className="text-3xl uppercase font-semibold">Trello</h1>
      </Link>
      <div className="flex items-center justify-center gap-4">
        {user.name ? (
          <>
            <p>
              Bienvenido {user.surname}, {user.name}!
            </p>
            <NavLink
              to={"/"}
              className="flex items-center gap-2 hover:cursor-pointer hover:opaciy-70 hover:underline"
            >
              Home <FontAwesomeIcon icon={faHome} />
            </NavLink>
            <Link
              to={"/"}
              className="hover:cursor-pointer hover:opaciy-70 hover:underline"
              onClick={() => {
                window.localStorage.removeItem("token");
                loadUser({});
              }}
            >
              Logout
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};
