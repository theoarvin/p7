import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import CreatePost from "./CreatePost";

const index = () => {
  const [post, setPost] = useState([]);

  const addPost = (newPost) => {
    const copy = [...post, newPost];
    setPost(copy);
  };
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
 

  return (
    <div>
      <div className="userInfos">
        <h2>
          Hello <span>pseudo</span>
        </h2>
      </div>
      <CreatePost addPost={addPost} />
      <ul className="filPost">
      <li>  {post.map((posts, index) => (
          <Post key={index} value={posts} getPost={getPost} />
        )).reverse()}</li>
      </ul>
    </div>
  );
};

export default index;
