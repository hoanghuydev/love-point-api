const express = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');
const giftRouter = require('./gift');
const missionRouter = require('./mission');
const uploadRouter = require('./upload');
function route(app) {
    app.use('/v1/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/gift', giftRouter);
    app.use('/mission', missionRouter);
    app.use('/upload', uploadRouter);
}
module.exports = route;
