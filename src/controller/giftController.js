const Gift = require('../models/Gift');
const Mission = require('../models/Mission');
const User = require('../models/User');
const GiftReceived = require('../models/GiftReceived');
class GiftController {
    async getGiftList(req, res) {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 0;

        if (pageSize === 0) {
            const gifts = await Gift.find().sort({ point: -1 });
            return res.json({
                gifts,
                totalCount: gifts.length,
            });
        }
        // Truy vấn để đếm tổng số mục
        const totalGifts = await Gift.countDocuments();

        // Truy vấn dữ liệu cho trang hiện tại
        const gifts = await Gift.find()
            .sort({ point: 1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.json({
            gifts,
            currentPage: page,
            totalPages: Math.ceil(totalGifts / pageSize),
            totalGifts: gifts.length,
        });
    }
    async addGift(req, res) {
        const newGift = await new Gift({
            title: req.body.title,
            image: req.body.image,
            point: req.body.point,
        });
        newGift.save().then((gift) => res.status(200).json(gift));
    }
    async removeGift(req, res) {
        Gift.deleteOne({ _id: req.params.giftId }).then((gift) =>
            res.status(200).json(gift)
        );
    }
    async getGiftReceived(req, res) {
        const giftReceivedList = await GiftReceived.find({});
        return res.status(200).json(giftReceivedList);
    }
    async addGiftReceived(req, res) {
        const gift = await Gift.findById(req.params.giftId);
        const user = await User.findById(req.user.id);
        const newPoint = user.point - gift.point;
        if (newPoint < 0)
            return res
                .status(401)
                .json({ message: 'Enough Point To Exchange Gift' });
        const userUpdate = await User.findByIdAndUpdate(user._id, {
            $set: { point: newPoint },
        });
        const getGift = await new GiftReceived({
            title: gift.title,
            image: gift.image,
            point: gift.point,
        });
        getGift.save().then((gift) => res.status(200).json(gift));
    }
}
module.exports = new GiftController();
