import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/loadReviews";
const CREATE_REVIEW = "reviews/createReview";
const DELETE_REVIEW = "reviews/deleteReview";

const getReviews = (list) => {
    return {
        type: LOAD_REVIEWS,
        list
    }
}

const createReview = (newRev) => {
    return {
        type: CREATE_REVIEW,
        newRev
    }
}

const deleteReview = (rev) => {
    return {
        type: DELETE_REVIEW,
        rev
    }
}

export const getReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    const spotReviewList = await response.json();
    dispatch(getReviews(spotReviewList));
}

export const createReviewThunk = (spotId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    const newReview = await response.json();
    console.log(newReview);
    dispatch(createReview(newReview));
    return newReview;
}

export const deleteReviewThunk = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${payload.id}`, {
        method: 'DELETE'
    })

    const delRev = await response.json();

    dispatch(deleteReview(delRev));
}

const initState = {};

const reviewReducer = (state = initState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_REVIEWS:
            const getReviewsState = {};
            action.list.Reviews.forEach(review => {
                getReviewsState[review.id] = review;
            });

            newState = getReviewsState;
            return newState;
        case CREATE_REVIEW:
            newState[action.newRev.id] = action.newRev;
            return newState;
        case DELETE_REVIEW:
            const delState = {...state};
            delete delState[action.rev.id];
            return delState;
        default:
            return state;
    }
}

export default reviewReducer;