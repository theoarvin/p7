import React from "react";
import Header from "../components/Header";
import Log from "../components/Log";
import { UidContext } from "../contexts/AppContext";
import { useContext } from "react";
import Home from "./Home";

const FormPage = () => {
  const uid = useContext(UidContext);

  return uid ? (
    <Home />
  ) : (
    <div>
      <Header />
      <div className="log-container">
        <Log />
      </div>
    </div>
  );
};

export default FormPage
