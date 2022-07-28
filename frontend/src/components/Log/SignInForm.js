import React, { useState,useRef } from "react";
import axios from "axios";
import { UidContext } from "../../contexts/AppContext";
import { useContext } from "react";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //useRef pour attraper les balises d'erreur et leurs injecter les messages d'erreurs
  const refSignupEmail = useRef();
  const refSignupPassword = useRef();
  
  const handleLogin = (e) => {
    e.preventDefault();
    //méthode axios pour envoyer le formulaire de connection au back-end
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      widthCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        // si erreur dans le formulaire
        if (res.data.errorEmail) {
          console.log(res);
          refSignupEmail.current.innerHTML = res.data.errorEmail;
          refSignupPassword.current.innerHTML = "";
        } else if(res.data.errorPassword){
          refSignupEmail.current.innerHTML = ""
          refSignupPassword.current.innerHTML = res.data.errorPassword;
        }
        // sinon renvoie le token pour authentifier l'utilisateur et redirige nous vers l'acceuil
        else {
           refSignupEmail.current.innerHTML = "";
           refSignupPassword.current.innerHTML = "";
           const userId =  res.data.userId
           const token = res.data.token
           localStorage.setItem("user",userId);
           localStorage.setItem("jwt",token);

           console.log(token);
          // window.location = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form" className="form">
      <br />
      <input
        type="text"
        className="input"
        name="email"
        id="email"
        placeholder="adresse mail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div ref={refSignupEmail} className="emailError error"></div>
      <br />
    
      <br />
      <input
        type="password"
        className="input"
        name="password"
        id="password"
        placeholder="mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div ref={refSignupPassword} className="passwordError error"></div>
      <br />
      <input type="submit" className="btn" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
