const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/User");

// middleware pour vérifier le token
module.exports = (req, res, next) => {
  try {
    // ici on crée une variable token pour récupérer le header autorization ou est renseigné notre token
    const token = req.headers.authorization.split(" ")[1]; // <-- ici on précise [1] pour bien ciblé le token et non le mot "Bearead"
    // on utilise jwt.verify(token, 'TOKEN') afin de vérifier notre token pour être sur qu'il correspond a notre token encodé
    const decodedToken = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    // ici on récupère le userId
    const userId = decodedToken.userId;
    req.tokenUserId = userId;
    req.admin = decodedToken.admin;
    next();
  } catch {
    res.status(401).json({
      error: new Error("utilisateur non authentifié"),
    });
  }
};
