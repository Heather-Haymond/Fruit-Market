const initialState = {
    inventory: {},
    error: null,
  };
  
  const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "BUY_FRUIT_SUCCESS":
        const { inventory, newTotalCash } = action.payload;
        return {
          ...state,
          inventory: {
            ...state.inventory,
            [action.payload.id]: {
              ...state.inventory[action.payload.id],
              quantity:
                (state.inventory[action.payload.id]?.quantity || 0) +
                action.payload.quantity,
              purchase_price: action.payload.purchase_price,
            },
          },
          totalCash: newTotalCash,
          error: null,
        };
  
      case "BUY_FRUIT_FAILURE":
        return {
          ...state,
          error: action.payload,
        };
      case "SELL_FRUIT_SUCCESS":
        const { id, quantity } = action.payload;
        const updatedInventory = { ...state.inventory };
        if (quantity <= 0 || isNaN(quantity)) {
          console.error('Invalid quantity:', quantity);
          return state;
        }
        if (updatedInventory[id]) {
          updatedInventory[id].quantity -= action.payload.quantity;
          if (updatedInventory[id].quantity <= 0) {
            delete updatedInventory[id];
          }
        }
        return {
          ...state,
          inventory: updatedInventory,
          error: null,
        };
        case "SELL_FRUIT_FAILURE":
          return {
            ...state,
            error: action.payload,
          };
    
      default:
        return state;
    }
  };
  
  export default transactionsReducer;
  