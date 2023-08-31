const Gift = require('../models/Gift');
const Mission = require('../models/Mission');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const mailTemplate = require('../untils/mailTemplate');

class MissionController {
    async getMissionList(req, res) {
        const missionList = await Mission.find({});
        return res.status(200).json(missionList);
    }
    async addMission(req, res) {
        const newMission = await new Mission({
            title: req.body.title,
            point: req.body.point,
            description: req.body.description,
        });
        newMission.save().then((mission) => res.status(200).json(mission));
    }
    async removeMission(req, res) {
        Mission.deleteOne({ _id: req.params.missionId }).then((mission) =>
            res.status(200).json(mission)
        );
    }
    async changeStatus(req, res) {
        await Mission.findByIdAndUpdate(req.params.missionId, {
            $set: { status: req.query.status },
        }).then((mission) => res.status(200).json(mission));
    }
    async sendMailOfMission(req, res) {
        const mission = await Mission.findOne({ _id: req.params.missionId });
        console.log(
            process.env.EMAIL_ADDRESS + '\n' + process.env.EMAIL_PASSWORD
        );
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: req.body.email,
            subject: 'Love Mail',
            html: mailTemplate('haha'),
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json('Email not sent');
            } else {
                console.log('Email sent: ' + info.response);
                return res.json('Email sent');
            }
        });
    }
    async addMissionReviewing(req, res) {
        const reviewMission = await Mission.findByIdAndUpdate(
            req.params.missionId,
            {
                $set: { urlProof: req.body.urlProof, status: 1 },
            }
        );
        if (!reviewMission) {
            return res.status(404).json({
                message: 'Mission not found',
            });
        }
        await Mission.findById(reviewMission._id).then((mission) =>
            res.status(200).json(mission)
        );
    }
    async refuseReview(req, res) {
        const missionRefuse = await Mission.findByIdAndUpdate(
            req.params.missionId,
            {
                $set: { urlProof: '', status: 0 },
            }
        );
        if (!missionRefuse) {
            return res.status(404).json({
                message: 'Mission not found',
            });
        }
        await Mission.findById(missionRefuse._id).then((mission) =>
            res.status(200).json(mission)
        );
    }
    async accpectReview(req, res, next) {
        try {
            const mission = await Mission.findById(req.params.missionId);
            const user = await User.findOne({ username: req.body.username });
            const newPoint = user.point + mission.point;
            const updateUserPromise = User.findByIdAndUpdate(user._id, {
                $set: { point: newPoint },
            });
            const deleteMissionPromise = Mission.deleteOne({
                _id: mission._id,
            });
            await Promise.all([updateUserPromise, deleteMissionPromise]);
            const updatedUser = await User.findById(user._id);
            res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
        }
    }
    async getMissionReviewList(req, res, next) {
        const missionList = await Mission.find({ status: 1 });
        return res.status(200).json(missionList);
    }
}
module.exports = new MissionController();
