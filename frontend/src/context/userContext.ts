import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

interface UserC {
  user: User;
  loadUser: any;
}

export const UserContext = createContext({} as UserC);
