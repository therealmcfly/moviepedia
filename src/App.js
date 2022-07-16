import { useEffect, useState, Component } from "react";
import { createReview, deleteReview, editReview, getReviews } from "./api";
import ReviewList from "./components/ReviewList";
import "./App.css";
import ReviewForm from "./components/ReviewForm";

const LIMIT = 6;

function App() {
  const [reviewsList, setReviewsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function loadReviewsList() {
    let result;
    try {
      setIsLoading(true);
      result = await getReviews(offset, LIMIT);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    setReviewsList((prevReviews) => [...prevReviews, ...reviews]);
    setHasNext(paging.hasNext);
    setOffset(offset + reviews.length);
  }

  function handleDelete(id) {
    const result = deleteReview(id);
    if (!result) return;
    setReviewsList((prevReviews) => {
      const updatedReviews = prevReviews.filter((review) => review.id !== id);
      return updatedReviews;
    });
  }

  function handleSubmitSuccess(createdReview) {
    setReviewsList((prevReviews) => [createdReview, ...prevReviews]);
  }

  function updateEditedReview(editedReview) {
    setReviewsList((prevList) => {
      const editedIndex = prevList.findIndex(
        (review) => review.id === editedReview.id
      );
      return [
        ...prevList.slice(0, editedIndex),
        editedReview,
        ...prevList.slice(editedIndex + 1),
      ];
    });
  }

  useEffect(() => {
    loadReviewsList();
  }, []);

  return (
    <>
      <div className="navBar"></div>
      <ReviewForm
        onSubmitSuccess={handleSubmitSuccess}
        onSubmit={createReview}
      />
      <ReviewList
        reviews={reviewsList}
        onDelete={handleDelete}
        onEditSubmit={editReview}
        onSubmitSuccess={updateEditedReview}
      />
      {hasNext && (
        <button disabled={isLoading} onClick={loadReviewsList}>
          more
        </button>
      )}
    </>
  );
}

export default App;
