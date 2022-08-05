import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { UidContext } from "../../contexts/AppContext";
import { useContext } from "react";
import DeletePost from "./DeletePost";
import UpdatePost from"./UpdatePost";

const Post = (props,{getPost}) => {
  const [user,setUser] = useState("");
  const uid = useContext(UidContext);

    const DateParser = (num) => {
    let options = {hour: "2-digit", minute: "2-digit", second: "2-digit", weekday: "long", month: "short", day: "numeric", year: "numeric"};

    let timestamps = Date.parse(num);

    let date = new Date(timestamps).toLocaleDateString('fr-FR', options);
    return date.toString();
  }
  
  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/`,
    })
      .then((res) =>  setUser(res.data))
      .catch((err) => console.log(err));
  },[])
   
  for(let i = 0 ; i < user.length ; i++){
    if(props.value.posterId == user[i]._id){
      return (
        <div className="post">
            <div className="post-block">
            <p>{DateParser(props.value.createdAt)}</p>
            <h3>{user[i].pseudo}</h3>
            <p>{props.value.message}</p>      
            { props.value.posterId == uid ? (
              <>
               <DeletePost value={props} getPost={getPost}/>
               <UpdatePost  />
              </>
             
            ): null}
            </div>
        </div>
        )
    } 
  }

 
};

export default Post;
