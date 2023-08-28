import { useDispatch, useSelector } from "react-redux";
import { editBookingThunk } from "../../store/bookings";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const EditBooking = ({bookId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    const [startDate, setStartDate] = useState(Date());
    const [endDate, setEndDate] = useState(Date());

    useEffect(() => {

    }, [dispatch])

    return (
        <div>
            
        </div>
    )
}

export default EditBooking;