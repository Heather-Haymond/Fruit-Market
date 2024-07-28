const initialState = {
fruits: [],                   // add images here:fruits: [
  error: null,                // { id: 1, name: 'Apple', purchase_price: 1.99, imageName: 'apple' },
  userCash: 100.00,            // { id: 2, name: 'Orange', purchase_price: 2.49, imageName: 'orange' },
};                              //],
                               
  
const fruitReducer = (state = initialState, action) => {
  // console.log('fruitReducer called with action:', action);
  switch (action.type) {
    case "SET_FRUITS":
      // console.log('SET_FRUITS payload:', action.payload);
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
      case "UPDATE_PRICES_SUCCESS":
      return { ...state,
         fruits: action.payload, 
         error: null };
         case 'UPDATE_PRICES_FAILURE':
          return {
            ...state,
            error: action.payload
          };
    default:
      return state;
  }
};

export default fruitReducer;
