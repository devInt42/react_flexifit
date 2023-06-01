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

export const setReplyData = (data) => ({
  type: "SET_REPLYDATA",
  payload: data,
});

export const addToWishList = (data) => ({
  type: "ADD_TO_WISHLIST",
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
export const getFAQData = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/faq/list")
      .then((response) => {
        dispatch(setFaqData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

//reply allList
export const getReplyData = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:8080/qna/replyList")
      .then((response) => {
        dispatch(setReplyData(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
