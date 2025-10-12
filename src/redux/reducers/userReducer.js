const initialState = {
  user: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "set/user": {
      return {
        ...state,
        user: action.payload,
      };
    }

    default:
      return state;
  }
}

export default userReducer;
