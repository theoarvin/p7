const PostModel = require('../models/Post');
const UserModel = require('../models/User');
const ObjectID = require('mongoose').Types.ObjectId;

// controller pour afficher tous les posts
exports.readPost = (req,res) => {
   PostModel.find((err, docs) => {
      if (!err) res.send(docs)
      else console.log('Error to get data : ' + err);
   })
}


// controller pour afficher un post
exports.readOnePost = (req, res, next) => {
    PostModel.findOne({ _id : req.params.id })
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(404).json({ error }));
  };

// controller pour créer un post
exports.createPost = async (req,res) => {
    const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      pictureUrl: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}` ,
    } : { ...(req.body.post) };
      const newPost = new PostModel({
        ...req.body
      });
  
      try {
          const post = await newPost.save();
          return res.status(201).json(post);
      } catch (err) {
          return res.status(400).send(err);
      }
}


// controller pour modifier un post
exports.updatePost = (req,res) => {
  const postObject = req.file ?
  {
    ...JSON.parse(req.body.post),
    pictureUrl: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}` ,
  } : { ...req.body.post };

  PostModel.findOne({_id : req.params.id})
  .then((objet) => {
    if(req.file) {
      const filename = objet.pictureUrl.split('/images/post/')[1]
      fs.unlink(`images/post/${filename}`, () => {});
    }

    PostModel.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }))
  })
  .catch(error => res.status(400).json({ error })); 
};


// controller pour supprimer un post 
exports.deletePost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
      return res.status(400).send('ID unknow :' + req.params.id)

    PostModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Delete error : " + err);
        }
    )
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
      { new: true })
      .catch(error => res.status(400).json({ error }))

    await UserModel.findByIdAndUpdate(
      req.body.id,
      { 
        $addToSet: { likes: req.params.id },
      },
      { new: true })
      .then(() => res.status(200).json({ message: 'like envoyé' }))
      .catch(error => res.status(400).json({ error })) 
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
      { new: true })
      .catch(error => res.status(400).json({ error }))

    await UserModel.findByIdAndUpdate(
      req.body.id,
      { 
        $pull: { likes: req.params.id },
      },
      { new: true })
      .then(() => res.status(200).json({ message: 'like enlevé' }))
      .catch(error => res.status(400).json({ error })) 
    } catch (err) {
      console.log(err);
       // return res.status(400).send(err);
    }
};