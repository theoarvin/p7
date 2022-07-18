import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".emailError");
    const passwordError = document.querySelector(".passwordError");
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
        if (res.data.errorEmail) {
          console.log(res.data.error);
          emailError.innerHTML = res.data.errorEmail;
          passwordError.innerHTML = "";
        } else if(res.data.errorPassword){
          emailError.innerHTML = "";
          passwordError.innerHTML = res.data.errorPassword;
        }
         else {
           const token = res.data.token;
           console.log(token );
           window.location = "/home";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form" className="form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        className="input"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="emailError error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        className="input"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="passwordError error"></div>
      <br />
      <input type="submit" className="btn" value="Connection" />
    </form>
  );
};

export default SignInForm;
