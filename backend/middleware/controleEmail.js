const { json } = require('body-parser');
const validator = require('validator');

// middleware pour controller un email
module.exports = (req, res, next) => {
    const{email} = req.body;

    if(validator.isEmail(email)){
        next()
    }else{
        return res
        .status(400)
        .json({errorEmail : `l'email ${email} n'est pas valide`})
    }
}