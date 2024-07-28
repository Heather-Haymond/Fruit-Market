import { call, put, delay, takeLatest } from "redux-saga/effects";

import api from "../../services/api";

function* watchPriceUpdates() {
  while (true) {
    yield delay(15000); 

    yield put({ type: "FETCH_UPDATED_PRICES" });
  }
}

function* updateAllPrices() {
  try {
    const prices = yield call(api.updateAllPrices);

    yield put({ type: "UPDATE_ALL_PRICES_SUCCESS", payload: updatedprices });
  } catch (error) {
    yield put({ type: "UPDATE_PRICES_ERROR", error });
  }
}

export function* priceUpdateSaga() {
  yield takeLatest("START_PRICE_UPDATES", watchPriceUpdates);

  yield takeLatest("UPDATE_ALL_PRICES", updateAllPrices);
}
