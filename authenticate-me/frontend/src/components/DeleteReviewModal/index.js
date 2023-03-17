import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";


const DeleteReview = ({rev}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(deleteReviewThunk(rev));

        window.location.reload(false);
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