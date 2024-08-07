const initialState = {
fruits: [],    
currentPrices: {}, 
previousPrices: {},           // Previous prices that are kept on error
  error: null,                // add images here:fruits: [
  userCash: 100.00,           // { id: 1, name: 'Apple', purchase_price: 1.99, imageName: 'apple' },
};                              // { id: 2, name: 'Orange', purchase_price: 2.49, imageName: 'orange' },
                                //],
  
const fruitReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CURRENT_PRICES_SUCCESS':
      return {
          ...state,
          previousPrices: state.currentPrices, 
          currentPrices: action.payload,
          fruits: state.fruits.map(fruit => ({
            ...fruit,
            current_price: action.payload[fruit.id]
          })),
          error: null
      };
    case 'SET_CURRENT_PRICES':
      const newPrices = action.payload.reduce((acc, item) => {
        acc[item.fruit_id] = item.current_price;
        return acc;
      }, {});
      return { 
        ...state, 
        currentPrices:  newPrices,
        fruits: state.fruits.map(fruit => ({
          ...fruit,
          current_price: newPrices[fruit.id]
        })),
        error: null 
      };
      case 'FETCH_CURRENT_PRICES_FAILED':
        return { ...state, 
          error: action.payload
          };
    case "SET_FRUITS":
      // console.log('SET_FRUITS payload:', action.payload);
      const initialPrices = action.payload.reduce((acc, fruit) => {
        acc[fruit.id] = fruit.current_price;
        return acc;
      }, {});
      return {
        ...state,
        fruits: action.payload,
        currentPrices: initialPrices,
        error: null,
      };
    case "FETCH_FRUITS_ERROR":
      console.log('FETCH_FRUITS_ERROR payload:', action.payload);
      return {
        ...state,
        error: action.payload,
      };
      case "UPDATE_PRICES_SUCCESS":
        const updatedPrices = action.payload.reduce((acc, fruit) => {
          acc[fruit.id] = fruit.current_price;
          return acc;
        }, {});
      return { ...state,
        currentPrices: updatedPrices,
        fruits: action.payload.map(fruit => ({
          ...fruit,
          current_price: updatedPrices[fruit.id]
        })),
         error: null
         };
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
