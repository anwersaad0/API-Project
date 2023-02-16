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
                <div key={spot.id}>
                    <img className="spot-img" src={spot.previewImage} alt="A Spot Pic"></img>
                    <Link key={spot.id} to={`/spots/${spot.id}`}>
                        {spot.name}
                    </Link>
                    <p>${spot.price} per Night</p>
                </div>
            ))}
        </div>
    )
}

export default AllSpots;