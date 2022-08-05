import React from 'react';
import axios from 'axios';
import { UidContext } from "../../contexts/AppContext";
import { useContext } from "react";
import { useState } from 'react';

const DeletePost = (props) => {

 const id = props.value.value._id
 const jwt = localStorage.getItem("jwt");
 

  const handleclick = () => {
    axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/post/delete/${id}`,
        headers: {
            'Authorization': 'Bearer ' + jwt
        }
      })
      .then((res) => {
        window.location = ('/home')
        console.log(res.data)
      
    })
      .catch((err) => console.log(err))
    }

    return (
       <button className='boutonDelete'  onClick={handleclick}>
         Supprimer
       </button>
    );
};

export default DeletePost;