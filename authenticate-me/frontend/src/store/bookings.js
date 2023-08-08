import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = "bookings/getUserBookings";
const CREATE_BOOKING = "bookings/createBooking";

//actions

const getUserBookings = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        bookings
    }
}

const createBooking = (newBook) => {
    return {
        type: CREATE_BOOKING,
        newBook
    }
}

//thunks

export const getUserBookingsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/bookings/current');

    const userBookingList = await res.json();
    dispatch(getUserBookings(userBookingList));
    return userBookingList;
}

export const createBookingThunk = (spotId, payload) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    const newBooking = await res.json();
    dispatch(createBooking(newBooking));
    return newBooking;
}

const initState = {};

const bookingReducer = (state = initState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_USER_BOOKINGS:
            const userState = {...action.bookings};
            return userState;
        case CREATE_BOOKING:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default bookingReducer;