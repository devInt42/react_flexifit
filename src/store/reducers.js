const initialState = {
  category: "",
  data: [],
  faqData: [],
  replyData: [],
  wishList: [],
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_FAQDATA":
      return {
        ...state,
        faqData: action.payload,
      };
    case "SET_REPLYDATA":
      return {
        ...state,
        replyData: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
