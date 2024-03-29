import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./Button";
import { faDashboard, faRocket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="h-[calc(100vh-68px)] flex items-center">
      <div className="text-white bg-primary p-4 w-1/2 m-auto rounded-md flex flex-col items-center justify-center">
        {!user.name ? (
          <>
            <h2 className="text-4xl">¿Nuevo en Trello?</h2>
            <h3 className="text-lg text-gray-200">
              ¡Empieza ahora! <FontAwesomeIcon icon={faRocket} />
            </h3>
            <div className="mt-2 flex items-center justify-between w-full">
              <Link to="/signup">
                <Button>Registrarse</Button>
              </Link>
              <Link to="/signin">
                <Button>Iniciar sesión</Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-2 flex flex-col items-center justify-center">
            <h2 className="text-4xl">¡Hola de nuevo!</h2>
            <h3 className="text-lg text-gray-200">
              ¡Tu dashboard te espera! <FontAwesomeIcon icon={faRocket} />
            </h3>
            <Link to={"/dashboard"}>
              <Button>
                Dashboard <FontAwesomeIcon icon={faDashboard} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
