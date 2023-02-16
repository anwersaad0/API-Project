import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";


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

    const handleSubmit = (e) => {
        e.preventDefault();

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

        let createdSpot = dispatch(createSpotThunk(payload, newSpotImages));
        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }
    }

    return (
        <section>
            <form className="create-spot-form" onSubmit={handleSubmit}>
                <h1>Create a new Spot</h1>
                <div className="location-details">
                    <h2>Where's your place located?</h2>
                    <h3>Guests will only get the exact address once they have booked a reservation.</h3>
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

                <div className="description-field">
                    <h2>Describe your spot</h2>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)} 
                    />
                </div>
                
                <div className="name-field">
                    <h2>Create a name for your spot</h2>
                    <input
                        type="text"
                        placeholder="Spot Name"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                </div>
                
                <div className="price-field">
                    <h2>Set base price for your spot</h2>
                    <input
                        type="number"
                        placeholder="Price (USD)"
                        min="0"
                        value={price}
                        onChange={e => setPrice(e.target.value)} 
                    />
                </div>

                <div className="image-field">
                    <h2>Liven up your spot with photos</h2>
                    <input 
                        type="text"
                        placeholder="Preview Image URL"
                        value={prevImage}
                        onChange={e => setPrevImage(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Image URL"
                        value={image2}
                        onChange={e => setImg2(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Image URL"
                        value={image3}
                        onChange={e => setImg3(e.target.value)}  
                    />
                    <input 
                        type="text"
                        placeholder="Image URL"
                        value={image4}
                        onChange={e => setImg4(e.target.value)} 
                    />
                    <input 
                        type="text"
                        placeholder="Image URL"
                        value={image5}
                        onChange={e => setImg5(e.target.value)} 
                    />
                </div>
                
                <button type="submit">Create Spot</button>
            </form>
        </section>
    )
}

export default AddSpot;