import { call, put, takeLatest, delay, take, fork } from 'redux-saga/effects'; 
import axios from 'axios'; 

function* fetchFruits() { 
// console.log('fetchFruits generator started'); 
try { 
const response = yield call(axios.get, '/api/fruits'); 
console.log('Fetched fruits in saga:', response.data); 
yield put({ type: 'SET_FRUITS', payload: response.data }); 
} catch (error) { 
console.error('Fetch fruits failed', error.response ? error.response.data : error.message); 
yield put({ type: 'FETCH_FRUITS_ERROR', payload: error.message }); 
} 
} 

function* updatePricesSaga(action) {
    try {
      const { data } = yield call(axios.put, '/api/fruits/prices');
      yield put({ type: 'UPDATE_PRICES_SUCCESS', payload: data });
      if (action.payload && typeof action.payload.callback === 'function') {
        // Call the callback about a successful price update
        yield call(action.payload.callback);
      }
    } catch (error) {
      console.error('Error updating prices', error.response ? error.response.data : error.message);
      yield put({ type: 'UPDATE_PRICES_FAILURE', payload: error.message });
      if (action.payload && typeof action.payload.callback === 'function') {
        yield call(action.payload.callback, error.message);
      }
    }
  }

  function* fetchCurrentPricesSaga() {
    try {
      const response = yield call(axios.get, '/api/fruits/current-prices');
      yield put({ type: 'SET_CURRENT_PRICES', payload: response.data });
    } catch (error) {
      yield put({ type: 'FETCH_CURRENT_PRICES_FAILED', payload: error.message });
    }
  }
  

 // Periodic fetch and update prices saga
 function* periodicFetchPricesSaga() {
  while (true) {
    yield delay(15000);
    // Dispatch update prices action with a callback
    yield put({
      type: 'UPDATE_PRICES',
      payload: {
        callback: () => new Promise((resolve) => resolve()) // Simple callback that resolves immediately
      }
    });

    // Wait for the update prices action to complete
    yield take('UPDATE_PRICES_SUCCESS');

    // Fetch current prices after the update
    yield call(fetchCurrentPricesSaga);

  }
}
function* startPeriodicUpdatesSaga() {
  yield fork(periodicFetchPricesSaga);
}
  
function* fruitSaga() { 
// console.log('fruitSaga is running'); 
yield takeLatest('FETCH_FRUITS', fetchFruits);
yield takeLatest('UPDATE_PRICES', updatePricesSaga);
yield takeLatest('FETCH_CURRENT_PRICES', fetchCurrentPricesSaga);
yield takeLatest('START_PERIODIC_UPDATES', startPeriodicUpdatesSaga);
} 

export default fruitSaga; 
