import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPrices() {
  try {
    const response = yield call(axios.get, '/api/prices');
    yield put({ type: 'UPDATE_ALL_PRICES_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
}

function* watchFetchPrices() {
  yield takeEvery('FETCH_PRICES_REQUEST', fetchPrices);
}

export default watchFetchPrices;
