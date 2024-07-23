const initialState = {
  inventory: [],
  error: null,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_INVENTORY_SUCCESS":
      const inventory = action.payload.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
      return {
        ...state,
        inventory,
        error: null,
      };

    case "FETCH_INVENTORY_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    case "SET_INVENTORY":
      return {
        ...state,
        inventory: Array.isArray(action.payload) ? action.payload : [],
        error: null,
      };

    case "SET_INVENTORY_ERROR":
      return {
        ...state,
        inventory: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default inventoryReducer;

    // case "BUY_FRUIT_SUCCESS":
    //   return {
    //     ...state,
    //     inventory: {
    //       ...state.inventory,
    //       [action.payload.id]: {
    //         ...state.inventory[action.payload.id],
    //         quantity:
    //           (state.inventory[action.payload.id]?.quantity || 0) +
    //           action.payload.quantity,
    //         purchase_price: action.payload.purchase_price,
    //       },
    //     },
    //     error: null,
    //   };

    // case "BUY_FRUIT_FAILURE":
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };
    // case "SELL_FRUIT_SUCCESS":
    //   const { id, quantity } = action.payload;
    //   const updatedInventory = { ...state.inventory };
    //   if (quantity <= 0 || isNaN(quantity)) {
    //     console.error('Invalid quantity:', quantity);
    //     return state;
     // }
//       if (updatedInventory[id]) {
//         updatedInventory[id].quantity -= action.payload.quantity;
//         if (updatedInventory[id].quantity <= 0) {
//           delete updatedInventory[id];
//         }
//       }
//       return {
//         ...state,
//         inventory: Array.isArray(action.payload) ? action.payload : [],
//         error: null,
//       };
//       case "SELL_FRUIT_FAILURE":
//         return {
//           ...state,
//           error: action.payload,
//         };
  
//     default:
//       return state;
//   }
// };

// export default inventoryReducer;
