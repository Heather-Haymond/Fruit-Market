import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

export function* sellSaga() {
    yield takeLatest('SELL_FRUIT', function* (action) {
      try {
        const response = yield call(axios.post, '/api/sell-fruit', action.payload);
  
        yield put({ type: 'SELL_FRUIT_SUCCESS', payload: response.data });
      } catch (error) {
        yield put({ type: 'SELL_FRUIT_FAILURE', payload: error.message });
      }
    });
  }

export default sellSaga;
