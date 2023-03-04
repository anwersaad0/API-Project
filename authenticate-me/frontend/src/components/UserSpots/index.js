import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserSpotsThunk } from "../../store/spots";

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
                    <Link key={spot.id} to={`/spots/${spot.id}`}>
                        {spot.city}, {spot.state}
                    </Link>
                    <p>${spot.price} per Night</p>
                    <div>
                        <Link key={spot.id} to={`/spots/${spot.id}/update`}>Update</Link>
                        <Link key={spot.id}>Delete</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserSpots;