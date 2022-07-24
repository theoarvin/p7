import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


const SignUpForm = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pseudo: "",
      email: "",
    },
  });

  function login(value) {
    const emailError = document.querySelector('.emailError');
    const errorPseudo = document.querySelector('.errorPseudo');
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/signup`,
      data: {
        pseudo: value.pseudo,
        email: value.email,
        password: value.password,
      },
    })
      .then((res) => {
           console.log(res);
           window.location = "/home";
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.errors.pseudo){
          errorPseudo.innerHTML = "le pseudo n'est pas disponible"
        } else if(err.response.data.error.errors.email){
          errorPseudo.innerHTML = ""
          emailError.innerHTML = "Cette email n'est pas disponible"
        }
      });
  }

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit(login)}
        id="sign-up-form"
        className="form"
      >
        <label htmlFor="pseudo">Pseudo</label>
        <br />
        <input
          type="text"
          className="input"
          name="pseudo"
          id="pseudo"
          {...register("pseudo", {
            required: {
              value: true,
              message: "Le champ est obligatoire",
            },
            minLength: {
              value: 3,
              message: "Au moins 3 caractères pour le pseudo",
            },
          })}
        />
        <br/>
        <div className="errorPseudo error"></div>
        {errors?.pseudo && <p className="error">{errors.pseudo.message}</p>}
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          className="input"
          name="email"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "Le champ est obligatoire",
            },
          })}
        />
        <div className="emailError error"></div>
        {errors?.email && <p className="error">{errors.email.message}</p>}
        <br />
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          type="password"
          className="input"
          name="password"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Le champ est obligatoire",
            },
            minLength: {
              value: 4,
              message: "Minimum 4 caractères",
            },
          })}
        />
        {errors?.password && <p className="error">{errors.password.message}</p>}
        <br />
        <input type="submit" className="btn" value="S'inscrire" />
      </form>
    </div>
  );
};

export default SignUpForm;