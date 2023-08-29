const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
class CheckRules {
    origin(req, res, next) {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json(`You're not authenticated`);
        }
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
            if (err) {
                return res.status(403).json('Token is not valid');
            }
            req.user = user;
            next();
        });
    }
    checkSelfToken(req, res, next) {
        new CheckRules().origin(req, res, () => {
            console.log();
            if (req.user.id !== req.params.userId && req.user.admin === false) {
                return res.status(403).json('You are not allowed to access');
            }
            next();
        });
    }
    checkAdmin(req, res, next) {
        new CheckRules().origin(req, res, () => {
            if (req.user.admin === false) {
                return res.status(403).json('You are not allowed to access');
            }
            next();
        });
    }
}
module.exports = new CheckRules();
