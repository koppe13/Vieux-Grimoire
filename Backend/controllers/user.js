const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    //salage avec 10 inserts aléatoire
      .then(hash => {
        const user = new User({
        //recup du model pour unicité du mail
          email: req.body.email,
          password: hash   
        });
        user.save()
            .then(() => res.status(201).json({ message: 'utilisateur cree'}))
            .catch(error => res.status(400).json({ error }));        
    })
      .catch(error => res.status(500).json({ error }));

};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user === null) {
                res.status(401).json({message: 'paire identifiant/mot de passe incorrecte'})
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({message: 'paire identifiant/mot de passe incorrecte'})
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.TOKEN,
                                    { expiresIn: '24h'}
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    })
            }
        })
        .catch(error => {
            res.status(500).json( {error} );
        })
};