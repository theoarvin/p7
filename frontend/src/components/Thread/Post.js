import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { UidContext } from "../../contexts/AppContext";
import { useContext } from "react";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";

const Post = (props) => {
  
  const uid = useContext(UidContext);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(props.value.message);
  const [fileUpdate, setFileUpdate] = useState(null);
  const jwt = localStorage.getItem("jwt");
  const id = props.value._id;
  const data = new FormData();
  

  data.append("message", textUpdate);
  data.append("post_image", fileUpdate);

  const handlePicture = (e) => {
    setFileUpdate(e.target.files[0]);
  };

  const updateItem = async () => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/update/${id}`,
      headers: {
        Authorization: "Bearer " + jwt,
      },
      data: data,
    })
      .then((res) => {
        //props.updatePost(res.data)
        props.getPost()
        setIsUpdated(false)
      })
      .catch((err) => console.log(err));
  };

  const DateParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    let timestamps = Date.parse(num);

    let date = new Date(timestamps).toLocaleDateString("fr-FR", options);
    return date.toString();
  };

 
      return (
        <div className="post">
          <div className="post-block">
            <p className="date">{DateParser(props.value.createdAt)}</p>
            <h3>{props.value.pseudo}</h3>
            {isUpdated == false ? (
              <p className="textPost">{props.value.message}</p>
            ) : (
              <div className="updatePost">
                <textarea
                  defaultValue={props.value.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                {props.value.pictureUrl !== null ? (
                   <input
                   type="file"
                   id="fileUpload"
                   name="file"
                   onChange={(e) => handlePicture(e)}
                 />
                ) : ( null)}
               
                <button onClick={updateItem}>Valider</button>
              </div>
            )}

            {props.value.pictureUrl !== null ? (
              <img src={props.value.pictureUrl} />
            ) : null}
            <LikeButton value={props} />
            { props.value.posterId == uid || props.user == true ? (
              <>
                <button
                  className="boutonDelete"
                  onClick={() => setIsUpdated(!isUpdated)}
                >
                  Modifier
                </button>
                <DeletePost value={props} />
                </>
             
             ): null}
          </div>
        </div>
      );
    }
  


export default Post;
