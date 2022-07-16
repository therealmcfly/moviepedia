import { useState } from "react";
import Rating from "./Rating";
import ReviewForm from "./ReviewForm";
import "./ReviewList.css";

function ReviewItem({ review, onDelete, onEdit }) {
  const handleDelete = () => onDelete(review.id);
  const handleEdit = () => onEdit(review.id);

  return (
    <div className="ReviewItem">
      <img className="ReviewItem-img" src={review.imgUrl} alt="no avail" />
      <div>
        <h2 name="title">{review.title}</h2>
        <Rating name="rating" value={review.rating} />
        <p name="createdAt">{review.createdAt}</p>
        <p name="content">{review.content}</p>
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
}

function ReviewList({ reviews, onDelete, onEditSubmit, onSubmitSuccess }) {
  const [editingId, setEditingId] = useState("");
  const handleEdit = (id) => setEditingId(id);

  return (
    <ul>
      {reviews.map((review) => {
        const { title, rating, content, imgUrl } = review;
        const initialValues = { title, rating, content };
        if (editingId === review.id) {
          const handleEditSubmit = (formData) =>
            onEditSubmit(formData, editingId);
          const handleEditingSubmit = (review) => {
            onSubmitSuccess(review);
            setEditingId("");
          };
          return (
            <ReviewForm
              key={review.id}
              onEdit={editingId}
              onCancel={setEditingId}
              initialValues={initialValues}
              preview={imgUrl}
              onSubmit={handleEditSubmit}
              onSubmitSuccess={handleEditingSubmit}
            />
          );
        } else {
          return (
            <li key={review.id}>
              <ReviewItem
                review={review}
                onDelete={onDelete}
                onEdit={handleEdit}
              />
            </li>
          );
        }
      })}
    </ul>
  );
}

export default ReviewList;
