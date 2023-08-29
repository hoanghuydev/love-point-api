const Gift = require('../models/Gift');
const Mission = require('../models/Mission');
const User = require('../models/User');
class UserController {
    async getInfoUser(req, res) {
        const myInfo = await User.findOne({ _id: req.params.userId });
        const { password, ...others } = myInfo._doc;
        return res.status(200).json({ ...others });
    }
    async changePoint(req, res) {
        const user = await User.findOne({ _id: req.params.userId });
        const newPoint = user.point + parseFloat(req.query.change);
        const userUpdate = await User.findByIdAndUpdate(user._id, {
            $set: { point: newPoint },
        });
        User.findById(userUpdate._id).then((userUpdate) =>
            res.status(200).json(userUpdate)
        );
    }
}
module.exports = new UserController();
