
const passwordValidator = require('password-validator');

// middleware pour schema du password
const pseudoSchema = new passwordValidator();

// schéma que doit respecter le mot de passe
pseudoSchema
.is().min(3)                                    
.is().max(64)                                                                 
.has().not().spaces()   


module.exports = (req, res, next) => {
    if(pseudoSchema.validate(req.body.pseudo)){
       next();
    }else{
        return res.status(200).json({errorPseudo : `le pseudo n'est pas valide`})
    }
 }