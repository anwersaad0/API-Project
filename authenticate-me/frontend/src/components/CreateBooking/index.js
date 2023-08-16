import { createBookingThunk } from "../../store/bookings";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './CreateBooking.css';

const CreateBooking = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const specSpotObj = useSelector(state => state.spots.specSpot);
    const sessionUser = useSelector(state => state.session.user);

    const [startDate, setStartDate] = useState(Date());
    const [endDate, setEndDate] = useState(Date());

    console.log(specSpotObj);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            startDate: startDate,
            endDate: endDate
        }

        let createdBooking = await dispatch(createBookingThunk(specSpotObj.id, payload));

        if (createdBooking) {
            closeModal();
            history.push('/bookings/current');
        }
    }

    return (
        <div className="create-booking-modal">
            
            <h2 className="add-book-title">Book a stay for this Spot?</h2>

            <div className="add-book-spot-details">
                <div className="add-book-spot-img-div">
                    <img className="add-book-spot-img" src={specSpotObj?.SpotImages[0].url} alt="Spot Image" />
                </div>
                <div className="add-book-spot-text">
                    <h3>{specSpotObj.name}</h3>
                    <h4>Hosted by {specSpotObj.Owner.firstName} {specSpotObj.Owner.lastName}</h4>
                </div>
            </div>

            <form className="add-book-details" onSubmit={handleSubmit}>
                <div className="add-book-main-ui">
                    <div className="start-date-ui">
                        <div><label for="start-date">Start Date:</label></div>
                        <input 
                            className="start-date-input"
                            type="date"
                            name="start-date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <div><label for="end-date">End Date:</label></div>
                        <input 
                            className="end-date-input"
                            type="date"
                            name="end-date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="add-book-submit-ui">
                    <button className="submit-create-booking" type="submit">Create Booking</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBooking;