import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";
import CreateReview from "../CreateReviewModal";
import DeleteReview from "../DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";



const SpotReviews = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const { spotId } = useParams();
    const spotRevList = useSelector(state => state.reviews);
    const spotRevArr = Object.values(spotRevList);
    
    let alreadyReviewed = 0;

    let delRevBtn;
    if (sessionUser) {
        spotRevArr.forEach(rev => {
            if (rev.userId === sessionUser.id) {
                alreadyReviewed = 1;
            }
        })
    }

    console.log(spotRevArr);

    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch, spotId]);

    let addRevBtn;
    if (sessionUser && !alreadyReviewed) {
        console.log(sessionUser.id)

        addRevBtn = (
            <OpenModalButton 
                buttonText="Post Your Review"
                modalComponent={<CreateReview />}
            />
        )
    }

    if (!spotRevList) return null;

    return (
        <div>
            {addRevBtn}

            {spotRevList && spotRevArr.map(rev => (
                <div key={rev.id}>
                    <p>From: {rev?.User?.firstName}</p>
                    <p>Posted on {rev.createdAt.slice(0, 10)}</p>
                    <p>{rev.review}</p>

                    {(sessionUser) && (rev.userId === sessionUser.id) ? delRevBtn = (<OpenModalButton buttonText="Delete" modalComponent={<DeleteReview rev={rev}/>}/>) : delRevBtn}
                </div>
            ))}
        </div>
    )
}

export default SpotReviews;