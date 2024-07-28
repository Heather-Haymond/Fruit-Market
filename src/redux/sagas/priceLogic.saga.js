import { call, put, takeEvery } from "redux-saga/effects";
import api from "../../services/api";

function* handlePriceUpdate() {
  try {
    const updatedPrices = yield call(api.updateAllPrices);
    yield put({
      type: "UPDATE_ALL_PRICES_SUCCESS",
      payload: { itemId, newPrice },
    });

    // If you need to fetch all prices after an individual update
  } catch (error) {
    yield put({ type: "UPDATE_ALL_PRICES_ERROR", error: error.message });
  }
}

function* fetchUpdatedPrices() {
  try {
    const prices = yield call(api.fetchPrices);
    yield put({ type: "UPDATE_PRICES", payload: prices });
  } catch (error) {
    yield put({ type: "UPDATE_PRICES_ERROR", error: error.message });
  }
}

export function* priceLogicSaga() {
  yield takeEvery("UPDATE_PRICE", handlePriceUpdate);
  yield takeEvery("FETCH_UPDATED_PRICES", fetchUpdatedPrices);
  yield takeEvery("START_PRICE_UPDATES", watchPriceUpdates);
}
