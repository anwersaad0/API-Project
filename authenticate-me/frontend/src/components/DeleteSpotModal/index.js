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
        <>
            <h2>Confirm Delete?</h2>
            <p>Are you sure you would like to delete this spot from listings?</p>
            <form onSubmit={handleSubmit}>
                <button onClick={closeModal}>No</button>
                <button type="submit">Yes</button>
            </form>
        </>
    );
}

export default DeleteSpot;