const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Booking, SpotImage } = require('../../db/models');

const router = express.Router();

//GET ENDPOINTS
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({});

    res.status(200);
    return res.json({
        Spots: spots
    });
});

router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const spotsByUser = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    });

    if (!spotsByUser.length) {
        res.status(404);
        return res.json({message: "This user owns no spots"});
    }

    res.status(200);
    return res.json(spotsByUser);
});

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    let spotBookings;

    if (spot.ownerId !== req.user.id) {
        spotBookings = await Booking.scope(["notTheOwner"]).findAll({
            where: {
                spotId: req.params.spotId
            }
        });
    } else {
        spotBookings = await Booking.findAll({
            include: [{model: User}],
            where: {
                spotId: req.params.spotId
            }
        });
    }

    res.status(200);
    return res.json({
        Bookings: spotBookings
    });
});

router.get('/:spotId/reviews', async (req, res) => {
    const spotReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    });

    res.status(200);
    return res.json(spotReviews);
});

router.get('/:spotId', async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }

    res.status(200);
    return res.json(spot);
});

//POST ENDPOINTS
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const {startDate, endDate} = req.body;

    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }

    if (spot.ownerId === req.user.id) {
        res.status(400);
        return res.json({
            message: "Cannot create a booking for a spot you own"
        });
    }

    const newBooking = await Booking.create({
        spotId: spot.id,
        userId: req.user.id,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
    });

    res.status(200);
    return res.json(newBooking);
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
    return res.json(newSpotReview);
});

router.post('/:spotId/images', requireAuth, async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }

    if (req.user.id !== spot.ownerId) {
        res.status(400);
        return res.json({
            message: "Cannot add images for a spot you don't own"
        });
    }
    
    const {url, preview} = req.body;
    const spotImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    });

    res.status(200);
    return res.json(spotImage);
});

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
    return res.json(newSpot);
});

//PUT AND DELETE ENDPOINTS
router.put('/:spotId', requireAuth, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.findByPk(req.params.spotId);
    spot.set({address, city, state, country, lat, lng, name, description, price});

    await spot.save();

    res.status(200)
    return res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotToDelete = await Spot.findByPk(req.params.spotId);
    await spotToDelete.destroy();

    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;