import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";
import { useParams } from "react-router-dom";

const GetSpot = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams();
    const specSpotObj = useSelector(state => state.spots.specSpot);

    console.log(specSpotObj);

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch, spotId]);

    if (!specSpotObj.SpotImages) return null;

    return (
        <div key={specSpotObj.id}>
            <h1 key="spot-name">{specSpotObj.name}</h1>
            <h3 key="spot-locale">{specSpotObj.city}, {specSpotObj.state}, {specSpotObj.country}</h3>
            <div key="spot-pics">
                {specSpotObj.SpotImages.map(image => (
                    <img key={image.id} className="spot-img" src={image.url} alt="Not Found"></img>
                ))}
            </div>
            <div key="spot-owner-details">
                <h3>Spot hosted by {specSpotObj.Owner.firstName} {specSpotObj.Owner.lastName}</h3>
                <p>{specSpotObj.description}</p>
            </div>
            <div key="spot-numbers">
                <h3>${specSpotObj.price} Night</h3>
                <h4>Reviews: {specSpotObj.numReviews}</h4>
            </div>
        </div>
    )
}

export default GetSpot;