import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserBookingsThunk } from "../../store/bookings";

const UserBookings = () => {
    const dispatch = useDispatch();

    const userBookings = useSelector(state => Object.values(state.bookings));

    return (
        <div>
            <h1>lmao testing</h1>
        </div>
    )
}

export default UserBookings