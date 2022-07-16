const URL = "https://learn.codeit.kr/api/film-reviews";

export async function getReviews(offset = 0, limit = 6) {
  const query = `?offset=${offset}&limit=${limit}`;
  const response = await fetch(`${URL}${query}`);
  if (!response.ok) {
    throw new Error("Failed to load reviews");
  }
  const result = await response.json();
  return result;
}

export async function createReview(formData) {
  const response = await fetch(`${URL}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to upload review");
  }
  const result = await response.json();
  return result;
}

export async function editReview(formData, id) {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to edit review");
  }
  const result = await response.json();
  return result;
}

export async function deleteReview(id) {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete review");
  }
  const result = await response.json();
  return result;
}
