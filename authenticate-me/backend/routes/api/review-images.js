const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const {ReviewImage, Review} = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageDel = await ReviewImage.findByPk(req.params.imageId);
    if (!imageDel) {
        res.status(404);
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        });
    }

    const review = await Review.findOne({
        where: {
            id: imageDel.reviewId
        }
    });

    if (review.userId !== req.user.id) {
        res.status(400);
        return res.json({
            message: "You do not have authorization to delete this image"
        });
    }

    await imageDel.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
})

module.exports = router;