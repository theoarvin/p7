const mongoose = require ('mongoose');

// création du modèle de données pour les posts
const PostSchema = new mongoose.Schema(
   {
    posterId: {
        type: String,
        required: true
      },
    pseudo: {
      type: String,
      required: true
    },
    message : {
        type: String,
        trim: true,
        maxLength: 500,
        required: true
    },
    pictureUrl : {
        type: String,
        default: null
    },
    likers: {
        type: [String],
        required: true,
        default:[]
      }
   },
   {
    timestamps: true
   }
);

module.exports = mongoose.model('post', PostSchema);