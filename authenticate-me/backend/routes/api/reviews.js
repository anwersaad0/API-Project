const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage } = require('../../db/models');

const router = express.Router();

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const revsByUser = await Review.findAll({
        where: {
            userId: req.user.id
        }
    });

    res.status(200);
    res.json(revsByUser);
});

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const {url} = req.body;
    const reviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    });

    res.status(200);
    res.json(reviewImage);
});

router.put('/:reviewId', requireAuth, async (req, res) => {
    const {review, stars} = req.body;

    const reviewEdit = await Review.findByPk(req.params.reviewId);
    reviewEdit.set({review, stars});

    await reviewEdit.save();

    res.status(200);
    res.json(reviewEdit);
});

router.delete('/:reviewId', requireAuth, async(req, res) => {
    const reviewDel = await Review.findByPk(req.params.reviewId);
    await reviewDel.destroy();

    res.status(200);
    res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;