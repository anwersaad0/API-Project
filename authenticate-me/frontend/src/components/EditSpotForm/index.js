import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpotThunk, getOneSpotThunk } from "../../store/spots";
import './EditSpot.css';

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
        <section className="update-spot-section">
            <form className="update-spot-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Update your Spot</h1>
                
                <div className="location-details">
                    <h2>Where's your place located?</h2>
                    <h3>Guests will only get the exact address once they have booked a reservation.</h3>

                    <div className="location-ui ui-country">
                        <div><label for="country">Country:</label></div>
                        <input className="input-long"
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={country}
                            onChange={e => setCountry(e.target.value)} 
                        />
                    </div>
                    
                    <div className="location-ui">
                        <div><label for="address">Street Address:</label></div>
                        <input className="input-long"
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)} 
                        />
                    </div>
                    
                    <div className="location-ui city-state">
                        <div className="ui-city">
                            <div><label for="city">City:</label></div>
                            <input className="input-city"
                                type="text"
                                name="city"
                                placeholder="City"
                                value={city}
                                onChange={e => setCity(e.target.value)} 
                            />,
                        </div>
                        
                        <div className="ui-state">
                            <div><label for="state">State:</label></div>
                            <input className="input-state"
                                type="text"
                                name="state"
                                placeholder="State"
                                value={state}
                                onChange={e => setState(e.target.value)} 
                            />
                        </div>
                    </div>
                    
                    <div className="location-ui city-state">
                        <div>
                            <div><label for="lat">Latitude:</label></div>
                            <input className="input-lat"
                                type="number"
                                name="lat"
                                placeholder="Latitude"
                                value={lat}
                                onChange={e => setLat(e.target.value)} 
                            />,
                        </div>

                        <div className="ui-lng">
                            <div><label for="lng">Longitude:</label></div>
                            <input className="input-lng"
                                type="number"
                                name="lng"
                                placeholder="Longitude"
                                value={lng}
                                onChange={e => setLng(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>

                <div className="description-field">
                    <h2>Describe your place to guests</h2>
                    <h3>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h3>

                    <textarea className="input-desc"
                        placeholder="Please write at least 30 characters"

                        cols="54"
                        rows="6"

                        value={description}
                        onChange={e => setDescription(e.target.value)} 
                    ></textarea>
                </div>

                <div className="name-field">
                    <h2>Create a name for your spot</h2>
                    <h3>Catch guests' attention with a spot name that highlights what makes your place special.</h3>
                    <input className="input-long input-name"
                        type="text"
                        placeholder="Name of your spot"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                </div>
                
                <div className="price-field">
                    <h2>Set base price for your spot</h2>
                    <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>

                    <div className="ui-price">
                        $<input className="input-price"
                            type="number"
                            placeholder="Price (USD)"
                            min="0"
                            value={price}
                            onChange={e => setPrice(e.target.value)} 
                        />
                    </div>
                </div>

                <div className="submit-update-spot">
                    <button className="update-spot-button" type="submit">Update Spot</button>
                </div>
                
            </form>
        </section>
    )
}

export default EditSpot;