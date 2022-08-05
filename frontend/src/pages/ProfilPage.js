import React, { useContext } from "react";
import Header from "../components/Header";
import Log from "../components/Log";
import Nav from "../components/Nav";
import { UidContext } from "../contexts/AppContext";
import Thread from "../components/Thread";
import Profil from "../components/Profil";

const Home = () => {
  const uid = useContext(UidContext);

  return uid ? (
    <div className="filActu">
      <Header />
      <Nav />

      <div className="blockActu">
        <div className="blockPost">
          <Profil />
        </div>
      </div>
    </div>
  ) : (
    <>
    <Header/>
    <Log />
    </>
  );
};

export default Home;
