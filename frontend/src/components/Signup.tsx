import { Button } from "./Button";
import { Input } from "./Input";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validEmail } from "../Regex";

export const Signup = () => {
  const navigate = useNavigate();

  const initialForm = {
    name: "",
    surname: "",
    email: "",
    password: "",
  };
  const [message, setMessage] = useState<string>("");
  const { formState, onInputChange } = useForm(initialForm, setMessage);
  const { name, surname, email, password } = formState;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      name.length === 0 ||
      surname.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      return setMessage("Fields required!");
    }

    if (!validEmail.test(email)) {
      return setMessage("Email is not valid!");
    }

    try {
      await axios.post("http://localhost:3000/api/v1/auth/signup", {
        name,
        surname,
        email,
        password,
      });

      navigate("/");
    } catch (error: any) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white gap-4 p-8 rounded-md w-1/3 m-auto"
      >
        <div className="flex items-center justify-between w-full gap-4">
          <label htmlFor="name">Nombre</label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={onInputChange}
          />
        </div>
        <div className="flex items-center justify-between w-full gap-4">
          <label htmlFor="surname">Apellido</label>
          <Input
            type="text"
            name="surname"
            value={surname}
            onChange={onInputChange}
          />
        </div>
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
        <Button className="mt-2">Registrarse</Button>
      </form>
      {message && (
        <p className="p-2 bg-warn text-white mt-4 flex justify-center items-center rounded-md w-1/3 m-auto">
          {message}
        </p>
      )}
    </>
  );
};
