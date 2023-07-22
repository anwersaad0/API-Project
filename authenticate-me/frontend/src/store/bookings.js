import { csrfFetch } from "./csrf";

const GET_USER_BOOKINGS = "bookings/getUserBookings";

//actions

const getUserBookings = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        bookings
    }
}

//thunks

export const getUserBookingsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/bookings/current');

    const userBookingList = await res.json();
    dispatch(getUserBookings(userBookingList));
    return userBookingList;
}

const initState = {};

const bookingReducer = (state = initState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_USER_BOOKINGS:
            const userState = {};
            action.list.bookings.forEach(booking => {
                userState[booking.id] = booking
            });

            return userState;
        default:
            return state;
    }
}

export default bookingReducer;