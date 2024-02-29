import { useState } from "react";

export const useForm = (initialForm: any, setMessage: any) => {
  const [formState, setForm] = useState(initialForm);

  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setMessage(null);
    setForm({
      ...formState,
      [name]: value,
    });
  };

  return {
    formState,
    onInputChange,
  };
};
