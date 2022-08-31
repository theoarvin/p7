const PostModel = require("../models/Post");
const UserModel = require("../models/User");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

// controller pour afficher tous les posts
exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  });
};

// controller pour afficher un post
exports.readOnePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// controller pour créer un post
exports.createPost = async (req, res) => {
  const postObject = req.file
    ? {
        message: req.body.message,
        posterId: req.body.userId,
        pseudo: req.body.pseudo,
        pictureUrl: `${req.protocol}://${req.get("host")}/images/post/${
          req.file.filename
        }`,
      }
    : { message: req.body.message, posterId: req.body.userId , pseudo: req.body.pseudo};
  const newPost = new PostModel({
    ...postObject,
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// controller pour modifier un post
exports.updatePost = (req, res) => {
  PostModel.findOne({ _id: req.params.id })
    .then((objet) => {
      if (req.tokenUserId != objet.posterId  && req.admin == false) {
        res.status(401).json({ message: "Not authorized" });
      } else if (req.tokenUserId == objet.posterId || req.tokenUserId != objet.posterId && req.admin == true) {
        if (req.file) {
          // récupération du nom de la photo à supprimer dans la base de données
          const filename = objet.pictureUrl.split("/post/")[1];
          console.log(filename);
          //suppression de l'image dans le dossier images
          fs.unlink(`images/post/${filename}`, (error) => {
            if (error) throw error;
          });
        } else {
          console.log(false);
        }
        // l'objet qui va être mis à jour dans la base de données
        // deux cas possible
        const postObject = req.file
        
          ? {
              ...req.body,
              pictureUrl: `${req.protocol}://${req.get("host")}/images/post/${
                req.file.filename
              }`,

              
              
            }
          : {
              message : req.body.message, 
              
          
            };
          
        // modifications qui seront envoyé dans la base de données
        PostModel.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id },
          
        )
          .then(() =>
            res.status(200).json({
              message: "objet modifié",
              id: req.params.id,
              objet
            })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};

// controller pour supprimer un post
exports.deletePost = (req, res, next) => {
  PostModel.findOne({ _id: req.params.id })
    .then((objet) => {
      if (req.tokenUserId != objet.posterId  && req.admin == false) {
     
        res.status(401).json({ message: "Not authorized" });
      } 
      
      else if (req.tokenUserId == objet.posterId || req.tokenUserId != objet.posterId && req.admin == true) {
        if (objet.pictureUrl != null) {
          // récupération du nom de la photo à supprimer dans la base de données
          const filename = objet.pictureUrl.split("/post/")[1];
          console.log(filename);
          //suppression de l'image dans le dossier images
          fs.unlink(`images/post/${filename}`, () => {
            PostModel.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json( req.params.id ))
              .catch((error) => res.status(400).json({ error }));
          });
        } else if (objet.pictureUrl == null) {
          PostModel.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json(req.params.id ))
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// controller pour liker
exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    ).catch((error) => res.status(400).json({ error }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      .then(() => res.status(200).json({ message: "like envoyé" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    console.log(err);
    // return res.status(400).send(err);
  }
};

exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    ).catch((error) => res.status(400).json({ error }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    )
      .then(() => res.status(200).json({ message: "like enlevé" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (err) {
    console.log(err);
    // return res.status(400).send(err);
  }
};
