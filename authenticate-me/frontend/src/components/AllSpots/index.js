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
        <div>
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

            <footer className="ayybne-footer">
                <a className="footer-text">Made by Saad Anwer |  </a>
                <a className="contributor" href="https://github.com/anwersaad0">GitHub</a>
                <a className="footer-text">  |  </a>
                <a className="contributor" href="https://www.linkedin.com/in/saad-anwer-01aab317a/">LinkedIn</a>
            </footer>
        </div>
    )
}

export default AllSpots;