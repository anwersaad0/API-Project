import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserSpotsThunk } from "../../store/spots";
import DeleteSpot from "../DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";

const UserSpots = () => {
    const userSpotsObj = useSelector(state => state.spots.userSpots);
    const userSpotsArr = Object.values(userSpotsObj);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserSpotsThunk());
    }, [dispatch]);

    if (!userSpotsObj) return null;

    return (
        <div className="spots-div">
            {userSpotsObj && userSpotsArr.map(spot => (
                <div key={spot.id}>
                    <img className="spot-img" src={spot.previewImage} alt="A Spot Pic"></img>
                    <Link to={`/spots/${spot.id}`}>
                        {spot.city}, {spot.state}
                    </Link>
                    <p>${spot.price} per Night</p>
                    <div>
                        <Link to={`/spots/${spot.id}/update`}>Update</Link>
                        <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpot spot={spot}/>} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserSpots;