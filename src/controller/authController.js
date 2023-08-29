const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let refreshTokenList = [];
class AuthController {
    async login(req, res) {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.json({
                code: 404,
                message: 'User not found',
            });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.json({
                code: 404,
                message: 'Invalid password',
            });
        }
        if (user && validPassword) {
            const accessToken = new AuthController().generateAccessToken(user);
            const refreshToken = new AuthController().generateRefreshToken(
                user
            );
            refreshTokenList.push(refreshToken);
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
            });
            const { password, ...others } = user._doc;
            return res.status(200).json({ ...others, accessToken });
        }
    }
    async logout(req, res) {
        refreshTokenList = refreshTokenList.filter(
            (token) => token !== res.cookies.refresh_token
        );
        res.clearCookie('refresh_token');
    }
    generateAccessToken(user) {
        return jwt.sign(
            {
                id: user._id,
                username: user.username,
                admin: user.admin,
            },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: '100d' }
        );
    }
    generateRefreshToken(user) {
        return jwt.sign(
            {
                id: user._id,
                username: user.username,
                admin: user.admin,
            },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: '365d' }
        );
    }
}
module.exports = new AuthController();
