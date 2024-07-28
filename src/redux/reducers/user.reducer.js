const initialState = {
  id: null,
  username: '',
  total_cash: 100.00,
  error: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('Setting user:', action.payload);
      return {
        ...state,
      ...action.payload,
      total_cash: action.payload.total_cash || state.total_cash
    };
    case 'UNSET_USER':
      return initialState;

    case 'UPDATE_USER':
      return {
        ...state,
        ...action.payload,
      };
      case "BUY_FRUIT_SUCCESS":
        return {
          ...state,
          total_cash: parseFloat((parseFloat(state.total_cash) - parseFloat(action.payload.purchasePrice * action.payload.quantity)).toFixed(2)),
          error: null,
        };
      case "SELL_FRUIT_SUCCESS":
        return {
          ...state,
          total_cash: parseFloat((parseFloat(state.total_cash) + parseFloat(action.payload.sellPrice * action.payload.quantity)).toFixed(2)),
          error: null,
        };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default userReducer;
