import { useRef, useState } from "react";
import FileInput from "./FileInput";
import "./ReviewForm.css";

const INITIAL_VALUES = {
  imgUrl: null,
  title: "",
  rating: 0,
  content: "",
};

export default function ReviewForm({
  initialValues = INITIAL_VALUES,
  preview,
  onEdit,
  onCancel,
  onSubmitSuccess,
  onSubmit,
}) {
  const [inputValues, setInputValues] = useState(initialValues);
  const fileInputRef = useRef();
  const [submitLoading, setSubmitLoading] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  function handleChange(name, value) {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgUrl", inputValues.imgUrl);
    formData.append("title", inputValues.title);
    formData.append("rating", inputValues.rating);
    formData.append("content", inputValues.content);
    let result;
    try {
      setSubmitLoading(true);
      result = await onSubmit(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
    setInputValues(INITIAL_VALUES);
    onSubmitSuccess(result.review);
  }

  function handleCancel() {
    onCancel(null);
  }

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgUrl"
        value={inputValues.imgUrl}
        onChange={handleChange}
        domData={fileInputRef}
        preview={preview}
      />
      <input
        name="title"
        value={inputValues.title}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="rating"
        value={inputValues.rating}
        min={0}
        max={5}
        onChange={handleInputChange}
      />
      <input
        name="content"
        value={inputValues.content}
        onChange={handleInputChange}
      />
      <button disabled={submitLoading}>submit</button>
      {onEdit && <button onClick={handleCancel}>cancel</button>}
    </form>
  );
}
