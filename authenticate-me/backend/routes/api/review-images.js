const express = require('express');

const { requireAuth } = require('../../utils/auth');
const {ReviewImage, Review} = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageDel = await ReviewImage.findByPk(req.params.imageId);
    if (!imageDel) {

        let notFoundErr = new Error("Review Image couldn't be found");
        notFoundErr.status = 404;

        return next(notFoundErr);
    }

    const review = await Review.findOne({
        where: {
            id: imageDel.reviewId
        }
    });

    if (review.userId !== req.user.id) {

        let notOwnErr = new Error("Cannot delete an image for another user's review");
        notOwnErr.status = 401;

        return next(notOwnErr);
    }

    await imageDel.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
})

module.exports = router;