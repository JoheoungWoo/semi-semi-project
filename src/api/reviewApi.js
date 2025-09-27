import axios from "axios";

const url = "http://localhost:8080";

const reviewList = async () => {
  const { data } = await axios.get(`${url}/list`);
  return data;
};

const reviewAdd = async (review) => {
  await axios.post(`${url}/add`, review);
};

const updateReview = async (id, review) => {
  await axios.put(`${url}/update`, { id, ...review });
};

const reviewDelete = async (id) => {
  const { data } = await axios.get(`${url}/delete?id=${id}`);
  return data;
};

export { reviewList, reviewAdd, updateReview, reviewDelete };
