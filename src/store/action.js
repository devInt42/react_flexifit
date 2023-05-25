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
      .get("http://localhost:8080/qna/list", {
        params: {
          page: 1, // 첫 페이지만 요청
          itemsPerPage: 10, // 페이지당 항목 수
        },
      })
      .then((response) => {
        dispatch(setData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
