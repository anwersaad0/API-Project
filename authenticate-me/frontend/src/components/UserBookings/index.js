import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserBookingsThunk } from "../../store/bookings";
import "./UserBookings.css";

const UserBookings = () => {
    const dispatch = useDispatch();

    const userBookings = useSelector(state => Object.values(state.bookings));
    const sessionUser = useSelector(state => state.session.user);
    const userBookingsList = userBookings[0];

    useEffect(() => {
        dispatch(getUserBookingsThunk());
    }, [dispatch]);

    console.log('test', userBookings);

    if (!userBookings) {
        return null;
    }

    return (
        <div className="user-bookings-page">
            <h1>{sessionUser.username}'s Bookings</h1>
            <div className="user-bookings-div">
                {userBookingsList?.map(booking => (
                    <div key={booking.id} className="user-booking">
                        <div>
                            <img src={booking.Spot.previewImage} alt={booking.Spot.name}></img>
                        </div>
                        <p>{booking.Spot.name}</p>
                        <p>From {booking.startDate.slice(0, 10)} to {booking.endDate.slice(0, 10)}</p>
                        <div>
                            <button>Edit Booking</button>
                            <button>Cancel Booking</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserBookings;