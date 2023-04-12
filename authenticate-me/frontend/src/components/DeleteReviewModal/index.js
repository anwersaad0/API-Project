//import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import { getOneSpotThunk } from "../../store/spots";


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
        <>
            <h2>Confirm Delete?</h2>
            <p>Are you sure you would like to delete this review?</p>
            <form>
                <button onClick={closeModal}>No</button>
                <button onClick={handleSubmit}>Yes</button>
            </form>
        </>
    )
}

export default DeleteReview;