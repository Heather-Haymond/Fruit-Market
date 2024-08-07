const initialState = {
  id: null,
  username: "",
  total_cash: 100.0,
  error: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
        total_cash: parseFloat(action.payload.total_cash || state.total_cash).toFixed(2),
      };
    case "UNSET_USER":
      return {};
    case "UPDATE_USER":
      if (!action.payload) {
        console.error("UPDATE_USER action received with undefined payload");
        return state;
      }
      console.log("Reducer - Updating total cash:", action.payload.total_cash);
      return {
        ...state,
        ...action.payload,
        total_cash:
          action.payload.total_cash !== undefined
            ? parseFloat(action.payload.total_cash).toFixed(2)
            : state.total_cash,
      };
    case "BUY_FRUIT_SUCCESS":
      if (action.payload.newTotalCash !== undefined) {
      return {
        ...state,
        total_cash: parseFloat(action.payload.newTotalCash).toFixed(2),
        error: null,
      };
    }
    console.error("BUY_FRUIT_SUCCESS action received without newTotalCash");
    return state;
    case "SELL_FRUIT_SUCCESS":
      return {
        ...state,
        total_cash: (
          parseFloat(state.total_cash) + parseFloat(action.payload.sellPrice)).toFixed(2),
        error: null,
      };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
