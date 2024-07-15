const initialState = {
  passion_fruit: {
    id: 1,
    name: "Passion Fruit",
    current_price: 3.99,
  },

  durian: {
    id: 2,
    name: "Durian",
    current_price: 3.5,
  },

  jackfruit: {
    id: 3,
    name: "Jackfruit",
    current_price: 2.75,
  },

  dragon_fruit: {
    id: 4,
    name: "Dragon Fruit",
    current_price: 4.25,
  },
};

const fruitReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FRUITS":
      console.log('SET_FRUITS payload:', action.payload);
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    case "FETCH_FRUITS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fruitReducer;
