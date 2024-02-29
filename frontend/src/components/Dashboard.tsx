import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddNamespace } from "./AddNamespace";
import { AddTask } from "./AddTask";
import { cleanError } from "../lib/cleanError";

export const Dashboard: React.FC<any> = () => {
  const [namespaces, setNamespaces] = useState<any>([]);
  const [add, setAdd] = useState(false);
  const [addN, setAddN] = useState(true);

  useEffect(() => {
    const fetchNamespaces = async () => {
      const resp = await axios.get("http://localhost:3000/api/v1/namespace", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      const data = resp.data;
      setNamespaces(data);
    };
    fetchNamespaces();
  }, []);

  const handleClickRemoveNs = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/v1/namespace/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    const resp = await axios.get("http://localhost:3000/api/v1/namespace", {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    const data = resp.data;
    setNamespaces(data);
  };

  const addTask = async (
    e: any,
    formState: any,
    setForm: any,
    setMessage: any
  ) => {
    e.preventDefault();
    if (formState.title?.length === 0) {
      setMessage("Ingrese el título!");
      return cleanError(setMessage);
    }

    if (formState.namespaceId === 0) {
      setMessage("Ingrese el namespace!");
      return cleanError(setMessage);
    }

    try {
      await axios.post("http://localhost:3000/api/v1/task", formState, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      const resp = await axios.get("http://localhost:3000/api/v1/namespace", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      const data = resp.data;
      setNamespaces(data);

      setForm({
        title: "",
        description: "",
        namespaceId: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {namespaces.length > 0 ? (
        <div className="flex items-center mx-4 gap-4">
          <div className="flex flex-col h-96 gap-4 mt-20">
            <div className="flex items-center justify-between bg-primary text-white rounded-md">
              <p
                onClick={() => setAddN(true)}
                className={`p-2 ${
                  addN && "bg-white text-secondary"
                } rounded-md hover:cursor-pointer hover:opacity-70`}
              >
                Namespace
              </p>
              <p
                onClick={() => setAddN(false)}
                className={`p-2 ${
                  !addN && "bg-white text-secondary"
                } rounded-md hover:cursor-pointer hover:opacity-70`}
              >
                Tarea
              </p>
            </div>
            {addN ? (
              <AddNamespace setNamespaces={setNamespaces} />
            ) : (
              <AddTask namespaces={namespaces} addTask={addTask} />
            )}
          </div>
          <div className="h-[calc(100vh-100px)] flex w-full p-4 overflow-x-scroll gap-8">
            {namespaces.map((ns: any) => (
              <div
                key={ns.id}
                className=" bg-white min-w-[300px] rounded-md overflow-y-scroll"
              >
                <div
                  onClick={() => handleClickRemoveNs(ns.id)}
                  className="flex items-center justify-end  text-primary"
                >
                  <p className="p-2 hover:cursor-pointer hover:opacity-70">
                    <FontAwesomeIcon icon={faXmark} />
                  </p>
                </div>
                <h3 className="text-center text-primary uppercase font-semibold">
                  {ns.name}
                </h3>
                <h4 className="text-sm text-center text-primary/70">
                  {ns.description}
                </h4>
                {ns.tasks.map((t: any) => (
                  <div
                    key={t.id}
                    className="flex flex-col items-center bg-primary p-2 m-4 rounded-md"
                  >
                    <h3 className="text-white font-semibold">{t.title}</h3>
                    <h3 className="text-white">{t.description}</h3>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-68px)] flex justify-center items-center gap-4">
          {add ? (
            <AddNamespace setNamespaces={setNamespaces} />
          ) : (
            <div className="w-1/4 bg-primary text-white p-4 flex flex-col items-center justify-center rounded-md">
              <h4 className="font-semibold text-2xl text-center">
                Agrega un namespace para empezar!
              </h4>
              <p
                onClick={() => setAdd(!add)}
                className="text-4xl hover:cursor-pointer hover:opacity-70 bg-secondary rounded-md p-2 mt-4"
              >
                <FontAwesomeIcon icon={faPlus} />
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
