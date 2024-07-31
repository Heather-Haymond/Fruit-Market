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
        inventory: Array.isArray(action.payload) ? action.payload : [],
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
        inventory: Array.isArray(action.payload) ? action.payload .reduce((acc, item) => {
          acc[item.id] = item; 
          return acc;
        }, {})
      : {},
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

   