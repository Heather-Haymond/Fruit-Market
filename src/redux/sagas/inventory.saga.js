import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchInventory() {
  try {
    const response = yield axios.get('/api/inventory', action.payload);
    yield put({ type: 'SET_INVENTORY', payload: response.data });
  } catch (error) {
    console.error('Inventory fetch error:', error);
    yield put({ type: 'FETCH_INVENTORY_ERROR', payload: error.message });
  }
}
function* sellSaga() {
    try {
      const response = yield call(axios.post,  '/api/inventory/sell', action.payload);

      yield put({ type: 'SELL_FRUIT_SUCCESS', payload: response.data });
    } catch (error) {
      yield put({ type: 'SELL_FRUIT_FAILURE', payload: error.message });
    }
}

function* buySaga(action) {
    try {
      const { fruitId, quantity, purchasePrice, userId } = action.payload;
      console.log('Buy fruit payload:', action.payload);
      const response = yield call(axios.post, '/api/inventory/buy', {
         user_id: userId, 
         fruit_id: fruitId,
          quantity,
           purchase_price: purchasePrice
           });
      console.log('Buy fruit response:', response.data);
      yield put({ type: 'BUY_FRUIT_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Buy fruit error:', error);
      yield put({ type: 'BUY_FRUIT_FAILURE', payload: error.message });
    }
}

function* inventorySaga() {
  yield takeLatest('FETCH_INVENTORY', fetchInventory);
  yield takeLatest('BUY_FRUIT', buySaga);
  yield takeLatest('SELL_FRUIT', sellSaga);
}

export default inventorySaga;