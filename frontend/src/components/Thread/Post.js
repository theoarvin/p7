import React from "react";
import { useEffect } from "react";
import axios from "axios";

const Post = () => {

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
    })
      .then((res) => console.log('ok'))
      .catch((err) => console.log(err));
  }, []);

  return <div></div>;
};

export default Post;
