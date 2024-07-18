const initialState = {
 
};

const fruitReducer = (state = initialState, action) => {
  console.log('fruitReducer called with action:', action);
  switch (action.type) {
    case "SET_FRUITS":
      console.log('SET_FRUITS payload:', action.payload);
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    case "FETCH_FRUITS_ERROR":
      console.log('FETCH_FRUITS_ERROR payload:', action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fruitReducer;
