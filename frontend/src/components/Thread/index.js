import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import { UidContext } from "../../contexts/AppContext";
import { useContext } from "react";
import Profil from "../Thread/Profil"


const index = () => {
    // useContext pour récupérer l'id de l'utilisateur
    const uid = useContext(UidContext);
    // stocker la data de la web API dans le state
    const [data,setData] = useState()
    
   
    ;
   
    
   useEffect(()=> {
    // Aller chercher les donées de la web API - requête GET
    axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      })
      .then((res) => setData(res.data)
      )
      .catch((err) => console.log('err'))
   },[])
  console.log(data);
    return (
        <div className='blockActu'>
            <div className="blockPost">

            <h2> Bienvenue  </h2>
            </div>
        </div>
        
    );
};

export default index;