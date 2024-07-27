import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchInventory(action) {
  try {
    const endpoint = action.payload ? `/api/inventory/user/${action.payload}` : '/api/inventory';
    const response = yield call(axios.get, endpoint,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure token is used
      }
    });
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