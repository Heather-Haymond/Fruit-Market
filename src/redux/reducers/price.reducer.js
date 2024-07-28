const initialState = { 
    prices: {},  
  }; 
  
  const priceReducer = (state = initialState, action) => { 
    switch (action.type) { 
      case 'UPDATE_ALL_PRICES_SUCCESS': 
        const updatedPrices = action.payload.reduce((acc, price) => {
          acc[price.id] = price.current_price;
          return acc;
        }, {});
        return { 
          ...state, 
          prices: { 
            ...state.prices, 
            ...updatedPrices,
          }, 
        }; 
      default: 
        return state; 
    } 
  }; 
  
  export default priceReducer;
  