const Gift = require('../models/Gift');
const Mission = require('../models/Mission');
const User = require('../models/User');
const GiftReceived = require('../models/GiftReceived');
class GiftController {
    async getGiftList(req, res) {
        const giftList = await Gift.find({});
        return res.status(200).json(giftList);
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
        const getGift = await new GiftReceived({
            title: req.body.title,
            image: req.body.image,
            point: req.body.point,
        });
        getGift.save().then((gift) => res.status(200).json(gift));
    }
}
module.exports = new GiftController();
