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
                <div className="spot-preview" key={spot.id} >
                    <Link title={spot.name} to={`/spots/${spot.id}`} className="spot-img-div">
                        <img className="spot-img" src={spot.previewImage} alt="A Spot Pic"></img>
                    </Link>

                    <div className="details-part-1">
                        <p>{spot.city}, {spot.state}</p>
                        
                        <p><i className="preview-star fas fa-star" />{(spot.avgRating) ? spot.avgRating.toFixed(1) : "New"}</p>
                    </div>
                    
                    <p className="spot-preview-price">${spot.price} Night</p>
                </div>
            ))}
        </div>
    )
}

export default AllSpots;