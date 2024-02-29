import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Signup } from "./components/Signup";
import { Signin } from "./components/Signin";
import { StateCompo } from "./context/StateCompo";
import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./context/userContext";
import { Dashboard } from "./components/Dashboard";

function App() {
  const { loadUser } = useContext(UserContext);

  return (
    <StateCompo>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </StateCompo>
  );
}

export default App;
