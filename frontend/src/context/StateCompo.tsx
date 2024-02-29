import { useState } from "react";
import { User, UserContext } from "./userContext";

export const StateCompo: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState({} as User);

  const loadUser = (user: any) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};
