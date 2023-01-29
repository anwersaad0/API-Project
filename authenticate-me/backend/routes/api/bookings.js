const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, Booking, SpotImage } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const currentBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                }
            }
        ]
    });

    let bookList = [];
    currentBookings.forEach(booking => {
        bookList.push(booking.toJSON());
    });

    for (booking of bookList) {
        let spotImage = await SpotImage.findOne({
            where: {
                spotId: booking.Spot.id,
                preview: true
            }
        });
        if (!spotImage) {
            booking.Spot.previewImage = "No preview image found";
        } else {
            booking.Spot.previewImage = spotImage.url;
        }
    }

    res.status(200);
    return res.json({
        Bookings: bookList
    });
});

router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingEdit = await Booking.findByPk(req.params.bookingId);

    if (!bookingEdit) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    }
    
    if (bookingEdit.userId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "You do not have authorization to edit this booking"
        });
    }

    const {startDate, endDate} = req.body;

    if (bookingEdit.startDate.getTime() <= new Date().getTime() && 
    bookingEdit.endDate.getTime() <= new Date().getTime()) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

    const spot = await Spot.findOne({
        where: {
            id: bookingEdit.spotId
        }
    })
    const existingBookings = await Booking.findAll({
        where: {
            spotId: spot.id
        }
    });

    let specExBooks = []
    existingBookings.forEach(exBook => {
        if (exBook.toJSON().id !== bookingEdit.id) {
            //console.log("test");
            specExBooks.push(exBook.toJSON());
        }
        //console.log(specExBooks);
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

    bookingEdit.set({
        startDate: new Date(startDate),
        endDate: new Date(endDate)
    });

    await bookingEdit.save();

    res.status(200);
    return res.json(bookingEdit);
});

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingDel = await Booking.findByPk(req.params.bookingId);

    if (!bookingDel) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    }

    const spot = await Spot.findOne({
        where: {
            id: bookingDel.spotId
        }
    });

    if (bookingDel.userId !== req.user.id && spot.ownerId !== req.user.id) {
        res.status(403);
        return res.json({
            message: "You do not have authorization to delete this booking"
        });
    }

    if (bookingDel.startDate.getTime() <= new Date().getTime() && 
    new Date().getTime() < bookingDel.endDate.getTime()) {
        res.status(403);
        return res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        });
    }

    await bookingDel.destroy();

    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;