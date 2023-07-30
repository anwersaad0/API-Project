import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { removeSpotThunk } from "../../store/spots";


const DeleteSpot = ({spot}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(spot);

        dispatch(removeSpotThunk(spot))
        
        history.push('/spots/current');

        closeModal();
    }

    return (
        <div className="delete-modal">
            <h2 className="confirm-title">Confirm Delete?</h2>
            <p>Are you sure you would like to delete this spot from listings?</p>
            <form onSubmit={handleSubmit}>
                <div><button className="confirm-delete" type="submit">Yes (Delete Spot)</button></div>
                <div><button className="decline-delete" onClick={closeModal}>No (Keep Spot)</button></div>
            </form>
        </div>
    );
}

export default DeleteSpot;