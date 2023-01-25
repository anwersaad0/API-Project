const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');

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

router.post('/', async(req, res) => {
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

router.put('/:spotId', async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.findByPk(req.params.spotId);
    spot.set({address, city, state, country, lat, lng, name, description, price});

    await spot.save();

    res.status(200)
    res.json(spot);
});

router.delete('/:spotId', async (req, res) => {
    const spotToDelete = await Spot.findByPk(req.params.spotId);
    await spotToDelete.destroy();

    res.status(200);
    res.json({
        message: "Successfully deleted"
    });
});

module.exports = router;