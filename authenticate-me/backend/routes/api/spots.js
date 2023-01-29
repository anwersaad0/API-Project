const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({checkFalsy: true})
        .withMessage("Street address is required"),
    check('city')
        .exists({checkFalsy: true})
        .withMessage("City is required"),
    check('state')
        .exists({checkFalsy: true})
        .withMessage("State is required"),
    check('country')
        .exists({checkFalsy: true})
        .withMessage("Country is required"),
    check('lat')
        .exists({checkFalsy: true})
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({checkFalsy: true})
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({checkFalsy: true})
        .isLength({max: 50})
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({checkFalsy: true})
        .withMessage("Description is required"),
    check('price')
        .exists({checkFalsy: true})
        .withMessage("Price per day is required"),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({checkFalsy: true})
        .withMessage("Review text is required"),
    check('stars')
        .exists({checkFalsy: true})
        .withMessage("Stars must be an integer from 1 & 5"),
    handleValidationErrors
];

const validateBooking = [
    handleValidationErrors
];

//GET ENDPOINTS

//Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    });

    let spotList = [];
    spots.forEach(spot => {
        spotList.push(spot.toJSON());
    });

    spotList.forEach(spot => {
        let starAvg = 0;
        let counter = 0;
        spot.Reviews.forEach(review => {
            starAvg += review.stars;
            counter++;
        });

        if (starAvg > 0) {
            starAvg = starAvg / counter;
        }

        spot.avgRating = starAvg;

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
        });
        if (!spot.previewImage) {
            spot.previewImage = "No preview image found";
        }

        delete spot.Reviews;
        delete spot.SpotImages;
    });

    res.status(200);
    return res.json({
        Spots: spotList
    });
});

//Get all Spots by Current User
router.get('/current', requireAuth, async (req, res) => {
    const spotsByUser = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    });

    if (!spotsByUser.length) {
        res.status(404);
        return res.json({message: "This user owns no spots"});
    }

    let spotList = [];
    spotsByUser.forEach(spot => {
        spotList.push(spot.toJSON());
    });

    spotList.forEach(spot => {
        let starAvg = 0;
        let counter = 0;
        spot.Reviews.forEach(review => {
            starAvg += review.stars;
            counter++;
        });

        if (starAvg > 0) {
            starAvg = starAvg / counter;
        }

        spot.avgRating = starAvg;

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
        });
        if (!spot.previewImage) {
            spot.previewImage = "No preview image found";
        }

        delete spot.Reviews;
        delete spot.SpotImages;
    });

    res.status(200);
    return res.json({
        Spots: spotList
    });
});

//Get all bookings for a Spot
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
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                    }
                }
            ],
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

//Get all reviews for a Spot
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const spotReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt']
                }
            }
        ]
    });

    res.status(200);
    return res.json(spotReviews);
});

//Get a Spot by its id
router.get('/:spotId', async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: {
                    exclude: ['spotId', 'createdAt', 'updatedAt']
                }
            },
            {
                model: User,
                as: 'Owner',
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            }
        ]
    });

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }

    //POJO manipulation
    let specSpot = spot.toJSON();
    let starAvg = 0;
    let numRevs = 0;

    specSpot.Reviews.forEach(review => {
        starAvg += review.stars;
        numRevs++;
    });

    if (starAvg > 0) {starAvg = starAvg / numRevs}

    specSpot.numReviews = numRevs;
    specSpot.avgStarRating = starAvg;

    delete specSpot.Reviews;

    res.status(200);
    return res.json(specSpot);
});

//POST ENDPOINTS
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
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
        res.status(403);
        return res.json({
            message: "Cannot create a booking for a spot you own"
        });
    }

    const existingBookings = await Booking.findAll({
        where: {
            spotId: spot.id
        }
    });

    let specExBooks = []
    existingBookings.forEach(exBook => {
        specExBooks.push(exBook.toJSON());
    });

    //Checks booking conflicts
    for (exBook of specExBooks) {
        let err = new Error("Sorry, this spot is already booked for the specific dates");
        err.title = "Booking Conflict";
        err.status = 403;
        err.errors = {};

        let badStart = false;
        let badEnd = false;

        if (exBook.startDate.getTime() <= new Date(startDate).getTime() && 
        new Date(startDate).getTime() <= exBook.endDate.getTime()) {
            badStart = true;
            err.errors.startDate = "Start date conflicts with an existing booking";
        }

        if (exBook.startDate.getTime() <= new Date(endDate).getTime() && 
        new Date(endDate).getTime() <= exBook.endDate.getTime()) {
            badEnd = true;
            err.errors.endDate = "End date conflicts with an existing booking";
        }

        if ((exBook.startDate.getTime() >= new Date(startDate).getTime() && 
        new Date(startDate).getTime() <= exBook.endDate.getTime()) &&
        (exBook.startDate.getTime() <= new Date(endDate).getTime() && 
        new Date(endDate).getTime() >= exBook.endDate.getTime())) {
            badStart = true;
            err.errors.startDate = "Start date conflicts with an existing booking";

            badEnd = true;
            err.errors.endDate = "End date conflicts with an existing booking";
        }
        //console.log(badStart);
        //console.log(badEnd);

        if ((badStart || badEnd) || (badStart && badEnd)) {
            return next(err);
        }
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

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    }

    const existingReview = await Review.findOne({
        where: {
            spotId: spot.id,
            userId: req.user.id
        }
    });

    if (existingReview) {
        res.status(403);
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        });
    }

    const {review, stars} = req.body;
    const newSpotReview = await Review.create({
        spotId: spot.id,
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
        res.status(403);
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

    let specSpotImg = spotImage.toJSON();
    delete specSpotImg.spotId;
    delete specSpotImg.createdAt;
    delete specSpotImg.updatedAt;

    res.status(200);
    return res.json(specSpotImg);
});

router.post('/', requireAuth, validateSpot, async(req, res, next) => {
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
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (spot.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "You do not have authorization to edit this spot"
        });
    }

    spot.set({address, city, state, country, lat, lng, name, description, price});

    await spot.save();

    res.status(200)
    return res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotToDelete = await Spot.findByPk(req.params.spotId);

    if (!spotToDelete) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (spotToDelete.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "You do not have authorization to delete this spot"
        });
    }

    await spotToDelete.destroy();

    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;