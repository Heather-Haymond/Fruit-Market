const initialState = {
  id: null,
  username: '',
  total_cash: 100.00,
  error: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
      ...action.payload,
      total_cash: action.payload.total_cash || state.total_cash
    };
    case 'UNSET_USER':
      return {};
      case "UPDATE_USER":
        if (!action.payload) {
          console.error("UPDATE_USER action received with undefined payload");
          return state;
        }
        return {
          ...state,
          ...action.payload,
          total_cash: action.payload.total_cash !== undefined 
          ? action.payload.total_cash 
          : state.total_cash
      };
      case "BUY_FRUIT_SUCCESS":
        return {
          ...state,
          total_cash: (parseFloat(state.total_cash) - parseFloat(action.payload.purchasePrice)).toFixed(2),
          error: null,
        };
      case "SELL_FRUIT_SUCCESS":
        return {
          ...state,
          total_cash: (parseFloat(state.total_cash) + parseFloat(action.payload.sellPrice)).toFixed(2),
          error: null,
        };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
