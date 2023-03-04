import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpotThunk, getOneSpotThunk } from "../../store/spots";

const EditSpot = () => {
    const { spotId } = useParams(); 
    const dispatch = useDispatch();
    const history = useHistory();

    const prevDetails = useSelector(state => state.spots.specSpot);

    console.log(prevDetails);

    const [name, setName] = useState(prevDetails.name);
    const [address, setAddress] = useState(prevDetails.address);
    const [city, setCity] = useState(prevDetails.city);
    const [state, setState] = useState(prevDetails.state);
    const [country, setCountry] = useState(prevDetails.country);
    const [price, setPrice] = useState(prevDetails.price);
    const [description, setDescription] = useState(prevDetails.description);
    const [lat, setLat] = useState(prevDetails.lat);
    const [lng, setLng] = useState(prevDetails.lng);

    useEffect(() => {
        dispatch(getOneSpotThunk(spotId))
    }, [dispatch, spotId])

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            id: spotId,
            name,
            address,
            city,
            state,
            country,
            price,
            description,
            lat,
            lng,
        };

        let changedSpot = dispatch(editSpotThunk(payload)).then((changedSpot) => {
            history.push(`/spots/${changedSpot.id}`)
        });
        console.log('spot id: ' + changedSpot.id);
        
    }

    return (
        <section>
            <form className="edit-spot-form" onSubmit={handleSubmit}>
                <h1>Update your Spot</h1>
                <div className="update-location-details">
                    <input
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={e => setCountry(e.target.value)} 
                    />
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)} 
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={e => setCity(e.target.value)} 
                    />
                    <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={e => setState(e.target.value)} 
                    />
                    <input
                        type="number"
                        placeholder="Latitude"
                        value={lat}
                        onChange={e => setLat(e.target.value)} 
                    />
                    <input
                        type="number"
                        placeholder="Longitude"
                        value={lng}
                        onChange={e => setLng(e.target.value)} 
                    />
                </div>

                <div className="update-description-field">
                    <h2>Describe your spot</h2>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)} 
                    />
                </div>

                <div className="update-name-field">
                    <h2>Create a name for your spot</h2>
                    <input
                        type="text"
                        placeholder="Spot Name"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                </div>
                
                <div className="update-price-field">
                    <h2>Set base price for your spot</h2>
                    <input
                        type="number"
                        placeholder="Price (USD)"
                        min="0"
                        value={price}
                        onChange={e => setPrice(e.target.value)} 
                    />
                </div>

                <button type="submit">Update Spot</button>
            </form>
        </section>
    )
}

export default EditSpot;