import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useRef } from "react";
import { useState } from "react";

const SignUpForm = () => {
  // useState pour afficher la page login apres l'inscription
  const [submit, setSubmit] = useState(false);
  // useRef pour attraper les balises d'erreur et leurs injecter les messages d'erreurs
  const refSignupEmail = useRef();
  const refSignupPseudo = useRef();
  // schema pour les erreurs du formulaire avec "yup"
  const yupSchema = yup.object({
    pseudo: yup
      .string("Veulliez ajouter des lettres")
      .required("Ce champ est obligatoire")
      .min(3, "Votre pseudo est trop court")
      .max(10, "Votre pseudo est trop long"),
    email: yup
      .string()
      .required("Ce champ est obligatoire")
      .matches(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
        "votre adresse mail n'est pas valide "
      )
      .max(30, "adresse mail trop longue"),
    password: yup
      .string("Veulliez ajouter des lettres")
      .required("Ce champ est obligatoire")
      .min(4, "Votre mot de passe est trop court"),
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(yupSchema),
  });

  function login(value) {
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
        setSubmit(true);
        console.log(res);
        refSignupPseudo.current.innerHTML = "";
        refSignupEmail.current.innerHTML = "";
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.errors.pseudo) {
          refSignupPseudo.current.innerHTML = "le pseudo n'est pas disponible";
        } else if (err.response.data.error.errors.email) {
          refSignupPseudo.current.innerHTML = "";
          refSignupEmail.current.innerHTML = "Cette email n'est pas disponible";
        }
      });
  }

  return (
    <div>
      {submit ? (
        <>
          <h4 className="textValidation">
            Inscription réussi, veulliez vous connecter
          </h4>
        </>
      ) : (
        <>
          <form
            action=""
            onSubmit={handleSubmit(login)}
            id="sign-up-form"
            className="form"
          >
            <br />
            <input
              type="text"
              className="input"
              name="pseudo"
              id="pseudo"
              placeholder="pseudo"
              {...register("pseudo")}
            />

            <div ref={refSignupPseudo} className="errorPseudo error"></div>
            {errors?.pseudo && <p className="error">{errors.pseudo.message}</p>}
            <br />

            <br />
            <input
              type="text"
              className="input"
              name="email"
              id="email"
              placeholder="adresse mail"
              {...register("email")}
            />
            <div ref={refSignupEmail} className="emailError error"></div>
            {errors?.email && <p className="error">{errors.email.message}</p>}
            <br />

            <br />
            <input
              type="password"
              className="input"
              name="password"
              id="password"
              placeholder="mot de passe"
              {...register("password")}
            />
            {errors?.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <br />
            <input type="submit" className="btn" value="S'inscrire" />
          </form>
        </>
      )}
    </div>
  );
};

export default SignUpForm;
