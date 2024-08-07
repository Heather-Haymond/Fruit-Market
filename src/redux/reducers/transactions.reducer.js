const initialState = {
    inventory: {},
    currentPrices: {},
    totalCash: 100.00,
    error: null,
  };
  
  const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "BUY_FRUIT_SUCCESS": {
        const { inventory, newTotalCash } = action.payload;
        return {
          ...state,
          inventory: {
            ...state.inventory,
            ...inventory
          },
          totalCash: parseFloat(newTotalCash).toFixed(2),
          error: null,
        };
      }
        case "BUY_FRUIT_FAILURE":
          return {
            ...state,
            error: action.payload,
          };
          case "UPDATE_CASH":
        return {
          ...state,
          totalCash: action.payload,
        };
      case "TRANSACTION_SUCCESS":
        return {
          ...state,
          transactionError: null,
        };
      case "TRANSACTION_FAILURE":
        return {
          ...state,
          transactionError: action.error,
        };

      case "SELL_FRUIT_SUCCESS":{
        const { id, quantity, current_price,  newTotalCash } = action.payload;
       
        console.log('SELL_FRUIT_SUCCESS - id:', id, 'quantity:', quantity, 'newTotalCash:', newTotalCash);
        if (quantity <= 0 || isNaN(quantity) || !state.inventory[id]) {
          console.error('Invalid quantity or item not found:', quantity, id);
          return state;
        }
        const updatedInventory = { ...state.inventory };
        const fruit = updatedInventory[id];
  
        if (fruit) {
          const updatedQuantity = fruit.quantity - quantity;
          if (updatedQuantity <= 0) {
            delete updatedInventory[id];
          } else {
            updatedInventory[id] = {
              ...fruit,
              quantity: updatedQuantity,
            };
          }
        }
        return {
          ...state,
          inventory: updatedInventory,
          totalCash: parseFloat(newTotalCash).toFixed(2),
          error: null,
        };
      }
  
        case "SELL_FRUIT_FAILURE":
          console.error('SELL_FRUIT_FAILURE - error:', action.payload);
        return {
          state,
          error: action.payload,
        };
    
     default:
      return state;
   }
 };
  
  export default transactionsReducer;
  