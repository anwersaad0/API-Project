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
                    <img key={image.id} className="spec-spot-img" src={image.url} alt="Not Found"></img>
                ))}
            </div>
            <div key="spot-owner-details">
                <h3>Spot hosted by {specSpotObj.Owner.firstName} {specSpotObj.Owner.lastName}</h3>
                <p>{specSpotObj.description}</p>
            </div>
            <div className="spot-numbers" key="spot-numbers">
                <h3>${specSpotObj.price} Night</h3>

                <div className="spot-review-stats">
                    <h3><i className="preview-star fas fa-star" />{(specSpotObj.avgStarRating) ? specSpotObj.avgStarRating.toFixed(1) : "New"}</h3>
                    <h3>{(specSpotObj.numReviews > 1) ? `${specSpotObj.numReviews} Reviews` : (specSpotObj.numReviews === 1) ? `${specSpotObj.numReviews} Review` : ""}</h3>
                </div>
                
            </div>
        </div>
    )
}

export default GetSpot;