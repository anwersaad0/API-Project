const express = require('express');

const { requireAuth } = require('../../utils/auth');
const {SpotImage, Spot} = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const imageDel = await SpotImage.findByPk(req.params.imageId);
    if (!imageDel) {

        let notFoundErr = new Error("Spot Image couldn't be found");
        notFoundErr.status = 404;

        return next(notFoundErr);
    }

    const spot = await Spot.findOne({
        where: {
            id: imageDel.spotId
        }
    });

    if (spot.ownerId !== req.user.id) {

        let notOwnErr = new Error("Cannot delete an image for another user's spot");
        notOwnErr.status = 401;

        return next(notOwnErr);
    }

    await imageDel.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;