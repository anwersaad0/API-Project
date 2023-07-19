import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import './AllSpots.css';
import { useState } from "react";

const AllSpots = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spotsArr = Object.values(spotsObj);
    const spotsArrRev = spotsArr.toReversed();

    const [query, setQuery] = useState("");

    //console.log(spotsObj);

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);

    //console.log(spotsArrRev);

    if (!spotsObj) return null;

    return (
        <div>
            <div className="spot-search-div">
                <input className="spot-search-bar" placeholder="Search Spots by Location" onChange={e => setQuery(e.target.value)} />
            </div>

            <div className="spots-div">
                {spotsArrRev?.filter(spot => {
                    if (query === '') {
                        return spot;
                    } else if (spot?.city.toLowerCase().includes(query.toLocaleLowerCase())) {
                        return spot;
                    } else if (spot?.state.toLowerCase().includes(query.toLocaleLowerCase())) {
                        return spot;
                    } else if (spot?.country.toLowerCase().includes(query.toLocaleLowerCase())) {
                        return spot;
                    } else if (spot?.name.toLowerCase().includes(query.toLocaleLowerCase())) {
                        return spot;
                    }
                }).map(spot => (
                    <div className="spot-preview" key={spot?.id} >
                        <Link title={spot?.name} to={`/spots/${spot?.id}`} className="spot-img-div">
                            <img className="spot-img" src={spot?.previewImage} alt="A Spot Pic"></img>
                        </Link>

                        <div className="details-part-1">
                            <p>{spot?.city}, {spot?.state}</p>
                            
                            <p><i className="preview-star fas fa-star" />{(spot?.avgRating) ? spot?.avgRating.toFixed(1) : "New"}</p>
                        </div>
                        
                        <p className="spot-preview-price">${spot?.price} Night</p>
                    </div>
                ))}
            </div>

            <footer className="ayybne-footer">
                <a className="footer-text">Made by Saad Anwer | </a>
                <a className="contributor" href="https://github.com/anwersaad0">GitHub</a>
                <a className="footer-text"> | </a>
                <a className="contributor" href="https://www.linkedin.com/in/saad-anwer-01aab317a/">LinkedIn</a>
            </footer>
        </div>
    )
}

export default AllSpots;