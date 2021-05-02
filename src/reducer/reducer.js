const initialState = {
  token: "",
  user: {},
  isUserLoggedIn: false,
};

const tokenReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "CHANGE_TOKEN":
      newState.token = action.payload;
      return newState;
    case "USER_DETAILS":
      newState.user = action.payload;
      return newState;
    case "CHECK_USER":
      newState.isUserLoggedIn = action.payload;
      return newState;
    default:
      return newState;
  }
};

export default tokenReducer;
