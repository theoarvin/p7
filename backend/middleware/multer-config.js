const multer = require("multer");
const path = require("path");

// middleware pour gérer la sauvegarde d'images dans le dossier image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "post_image") cb (null, "./images/posts/");
    else if (file.fieldname === "profil_image") cb (null, "./images/profils/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = multer({storage: storage});