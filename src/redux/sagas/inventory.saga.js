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


function* inventorySaga() {
  yield takeLatest('FETCH_INVENTORY', fetchInventory);
}

export default inventorySaga;