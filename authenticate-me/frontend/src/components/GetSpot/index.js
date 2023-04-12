import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneSpotThunk } from "../../store/spots";
import { useParams } from "react-router-dom";
import SpotReviews from "../SpotReviews";
import './GetSpot.css';

const GetSpot = () => {
    const dispatch = useDispatch();

    const { spotId } = useParams();
    const specSpotObj = useSelector(state => state.spots.specSpot);

    console.log(specSpotObj);

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch, spotId]);

    const reserveAlert = (e) => {
        e.preventDefault();
        alert("Feature coming soon.")
    }

    if (!specSpotObj.SpotImages) return null;

    return (
        <div className="get-spot-div" key={specSpotObj.id}>
            <h1 key="spot-name">{specSpotObj.name}</h1>
            <h3 key="spot-locale">{specSpotObj.city}, {specSpotObj.state}, {specSpotObj.country}</h3>
            <div key="spot-pics" className="spot-pics">

                <div className="main-image-div">
                    <img key={specSpotObj.SpotImages[0].id} className="spec-spot-img main-img" src={specSpotObj.SpotImages[0].url} alt="Not Found"></img>
                </div>

                <div className="side-images-div">
                    <div>{specSpotObj.SpotImages[1] ? (<img key={specSpotObj.SpotImages[1].id} className="spec-spot-img side-img" src={specSpotObj.SpotImages[1].url} alt="Not Found"></img>) : ""}</div>
                    <div>{specSpotObj.SpotImages[2] ? (<img key={specSpotObj.SpotImages[2].id} className="spec-spot-img side-img" src={specSpotObj.SpotImages[2].url} alt="Not Found"></img>) : ""}</div>
                    <div>{specSpotObj.SpotImages[3] ? (<img key={specSpotObj.SpotImages[3].id} className="spec-spot-img side-img" src={specSpotObj.SpotImages[3].url} alt="Not Found"></img>) : ""}</div>
                    <div>{specSpotObj.SpotImages[4] ? (<img key={specSpotObj.SpotImages[4].id} className="spec-spot-img side-img" src={specSpotObj.SpotImages[4].url} alt="Not Found"></img>) : ""}</div>
                </div>
            </div>

            <div className="owner-reserve-div">
                <div key="spot-owner-details">
                    <h3>Spot hosted by {specSpotObj.Owner.firstName} {specSpotObj.Owner.lastName}</h3>
                    <p>{specSpotObj.description}</p>
                </div>

                <div className="reserve-div">
                    <div className="reserve-details">
                        <h3>${specSpotObj.price} Night</h3>
                        <h3><i className="preview-star fas fa-star" />{(specSpotObj.avgStarRating) ? specSpotObj.avgStarRating.toFixed(1) : "New"}</h3>
                        <h3 className="rev-count-h3">{(specSpotObj.numReviews) ? (<h3 className="center-dot">&bull;</h3>) : ""} {(specSpotObj.numReviews > 1) ? `${specSpotObj.numReviews} Reviews` : (specSpotObj.numReviews === 1) ? `${specSpotObj.numReviews} Review` : ""}</h3>
                    </div>

                    <div className="reserve-button-div">
                        <button className="reserve-button" onClick={reserveAlert}>Reserve</button>
                    </div>
                </div>
            </div>
            
            <div className="spot-numbers" key="spot-numbers">

                <div className="spot-review-stats">
                    <h3><i className="preview-star fas fa-star" />{(specSpotObj.avgStarRating) ? specSpotObj.avgStarRating.toFixed(1) : "New"}</h3>
                    <h3 className="rev-count-h3">{(specSpotObj.numReviews) ? (<h3 className="center-dot">&bull;</h3>) : ""} {(specSpotObj.numReviews > 1) ? `${specSpotObj.numReviews} Reviews` : (specSpotObj.numReviews === 1) ? `${specSpotObj.numReviews} Review` : ""}</h3>
                </div>
                
            </div>

            <div>
                <SpotReviews />
            </div>
        </div>
    )
}

export default GetSpot;