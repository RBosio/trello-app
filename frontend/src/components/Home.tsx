import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./Button";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="h-[calc(100vh-68px)] flex items-center">
      <div className="text-white bg-primary p-4 w-1/2 m-auto rounded-md flex flex-col items-center justify-center">
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
      </div>
    </div>
  );
};
