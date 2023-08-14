import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserBookingsThunk } from "../../store/bookings";
import { Link } from "react-router-dom";
import "./UserBookings.css";

const UserBookings = () => {
    const dispatch = useDispatch();

    const userBookings = useSelector(state => state.bookings);
    const sessionUser = useSelector(state => state.session.user);
    const userBookingsList = userBookings.Bookings;

    useEffect(() => {
        dispatch(getUserBookingsThunk());
    }, [dispatch]);

    console.log('test', userBookingsList);

    if (!userBookings) {
        return null;
    }

    return (
        <div className="user-bookings-page">
            <h1>{sessionUser.username}'s Bookings</h1>
            <div className="user-bookings-div">
                {userBookingsList?.map(booking => (
                    <div key={booking.id} className="user-booking">
                        <div className="user-booking-img-div">
                            <img className="user-booking-img" src={booking?.Spot.previewImage} alt={booking?.Spot.name}></img>
                        </div>

                        <div className="user-booking-details-div">
                            <Link className="user-booking-link" to={`/spots/${booking?.Spot.id}`}>
                                <p>{booking?.Spot.name}</p>
                            </Link>
                            
                            <p>Period: {booking?.startDate.slice(0, 10)} - {booking?.endDate.slice(0, 10)}</p>
                            <div className="user-booking-ui-div">
                                <button className="booking-edit-btn">Edit</button>
                                <button className="booking-del-btn">Cancel</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserBookings;