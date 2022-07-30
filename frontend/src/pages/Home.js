import React, { useContext } from "react";
import Header from "../components/Header";
import Log from "../components/Log";
import Nav from "../components/Nav";
import { UidContext } from "../contexts/AppContext";
import Thread from "../components/Thread";

const Home = () => {
  const uid = useContext(UidContext);

  return uid ? (
    <div className="filActu">
      <Header />
      <Nav />
      <Thread />
    </div>
  ) : (
    <Log />
  );
};

export default Home;
