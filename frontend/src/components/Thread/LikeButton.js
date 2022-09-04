import React, { useEffect, useContext, useState } from "react";
import { UidContext } from "../../contexts/AppContext";
import axios from "axios";

const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const id = props.value.value._id;
  const jwt = localStorage.getItem("jwt");
  const [postLike, setPostLike] = useState("");
  
  // fonction pour envoyer un like 
  const like = () => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like/${id}`,
      data: { id: uid },
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
      .then((res) => {
        console.log(res);
        setLiked(true);
      })
      .catch((err) => console.log(err));
  };
  
  // fonction pour enlever un like 
  const unlike = () => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike/${id}`,
      data: { id: uid },
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
      .then((res) => {
        console.log(res);
        setLiked(false);
      })
      .catch((err) => console.log(err));
  };
  
  // useEffect pour actualiser le like si l'utilisateur la deja liker 
  useEffect(() => {
    if (props.value.value.likers.includes(uid)) setLiked(true);
  },[uid])

  // useEffect pour actualiser le like quand l'utilisateur le like 
  useEffect(() => { 
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
    })
      .then((res) => setPostLike(res.data.likers.length))
      .catch((err) => console.log(err));
  }, [liked]);

  return (
    <div className="like-container">
      {uid && liked === false ? (
        <i className="fa-regular fa-heart" onClick={like}></i>
      ) : (
        <i className="fa-solid fa-heart" onClick={unlike}></i>
      )}
      <span className="likeNumber">{postLike}</span>
    </div>
  );
};

export default LikeButton;
