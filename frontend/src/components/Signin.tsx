import { Button } from "./Button";
import { Input } from "./Input";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validEmail } from "../Regex";
import { cleanError } from "../lib/cleanError";
import { UserContext } from "../context/userContext";

export const Signin = () => {
  const navigate = useNavigate();
  const { loadUser } = useContext(UserContext);

  const initialForm = {
    email: "",
    password: "",
  };
  const [message, setMessage] = useState<string>("");
  const { formState, onInputChange } = useForm(initialForm, setMessage);
  const { email, password } = formState;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setMessage("Todos los campos son requeridos!");
      return cleanError(setMessage);
    }

    if (!validEmail.test(email)) {
      setMessage("Email inválido!");
      return cleanError(setMessage);
    }

    try {
      const resp = await axios.post("http://localhost:3000/api/v1/auth/login", {
        email,
        password,
      });
      const data = await resp.data;

      const response = await axios.get(
        "http://localhost:3000/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const user = await response.data;

      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("id", user.id);
      loadUser(user);
      navigate("/");
    } catch (error: any) {
      setMessage("Email o contraseña incorrectos!");
      return cleanError(setMessage);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white gap-4 p-8 rounded-md w-1/3 m-auto"
      >
        <div className="flex items-center justify-between w-full gap-4">
          <label htmlFor="email">Email</label>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </div>
        <div className="flex items-center justify-between w-full gap-4">
          <label htmlFor="password">Contraseña</label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </div>
        <Button className="mt-2">Iniciar sesión</Button>
      </form>
      {message && (
        <p className="p-2 bg-warn text-white mt-4 flex justify-center items-center rounded-md w-1/3 m-auto">
          {message}
        </p>
      )}
    </>
  );
};
