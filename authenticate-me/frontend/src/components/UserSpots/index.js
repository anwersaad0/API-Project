import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserSpotsThunk } from "../../store/spots";
import DeleteSpot from "../DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";
import './UserSpots.css';

const UserSpots = () => {
    const userSpotsObj = useSelector(state => state.spots.userSpots);
    const userSpotsArr = Object.values(userSpotsObj);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserSpotsThunk());
    }, [dispatch]);

    if (!userSpotsArr) return null;

    return (
        <>
            <div className="main-manage-ui">
                <h1>Manage Your Spots</h1>
            </div>
            <div className="spots-div">
                {userSpotsObj && userSpotsArr.map(spot => (
                    <div className="spot-preview" key={spot.id} >
                        <Link title={spot.name} className="spot-img-div" to={`/spots/${spot.id}`}>
                            <img className="spot-img" src={spot.previewImage} alt="A Spot Pic"></img>
                        </Link>

                        <div className="details-part-1">
                            <p>{spot.city}, {spot.state}</p>
                            
                            <p><i className="preview-star fas fa-star" />{(spot.avgRating) ? spot.avgRating.toFixed(1) : "New"}</p>
                        </div>
                        
                        <div className="details-part-2">
                            <p className="spot-preview-price-edit">${spot.price} Night</p>
                            <div className="manage-ui">
                                <Link className="update-spot-link" to={`/spots/${spot.id}/update`}>Update</Link>
                                <OpenModalButton buttonClass="delete-spot-modal-button" buttonText="Delete" modalComponent={<DeleteSpot spot={spot}/>} />
                            </div>
                        </div>
                    
                    </div>
                ))}
            </div>
        </>
        
    )
}

export default UserSpots;