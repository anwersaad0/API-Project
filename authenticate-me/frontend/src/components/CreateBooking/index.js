import { createBookingThunk } from "../../store/bookings";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateBooking = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const specSpotObj = useSelector(state => state.spots.specSpot);
    const sessionUser = useSelector(state => state.session.user);

    const [startDate, setStartDate] = useState(Date());
    const [endDate, setEndDate] = useState(Date());

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            startDate: startDate,
            endDate: endDate
        }

        let createdBooking = await dispatch(createBookingThunk(specSpotObj.id, payload));

        if (createdBooking) {
            history.push(`/bookings/current`);
        }
    }

    return (
        <div className="create-booking-modal">
            
            <h2>Book a stay for this Spot?</h2>
            <form className="add-book-details" onSubmit={handleSubmit}>
                <div>
                    <input 
                        className="start-date-input"
                        type="date"
                        name="start-date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </div>

                <div>
                    <input 
                        className="end-date-input"
                        type="date"
                        name="end-date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>

                <div>
                    <button className="submit-create-booking" type="submit">Create Booking</button>
                </div>
            </form>
        </div>
    )
}