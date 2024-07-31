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

function* fetchUserInventory(action) {
  try {
      const { userId } = action.payload;
      const response = yield call(axios.get, `/api/inventory/${userId}`);
      yield put({ type: FETCH_USER_INVENTORY_SUCCESS, payload: response.data });
  } catch (error) {
      yield put({ type: FETCH_USER_INVENTORY_FAILURE, payload: error.message });
  }
}

function* fetchInventoryItem(action) {
  try {
      const { inventoryId } = action.payload;
      const response = yield call(axios.get, `/api/inventory/item/${inventoryId}`);
      yield put({ type: FETCH_INVENTORY_ITEM_SUCCESS, payload: response.data });
  } catch (error) {
      yield put({ type: FETCH_INVENTORY_ITEM_FAILURE, payload: error.message });
  }
}

function* inventorySaga() {
  yield takeLatest('FETCH_INVENTORY', fetchInventory);
  yield takeLatest('FETCH_USER_INVENTORY_REQUEST', fetchUserInventory);
  yield takeLatest('FETCH_INVENTORY_ITEM_REQUEST', fetchInventoryItem);
}

export default inventorySaga;