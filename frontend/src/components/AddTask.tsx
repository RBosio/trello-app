import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { Input } from "./Input";
import { Button } from "./Button";
import { Select } from "./Select";

export const AddTask: React.FC<any> = ({ namespaces, addTask }) => {
  const initialForm = {
    title: "",
    description: "",
    namespaceId: 0,
  };
  const [message, setMessage] = useState<string>("");
  const { formState, setForm, onInputChange } = useForm(initialForm, setMessage);

  const { title, description, namespaceId } = formState;

  const handleSubmit = async (e: any) => {
    addTask(e, formState, setForm, setMessage);
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-white gap-4 p-4 rounded-md"
      >
        <h2 className="text-xl text-primary">Tarea</h2>
        <div className="flex items-center justify-between w-full gap-4">
          <label htmlFor="name">Título</label>
          <Input
            type="text"
            name="title"
            value={title}
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
        <div className="flex items-center justify-between w-full gap-4">
          <label htmlFor="description">Namespace</label>
          <Select
            name="namespaceId"
            value={namespaceId}
            onChange={onInputChange}
            values={namespaces}
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
