import { createBookingThunk } from "../../store/bookings";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CreateBooking = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            startDate: startDate,
            endDate: endDate
        }

        //let createdBooking = await dispatch(createBookingThunk)
    }

    return (
        <div>
            
            <h2>Book a stay for this Spot?</h2>
            <form className="add-book-details" onSubmit={handleSubmit}>

            </form>
        </div>
    )
}