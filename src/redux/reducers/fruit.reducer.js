const initialState = {
fruits: [],    
currentPrices: {},               // add images here:fruits: [
  error: null,                // { id: 1, name: 'Apple', purchase_price: 1.99, imageName: 'apple' },
  userCash: 100.00,            // { id: 2, name: 'Orange', purchase_price: 2.49, imageName: 'orange' },
};                              //],
                               
  
const fruitReducer = (state = initialState, action) => {
  // console.log('fruitReducer called with action:', action);
  switch (action.type) {
    case 'FETCH_CURRENT_PRICES_REQUEST':
      return { ...state,
        error: null, 
      };
    case 'SET_CURRENT_PRICES':
      return { 
        ...state, 
        currentPrices: action.payload.reduce((acc, item) => {
          acc[item.fruit_id] = item.current_price;
          return acc;
        }, {}),
        error: null 
      };
      case 'FETCH_CURRENT_PRICES_FAILED':
        return { ...state, 
          error: action.payload
          };
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
