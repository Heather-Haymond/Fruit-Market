const initialState = {
  inventory: [], 
  error: null,   
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INVENTORY':
      return {
        ...state,
        inventory: action.payload,
        error: null,
      };
      case 'SET_INVENTORY_ERROR':
        return {
          ...state,
          error: action.payload,
        };
    case 'BUY_FRUIT_SUCCESS':
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
        error: null,
      };
    case 'BUY_FRUIT_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'SELL_FRUIT_SUCCESS':
      return {
        ...state,
        inventory: state.inventory.filter(item => item.id !== action.payload.id),
        error: null,
      };
    case 'SELL_FRUIT_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default inventoryReducer;

  