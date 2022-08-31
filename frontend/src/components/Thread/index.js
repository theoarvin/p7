import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import CreatePost from "./CreatePost";
import { UidContext } from "../../contexts/AppContext";
import { useContext } from "react";

const index = () => {
  const [post, setPost] = useState([]);
  const [pseudo, setPseudo] = useState();
  const uid = useContext(UidContext);
  const [user,setUser] = useState();
  // fonction pour ajouter dynamiquement le post dans le state 
  const addPost = (newPost) => {
    const copy = [...post, newPost];
    setPost(copy);
  };
  
  // fonction pour supprimer dynamiquement le post dans le state 
  const deletePost = (postDelete) => {
    setPost(post.filter((p) => p._id !== postDelete.data));
  };
  
  // fonction pour actualiser un post qui a été update
  const updatePost = (postUpdate) => {
    console.log(postUpdate);
   setPost(post.map(t => t._id === postUpdate._id ? postUpdate : t))
  }

  // useEffect pour afficher tous les posts
  const getPost = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
    })
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getPost()
  }, []);
  
  // useEffect pour récupérer le pseudo de l'utilisateur qui va publier un post et l'afficher ensuite sur celui-ci 
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
    })
      .then((res) => {
        setUser(res.data.admin)
        setPseudo(res.data.pseudo)
      } )
      .catch((err) => console.log(err));
  }, [uid]);
  
  return (
    <div>
      <div className="userInfos">
        <h2>
          Hello <span>{pseudo}</span>
        </h2>
      </div>
      <CreatePost addPost={addPost} pseudo={pseudo}/>
      <ul className="filPost">
      <li>  {post.map((posts, index) => (
          <Post key={index} value={posts} deletePost={deletePost} updatePost={updatePost} getPost={getPost} user={user}/>
        )).reverse()}</li>
      </ul>
    </div>
  );
};

export default index;
