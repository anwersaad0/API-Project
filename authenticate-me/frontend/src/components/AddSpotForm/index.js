import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";
import './AddSpot.css';


const AddSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const [prevImage, setPrevImage] = useState('');
    const [image2, setImg2] = useState('');
    const [image3, setImg3] = useState('');
    const [image4, setImg4] = useState('');
    const [image5, setImg5] = useState('');

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const payload = {
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

        const newSpotImages = [
            {url: prevImage, preview: true},
            {url: image2, preview: false},
            {url: image3, preview: false},
            {url: image4, preview: false},
            {url: image5, preview: false},
        ]
        
        let createdSpot = await dispatch(createSpotThunk(payload, newSpotImages))
            .catch(
                async(res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );

        console.log('spot id: ' + createdSpot.id);
        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }
    }

    return (
        <section className="create-spot-section">
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Create a new Spot</h1>

                <ul className="create-spot-errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>

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

                <div className="image-field">
                    <h2>Liven up your spot with photos</h2>
                    <h3>Submit a link to at least one photo to publish your spot.</h3>

                    <div className="location-ui">
                        <input className="input-long"
                            type="text"
                            placeholder="Preview Image URL (required)"
                            value={prevImage}
                            onChange={e => setPrevImage(e.target.value)} 
                        />
                    </div>

                    <div className="location-ui">
                        <input className="input-long"
                            type="text"
                            placeholder="Image URL"
                            value={image2}
                            onChange={e => setImg2(e.target.value)} 
                        />
                    </div>
                    
                    <div className="location-ui">
                    <input className="input-long"
                        type="text"
                        placeholder="Image URL"
                        value={image3}
                        onChange={e => setImg3(e.target.value)}  
                    />
                    </div>

                    <div className="location-ui">
                        <input className="input-long"
                            type="text"
                            placeholder="Image URL"
                            value={image4}
                            onChange={e => setImg4(e.target.value)} 
                        />
                    </div>

                    <div className="location-ui">
                        <input className="input-long"
                            type="text"
                            placeholder="Image URL"
                            value={image5}
                            onChange={e => setImg5(e.target.value)} 
                        />
                    </div>
                </div>
                
                <div className="submit-new-spot">
                    <button className="create-spot-button" type="submit" disabled={(description.length < 30 || !prevImage) ? true : false}>Create Spot</button>
                </div>
                
            </form>
        </section>
    )
}

export default AddSpot;