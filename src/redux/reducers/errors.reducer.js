import { combineReducers } from "redux";

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_LOGIN_ERROR":
      return "";
    case "LOGIN_INPUT_ERROR":
      return "Enter your username and password!";
    case "LOGIN_FAILED":
      return "Oops! The username and password didn't match. Try again!";
    case "LOGIN_FAILED_NO_CODE":
      return "Oops! Something went wrong! Is the server running?";
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_REGISTRATION_ERROR":
      return "";
    case "REGISTRATION_INPUT_ERROR":
      return "Choose a username and password!";
    case "REGISTRATION_FAILED":
      return "Oops! That didn't work. The username might already be taken. Try again!";
    default:
      return state;
  }
};

const buyMessage = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_BUY_ERROR":
      return "";
    case "BUY_FRUIT_FAILURE":
      return `Failed to buy fruit: ${action.payload}`;
    default:
      return state;
  }
};

const sellMessage = (state = "", action) => {
  switch (action.type) {
    case "CLEAR_SELL_ERROR":
      return "";
    case "SELL_FRUIT_FAILURE":
      return `Failed to sell fruit: ${action.payload}`;
    default:
      return state;
  }
};
// const fetchFruitMessage = (state = "", action) => {
//   switch (action.type) {
//     case "CLEAR_FETCH_FRUITS_ERROR":
//       return "";
//     case "FETCH_FRUITS_ERROR":
//       return `Failed to fetch fruits: ${action.payload}`;
//     default:
//       return state;
//   }
// };

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  buyMessage,
  sellMessage,
  // fetchFruitMessage
});
