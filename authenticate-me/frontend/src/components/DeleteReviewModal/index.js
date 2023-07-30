//import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import { getOneSpotThunk } from "../../store/spots";
import './DeleteReviewModal.css';


const DeleteReview = ({rev}) => {
    const dispatch = useDispatch();

    const history = useHistory();

    const specSpotObj = useSelector(state => state.spots.specSpot);

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await dispatch(deleteReviewThunk(rev));

        await dispatch(getOneSpotThunk(specSpotObj.id));

        closeModal();

        history.push(`/spots/${specSpotObj.id}`);
    }

    return (
        <div className="delete-modal">
            <h2 className="confirm-title">Confirm Delete?</h2>
            <p>Are you sure you would like to delete this review?</p>
            <form>
                <div><button className="confirm-delete" onClick={handleSubmit}>Yes (Delete Review)</button></div>
                <div><button className="decline-delete" onClick={closeModal}>No (Keep Review)</button></div>
            </form>
        </div>
    )
}

export default DeleteReview;