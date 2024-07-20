import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}
function* buyFruit(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield call(
      axios.post,
      "/api/fruits/buy",
      action.payload,
      config
    );
    yield put({ type: "BUY_FRUIT_SUCCESS", payload: response.data });
    yield put({ type: "FETCH_USER" });
  } catch (error) {
    console.log("Buy fruit request failed", error);
    yield put({ type: "USER_ERROR", payload: error.message });
  }
}

function* sellFruit(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    const response = yield call(
      axios.post,
      "/api/inventory/sell",
      action.payload,
      config
    );
    yield put({ type: "SELL_FRUIT_SUCCESS", payload: response.data });
    yield put({ type: "FETCH_USER" });
  } catch (error) {
    console.log("Sell fruit request failed", error);
    yield put({ type: "USER_ERROR", payload: error.message });
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('BUY_FRUIT', buyFruit);
  yield takeLatest('SELL_FRUIT', sellFruit);
}

export default userSaga;
