const express = require('express');
const router = express.Router();

const { Spot, User } = require('../../db/models');



router.get('/', async (req, res) => {
    const spots = await Spot.findAll({});

    res.status(200);
    res.json(spots);
});

router.get('/:spotId', async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }

    res.status(200);
    res.json(spot);
});

// router.get('/current', async (req, res) => {
//     //const currentUser = await User.findOne()
// });

module.exports = router;