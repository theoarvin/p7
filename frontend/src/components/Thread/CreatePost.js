import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UidContext } from "../../contexts/AppContext";
import { useContext } from "react";
  

const CreatePost = ({addPost}) => {
    
    // useContext pour récupérer l'id de l'utilisateur
    const uid = useContext(UidContext);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null)
    const [file,setFile] = useState('')
    const jwt = localStorage.getItem("jwt");
    
    
    const handlePost = async (e) => {
        
      if(message || postPicture){
        
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post/create`,
                widthCredentials: true,
                headers: {
                    'Authorization': 'Bearer ' + jwt
                  },
                data: {
                  posterId : uid,
                  message,
                  pictureUrl: file
                },
                    
                
              })
              .then((res) => {
                setMessage('');
                addPost(res.data)
                console.log(res)
              })
              .catch((err) => console.log(err))
        
       
      }else{
        alert("veuillez rentrer un message")
      }
      
    }
  
    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    
    const cancelPost = (e) => {
        setMessage('');
        setPostPicture('');
        setFile('');
    }
    return (
        <div>
            <div className="formPost">
               
                <textarea
                   name="message"
                   id="message"
                   placeholder="Quoi de neuf ?"
                   onChange={(e) => setMessage(e.target.value)}
                   value={message}
               />
               <div className="footerForm">
                   <div className="iconePicture">
                      <input type="file" id='fileUpload' name='file' accept='jpg, jpeg, .png' onChange={(e) => handlePicture(e)}/>  
                   </div>
                   <div className="btn-send">
                      {message || postPicture ? (
                                                     <button className='cancel' onClick={cancelPost}>Annuler</button>
                      ) : null}

                     
                          <button className='send' onClick={handlePost}>Envoyer</button>
                     
                   </div>
               </div>
            </div>
        </div>
    );
};

export default CreatePost;