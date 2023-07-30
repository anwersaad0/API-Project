const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Review, User, ReviewImage, Spot, SpotImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
    check('review')
        .exists({checkFalsy: true})
        .withMessage("Review text is required"),
    check('stars')
        .exists({checkFalsy: true})
        .withMessage("Stars must be an integer from 1 & 5"),
    handleValidationErrors
];

const notFoundErr = new Error("Review couldn't be found");
notFoundErr.status = 404;

router.get('/current', requireAuth, async (req, res) => {
    const revsByUser = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
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

    let revList = [];
    revsByUser.forEach(rev => {
        revList.push(rev.toJSON());
    });

    for (rev of revList) {
        let spotImage = await SpotImage.findOne({
            where: {
                spotId: rev.Spot.id,
                preview: true
            }
        });
        if (!spotImage) {
            rev.Spot.previewImage = "No preview image found";
        } else {
            rev.Spot.previewImage = spotImage.url;
        }
    }

    res.status(200);
    return res.json({
        Reviews: revList
    });
});

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const {url} = req.body;

    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        return next(notFoundErr);
    }

    if (review.userId !== req.user.id) {

        let notOwnRevErr = new Error("Cannot post an image for another user's review");
        notOwnRevErr.status = 401;

        return next(notOwnRevErr);
    }

    const existingImages = await ReviewImage.findAll({
        where: {
            reviewId: review.id
        }
    });

    if (existingImages.length === 10) {

        let maxRevImgErr = new Error("Maximum number of images for this resource was reached");
        maxRevImgErr.status = 403;

        return next(maxRevImgErr);
    }

    const reviewImage = await ReviewImage.create({
        reviewId: review.id,
        url
    });

    const specImage = reviewImage.toJSON();
    delete specImage.reviewId;
    delete specImage.createdAt;
    delete specImage.updatedAt;

    res.status(200);
    return res.json(specImage);
});

router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const {review, stars} = req.body;

    const reviewEdit = await Review.findByPk(req.params.reviewId);
    if (!reviewEdit) {
        return next(notFoundErr);
    }

    if (reviewEdit.userId !== req.user.id) {
        
        let notOwnRevErr = new Error("Cannot edit another user's review");
        notOwnRevErr.status = 401;

        return next(notOwnRevErr);
    }

    reviewEdit.set({review, stars});

    await reviewEdit.save();

    res.status(200);
    return res.json(reviewEdit);
});

router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    const reviewDel = await Review.findByPk(req.params.reviewId);
    if (!reviewDel) {
        return next(notFoundErr);
    }

    if (reviewDel.userId !== req.user.id) {

        let notOwnRevErr = new Error("Cannot delete another user's review");
        notOwnRevErr.status = 401;

        return next(notOwnRevErr);
    }

    await reviewDel.destroy();

    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

module.exports = router;