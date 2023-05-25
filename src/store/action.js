import axios from "axios";

export const setCategory = (category) => ({
  type: "SET_CATEGORY",
  payload: category,
});

export const setData = (data) => ({
  type: "SET_DATA",
  payload: data,
});

//qna allList
export const getQnaData = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/qna/list")
      .then((response) => {
        dispatch(setData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
