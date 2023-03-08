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

    //console.log(prevDetails);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    useEffect(() => {
        const getSpotDets = async () => {
            await dispatch(getOneSpotThunk(spotId))
        }

        getSpotDets();

        setName(prevDetails.name);
        setAddress(prevDetails.address);
        setCity(prevDetails.city);
        setState(prevDetails.state);
        setCountry(prevDetails.country);
        setPrice(prevDetails.price);
        setDescription(prevDetails.description);
        setLat(prevDetails.lat);
        setLng(prevDetails.lng);

    }, [dispatch, spotId, prevDetails.name, prevDetails.address, prevDetails.city,
    prevDetails.state, prevDetails.country, prevDetails.price,
    prevDetails.description, prevDetails.lat, prevDetails.lng]);

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