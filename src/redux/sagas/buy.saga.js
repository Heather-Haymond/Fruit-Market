import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

export function* buySaga() {
  yield takeLatest('BUY_FRUIT', function* (action) {
    try {
      const { fruitId, quantity, purchasePrice, userId } = action.payload;
      console.log('Buy fruit payload:', action.payload);
      const response = yield call(axios.post, '/api/buy', { user_id: userId, fruit_id: fruitId, quantity, purchase_price: purchasePrice });
      console.log('Buy fruit response:', response.data);
      yield put({ type: 'BUY_FRUIT_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Buy fruit error:', error);
      yield put({ type: 'BUY_FRUIT_FAILURE', payload: error.message });
    }
  });
}

export default buySaga;
