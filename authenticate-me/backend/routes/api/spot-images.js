const express = require('express');

const { requireAuth } = require('../../utils/auth');
const {SpotImage, Spot} = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {

    const imageDel = await SpotImage.findByPk(req.params.imageId);
    if (!imageDel) {
        res.status(404);
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        });
    }

    const spot = await Spot.findOne({
        where: {
            id: imageDel.spotId
        }
    });

    if (spot.ownerId !== req.user.id) {
        res.status(403);
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
});

module.exports = router;