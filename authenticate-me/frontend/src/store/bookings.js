import { csrfFetch } from "./csrf";

//const GET_ONE_BOOKING = "bookings/getOneBooking";
const GET_USER_BOOKINGS = "bookings/getUserBookings";
const CREATE_BOOKING = "bookings/createBooking";
const DELETE_BOOKING = "bookings/deleteBooking";

//actions

// const getSingleBooking = (booking) => {
//     return {
//         type: GET_ONE_BOOKING,
//         booking
//     }
// }

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

const deleteBooking = (booking) => {
    return {
        type: DELETE_BOOKING,
        booking
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
    console.log('book', newBooking);
    return newBooking;
}

export const editBookingThunk = (booking) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(booking)
    });

    const editedBooking = await res.json();
    dispatch(createBooking(editedBooking));
    return editedBooking;
}

//reducer

const initState = {};

const bookingReducer = (state = initState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_USER_BOOKINGS:
            const userState = {...action.bookings};
            return userState;
        case CREATE_BOOKING:
            newState[action.newBook.id] = action.newBook;
            return newState;
        default:
            return state;
    }
}

export default bookingReducer;