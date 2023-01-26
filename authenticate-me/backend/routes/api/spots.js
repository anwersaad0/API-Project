const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review } = require('../../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({});

    res.status(200);
    res.json(spots);
});

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const spotsByUser = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    if (!spotsByUser.length) {
        res.status(404);
        res.json({message: "This user owns no spots"});
    }

    res.status(200);
    res.json(spotsByUser);
});

router.get('/:spotId/reviews', async (req, res) => {
    const spotReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    });

    res.status(200);
    res.json(spotReviews);
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

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const {review, stars} = req.body;
    const newSpotReview = await Review.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        review,
        stars
    });

    res.status(201);
    res.json(newSpotReview);
})

router.post('/', requireAuth, async(req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.status(201);
    res.json(newSpot);
});

router.put('/:spotId', requireAuth, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.findByPk(req.params.spotId);
    spot.set({address, city, state, country, lat, lng, name, description, price});

    await spot.save();

    res.status(200)
    res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotToDelete = await Spot.findByPk(req.params.spotId);
    await spotToDelete.destroy();

    res.status(200);
    res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;