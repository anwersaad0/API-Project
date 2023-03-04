import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/loadSpots";
const LOAD_ONE_SPOT = "spots/loadOneSpot";
const LOAD_USER_SPOTS = "spots/loadUserSpots";
const CREATE_SPOT = "spots/createSpot";
//const REMOVE_SPOT = "spots/removeSpot";

const getSpots = (list) => {
    return {
        type: LOAD_SPOTS,
        list
    }
}

const getSpecSpot = (spot) => {
    return {
        type: LOAD_ONE_SPOT,
        spot
    }
}

const getUserSpots = (list) => {
    return {
        type: LOAD_USER_SPOTS,
        list
    }
}

const addNewSpot = (newSpot) => {
    return {
        type: CREATE_SPOT,
        newSpot
    }
}

export const getSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    const list = await response.json();
    dispatch(getSpots(list));
}

export const getOneSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    const spotData = await response.json();
    //console.log(spotData);
    dispatch(getSpecSpot(spotData));
}

export const getUserSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');

    const userSpotList = await response.json();
    dispatch(getUserSpots(userSpotList));
}

export const createSpotThunk = (payload, images) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    const newSpot = await response.json();
    newSpot.SpotImages = [];
    for (let img of images) {
        const response2 = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(img)
        });
        const newSpotImg = await response2.json();
        newSpot.SpotImages.push(newSpotImg);
    }

    console.log('Spot Imgs: ' + newSpot.SpotImages);
    
    dispatch(addNewSpot(newSpot));
    return newSpot;
}

export const editSpotThunk = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    const changedSpot = await response.json();
    dispatch(addNewSpot(changedSpot));
    return changedSpot;
}

const initialState = { allSpots: {}, specSpot: {}, userSpots: {} };

const spotReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case LOAD_SPOTS:
            const allState = {};
            action.list.Spots.forEach(spot => {
                allState[spot.id] = spot;
            });

            newState.allSpots = allState;
            return newState;
        case LOAD_ONE_SPOT:
            const oneState = newState;
            console.log(action.spot);
            oneState.specSpot = action.spot;
            return oneState;
        case LOAD_USER_SPOTS:
            const userState = {};
            action.list.Spots.forEach(spot => {
                userState[spot.id] = spot;
            });

            newState.userSpots = userState;
            return newState;
        case CREATE_SPOT:
            const createState = {...state, allSpots: {...state.allSpots}};
            createState.allSpots[action.newSpot.id] = action.newSpot;
            return createState;
        default:
            return state;
    }
}

export default spotReducer;