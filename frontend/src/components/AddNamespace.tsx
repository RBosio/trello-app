import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Input } from "./Input";
import { Button } from "./Button";
import { cleanError } from "../lib/cleanError";
import axios from "axios";

export const AddNamespace: React.FC<any> = ({ setNamespaces }) => {
  const initialForm = {
    name: "",
    description: "",
  };
  const [message, setMessage] = useState<string>("");
  const { formState, setForm, onInputChange } = useForm(
    initialForm,
    setMessage
  );

  const { name, description } = formState;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formState.name.length === 0) {
      setMessage("Ingrese el campo nombre!");
      return cleanError(setMessage);
    }

    const resp = await axios.post(
      "http://localhost:3000/api/v1/namespace",
      formState,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );

    resp.data.tasks = [];
    setNamespaces((n: any) => [...n, resp.data]);
    setForm({
      name: "",
      description: "",
    });
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white gap-4 p-4 rounded-md"
      >
        <h2 className="text-xl text-primary">Namespace</h2>
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
          <label htmlFor="description">Descripcion</label>
          <Input
            type="text"
            name="description"
            value={description}
            onChange={onInputChange}
          />
        </div>
        <Button className="mt-2">Agregar</Button>
      </form>
      {message && (
        <div>
          <p className="p-2 bg-warn text-white mt-4 flex justify-center items-center rounded-md m-auto">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};
