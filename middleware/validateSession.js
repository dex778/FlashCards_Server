const jwt = require('jsonwebtoken')
const User =  require('../models/user')

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return req.status(403).json({
            auth:false,
            message: 'No token provided'
        })
    } else {
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(!err && decodedToken) {
                User.findOne({
                    where: {
                        id: decodedToken.id
                    }
                })
                .then(user => { 
                    if(!user) throw err;
                    console.log('USER',user)
                    req.user = user;
                    // console.log('WORD', req.user)

                    return next()
                })
                .catch(err => next(err))
            } else {
                req.errors = err;
                return res.status(500).send('Not authorized')
            }
        })
    }
}

module.exports = validateSession;