import axios from "axios";

export const setCategory = (category) => ({
  type: "SET_CATEGORY",
  payload: category,
});

export const setData = (data) => ({
  type: "SET_DATA",
  payload: data,
});

export const setFaqData = (data) => ({
  type: "SET_FAQDATA",
  payload: data,
});

//qna allList
export const getQnaData = (page, itemsPerPage) => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/qna/list", {
        params: {
          page: page, // 첫 페이지만 요청
          itemsPerPage: itemsPerPage, // 페이지당 항목 수
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

//faq allList
export const getFAQData = (page, itemsPerPage) => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/faq/list", {
        params: {
          page: page, // 첫 페이지만 요청
          itemsPerPage: itemsPerPage, // 페이지당 항목 수
        },
      })
      .then((response) => {
        dispatch(setFaqData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
