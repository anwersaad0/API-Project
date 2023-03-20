import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import './AllSpots.css';

const AllSpots = () => {
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spotsArr = Object.values(spotsObj);

    const dispatch = useDispatch();

    //console.log(spotsObj);

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);

    if (!spotsObj) return null;

    return (
        <div className="spots-div">
            {spotsObj && spotsArr.map(spot => (
                <Link title={spot.name} className="spot-preview" key={spot.id} to={`/spots/${spot.id}`}>
                    <div className="spot-img-div">
                        <img className="spot-img" src={spot.previewImage} alt="A Spot Pic"></img>
                    </div>

                    <div className="details-part-1">
                        {/* <Link title={spot.name} key={spot.id} to={`/spots/${spot.id}`}>
                            {spot.city}, {spot.state}
                        </Link> */}
                        <p>{spot.city}, {spot.state}</p>
                        
                        <p><i className="preview-star fas fa-star" />{(spot.avgRating) ? spot.avgRating.toFixed(1) : "New"}</p>
                    </div>
                    
                    <p className="spot-preview-price">${spot.price} Night</p>
                </Link>
            ))}
        </div>
    )
}

export default AllSpots;