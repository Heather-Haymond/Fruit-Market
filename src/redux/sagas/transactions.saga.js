import { call, put, select, takeLatest} from 'redux-saga/effects';
import { formatCash, calculateNewTotalCash } from "../../utils/cashUser.js";
import axios from "axios";

// Helper function to fetch inventory ID if not provided

function* fetchInventoryId(user_id, fruit_id, inventory_id) {
  if (!inventory_id) {
    try {
      const inventoryResponse = yield call(
        axios.get,
        `/api/inventory/inventoryId/${user_id}/${fruit_id}`
      );

      const fetchedInventoryId = inventoryResponse.data.inventory_id;

      if (!fetchedInventoryId) {
        throw new Error("Fetched inventory ID is undefined");
      }

      return fetchedInventoryId;
    } catch (error) {
      console.error("Error fetching inventory ID:", error);

      throw error;
    }
  }

  return inventory_id;
}

// Selector to get the current price of the fruit

const selectCurrentPrice = (state, fruit_id) =>
  state.fruit.currentPrices ? state.fruit.currentPrices[fruit_id] : undefined;
   

function* sellSaga(action) {
  try {
    const { fruit_id, user_id, quantity, inventory_id, current_price} = action.payload;

      console.log("Sell fruit payload:", action.payload);

    // Get the current price from the state
    const stateCurrentPrice = yield select((state) => selectCurrentPrice(state, fruit_id));
    console.log("Current price from state for fruit_id", fruit_id, ":", stateCurrentPrice);

    // Use the price from the state if available, otherwise use the one from the payload
    const finalCurrentPrice = stateCurrentPrice !== undefined ? stateCurrentPrice : current_price;

      // Ensure current_price is a valid number
    const parsedCurrentPrice = parseFloat(finalCurrentPrice).toFixed(2);
    if (isNaN(parsedCurrentPrice)) {
      throw new Error("Invalid current price");
    }

    console.log("Parsed current price:", parsedCurrentPrice
    )

     // Validate current_price before sending to the server
     if (parsedCurrentPrice < 0.50) {
      throw new Error('Invalid selling price');
    }

    const currentPrice = yield select((state) => selectCurrentPrice(state, fruit_id));

    // Ensure currentPrice is a valid number
    if (isNaN(currentPrice)) {
      throw new Error("Invalid current price");
    }

    const response = yield call(axios.post, "/api/transactions/sell", {
      user_id,
      fruit_id,
      quantity,
      current_price: Number(current_price),
      inventory_id: yield call(fetchInventoryId, user_id, fruit_id, inventory_id),
    });
    console.log("API Response from /api/transactions/sell:", response.data);

    const { newTotalCash, updatedInventory } = response.data;
    const parsedNewTotalCash = parseFloat(newTotalCash.replace('$', ''));

    const formattedTotalCash = formatCash(parseFloat(newTotalCash));
    
    if (response.data && response.data.newTotalCash !== undefined) {
      const parsedNewTotalCash = parseFloat(response.data.newTotalCash.replace('$', ''));
      console.log("Updating total cash in sellSaga:", parsedNewTotalCash);
    yield put({ 
      type: "UPDATE_USER",
      payload: { ...response.data.user, total_cash: parsedNewTotalCash } 
    });
    yield put({ 
      type: "SELL_FRUIT_SUCCESS",
      payload:  { 
        id: fruit_id, 
        quantity, 
        current_price: parsedCurrentPrice,
        newTotalCash: parsedNewTotalCash
      }
     });
    } else {
      console.error("New total cash not found in response:", response.data);
      throw new Error("New total cash not found in response");
    }
  } catch (error) {
    console.error("Sell fruit error:", error);
    yield put({ type: "SELL_FRUIT_FAILURE", payload: error.response?.data || error.message});
  }
}

function* buySaga(action) {
  try {
    const { fruitId, quantity, purchasePrice, userId } = action.payload;
    console.log("Buy fruit payload:", action.payload);

    const parsedPurchasePrice = parseFloat(purchasePrice).toFixed(2);
    if (isNaN(parsedPurchasePrice)) {
      throw new Error("Amount must be a number");
    }
     // Validate purchasePrice before sending to the server
     if (purchasePrice < 0.50) {
      throw new Error('Invalid purchase price');
    }

    const response = yield call(axios.post, "/api/transactions/buy", {
      user_id: userId,
      fruit_id: fruitId,
      quantity,
      purchase_price: purchasePrice,
    });

    const { newTotalCash, updatedInventory } = response.data;
    const parsedNewTotalCash = parseFloat(newTotalCash.replace('$', ''));

    const formattedTotalCash = formatCash(parseFloat(newTotalCash));

    yield put({ 
      type: "UPDATE_USER",
       payload: { 
        ...response.data.updatedUser, 
        total_cash: parsedNewTotalCash 
      }  });
    yield put({ 
      type: "BUY_FRUIT_SUCCESS",
      payload:  { 
        ...response.data, 
        newTotalCash: parsedNewTotalCash 
      } 
     });
  } catch (error) {
    console.error("Buy fruit error:", error.response?.data || error.message);
    yield put({ type: "BUY_FRUIT_FAILURE", payload: error.message });
  }
}

const performTransactionApi = (data) => {
  return fetch("/api/sell", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

const fetchUserCashApi = (userId) => {
  return fetch(`/api/user/${userId}`).then((response) => response.json());
};

// Saga to perform the transaction and update cash
function* performTransactionSaga(action) {
  try {
    const { user_id, inventory_id, quantity, current_price } = action.payload;

    // Perform the transaction
    yield call(performTransactionApi, {
      user_id,
      inventory_id,
      quantity,
      current_price,
    });

    // Fetch the updated cash balance
    const userCashResult = yield call(fetchUserCashApi, user_id);

    // Update the cash balance in Redux store
    yield put(updateCash(userCashResult.total_cash));
    yield put({ type: TRANSACTION_SUCCESS }); // Dispatch success action
  } catch (error) {
    console.error("Error in transaction saga:", error);
    yield put({ type: TRANSACTION_FAILURE, error }); 
  }
}

function* transactionsSaga() {
  yield takeLatest("BUY_FRUIT", buySaga);
  yield takeLatest("SELL_FRUIT", sellSaga);
}

export default transactionsSaga;
