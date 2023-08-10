import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import './CreateReview.css';
import { useHistory } from "react-router-dom";
import { getOneSpotThunk } from "../../store/spots";

const CreateReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    
    const specSpotObj = useSelector(state => state.spots.specSpot);
    const sessionUser = useSelector(state => state.session.user);

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [activeRating, setActiveRating] = useState(rating);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            review: reviewText,
            stars: rating
        }

        let createdReview = await dispatch(createReviewThunk(specSpotObj.id, payload, sessionUser));
        await dispatch(getOneSpotThunk(specSpotObj.id));

        if (createdReview) {
            closeModal();
            history.push(`/spots/${specSpotObj.id}`);
        }
    }

    return (
        <div className="add-rev-modal">
            <h2>How was your stay?</h2>
            <form className="add-rev-details" onSubmit={handleSubmit}>
                <textarea 
                    className="review-textarea"
                    name="review-text"
                    rows="8"
                    cols="40"
                    placeholder="Write your review here..."

                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                ></textarea>

                <div className="star-input">
                    <p className="star-text">Stars:</p>

                    <div onClick={() => setRating(1)} onMouseEnter={() => setActiveRating(1)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 1) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                    <div onClick={() => setRating(2)} onMouseEnter={() => setActiveRating(2)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 2) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                    <div onClick={() => setRating(3)} onMouseEnter={() => setActiveRating(3)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 3) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                    <div onClick={() => setRating(4)} onMouseEnter={() => setActiveRating(4)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 4) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                    <div onClick={() => setRating(5)} onMouseEnter={() => setActiveRating(5)} onMouseLeave={() => setActiveRating(rating)} className={(activeRating >= 5) ? "filled" : "empty"}>
                        <i className="fas fa-star" />
                    </div>
                </div>

                <button className="submit-review" type="submit" disabled={(reviewText.length < 10 || !rating) ? true : false}>Submit Your Review</button>
            </form>
        </div>
    )
}

export default CreateReview;