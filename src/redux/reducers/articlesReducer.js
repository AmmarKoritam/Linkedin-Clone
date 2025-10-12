const initialState = {
  isLoading: false,
  articles: [],
};

function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case "set/isLoading/status":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "get/articles":
      return {
        ...state,
        articles: action.payload,
      };

    default:
      return state;
  }
}

export default articlesReducer;
