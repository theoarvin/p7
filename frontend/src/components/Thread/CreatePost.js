import axios from "axios";
import React, { useState } from "react";
import { UidContext } from "../../contexts/AppContext";
import { useContext } from "react";

const CreatePost = (props) => {
  // useContext pour récupérer l'id de l'utilisateur
  const uid = useContext(UidContext);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const jwt = localStorage.getItem("jwt");
  const handlePost = async (e) => {
    if (message) {
      const data = new FormData();
      data.append("userId", uid);
      data.append("pseudo", props.pseudo);
      data.append("message", message);
      if (file) data.append("post_image", file);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/post/create`,
        headers: {
          Authorization: "Bearer " + jwt,
        },

        data: data,
      })
        .then((res) => {
          props.addPost(res.data);
          console.log(res);
          cancelPost();
        })
        .catch((err) => console.log(err));
    } else {
      alert("veuillez rentrer un message");
    }
  };

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
  };

  const cancelPost = (e) => {
    setMessage("");
    setFile("");
  };

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
            <input
              type="file"
              id="fileUpload"
              name="file"
              onChange={(e) => handlePicture(e)}
            />
          </div>
          <div className="btn-send">
            {message || file ? (
              <button className="cancel" onClick={cancelPost}>
                Annuler
              </button>
            ) : null}
            <button className="send" onClick={handlePost}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
