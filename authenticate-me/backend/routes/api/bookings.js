const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, Booking } = require('../../db/models');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const currentBookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [{model: Spot}]
    });

    res.status(200);
    return res.json({
        Bookings: currentBookings
    });
});

router.put('/:bookingId', requireAuth, async (req, res) => {
    const bookingEdit = await Booking.findByPk(req.params.bookingId);

    if (!bookingEdit) {
        res.status(404);
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    }
    
    if (bookingEdit.userId !== req.user.id) {
        res.status(400);
        return res.json({
            message: "You do not have authorization to edit this booking"
        });
    }

    const {startDate, endDate} = req.body;

    bookingEdit.set({
        startDate: new Date(startDate),
        endDate: new Date(endDate)
    });

    if (bookingEdit.endDate.getTime() <= new Date().getTime()) {
        res.status(403);
        return res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

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
        res.status(400);
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