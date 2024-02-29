import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddNamespace } from "./AddNamespace";
import { AddTask } from "./AddTask";
import { cleanError } from "../lib/cleanError";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Namespace } from "./Namespace";

export const Dashboard: React.FC<any> = () => {
  const [namespaces, setNamespaces] = useState<any>([]);
  const [add, setAdd] = useState(false);
  const [addN, setAddN] = useState(true);

  const getUser = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/user/${window.localStorage.getItem("id")}`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );

    return data;
  };

  useEffect(() => {
    const fetchNamespaces = async () => {
      const user = await getUser();

      if (user.id) {
        const resp = await axios.get(
          `http://localhost:3000/api/v1/namespace/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );

        const data = resp.data;
        setNamespaces(data);
      }
    };
    fetchNamespaces();
  }, []);

  const handleClickRemoveNs = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/v1/namespace/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });

    const user = await getUser();
    const resp = await axios.get(
      `http://localhost:3000/api/v1/namespace/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );

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

      const user = await getUser();

      const resp = await axios.get(
        `http://localhost:3000/api/v1/namespace/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

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

  const handleDragEnd = async (e: any) => {
    const { active, over } = e;

    if (!over) {
      return await handleClickRemoveNs(active.id);
    }
    const startPosition = namespaces.findIndex(
      (ns: any) => ns.id === active.id
    );
    const endPosition = namespaces.findIndex((ns: any) => ns.id === over.id);

    const newArr = arrayMove(namespaces, startPosition, endPosition);
    setNamespaces(newArr);

    await axios.put("http://localhost:3000/api/v1/namespace/order", newArr);
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
                } rounded-md hover:cursor-pointer hover:opacity-70 transition duration-1000`}
              >
                Namespace
              </p>
              <p
                onClick={() => setAddN(false)}
                className={`p-2 ${
                  !addN && "bg-white text-secondary"
                } rounded-md hover:cursor-pointer hover:opacity-70 transition duration-1000`}
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
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="h-[calc(100vh-100px)] flex w-full p-4 overflow-x-scroll gap-8">
              <SortableContext
                items={namespaces}
                strategy={horizontalListSortingStrategy}
              >
                {namespaces.map((ns: any) => (
                  <Namespace
                    key={ns.id}
                    namespaces={namespaces}
                    ns={ns}
                    handleClickRemoveNs={handleClickRemoveNs}
                  />
                ))}
              </SortableContext>
            </div>
          </DndContext>
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
