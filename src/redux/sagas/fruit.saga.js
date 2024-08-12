import { call, put, takeLatest, delay, take, fork } from 'redux-saga/effects'; 
import axios from 'axios'; 

function* fetchFruits() { 
 console.log('fetchFruits generator started'); 
 try { 
  const response = yield call(axios.get, '/api/fruits'); 
  console.log('Fetched fruits in saga:', response.data); 
  yield put({ type: 'SET_FRUITS', payload: response.data }); 
} catch (error) { 
  console.error('Fetch fruits failed', error.response ? error.response.data : error.message); 
  yield put({ type: 'FETCH_FRUITS_ERROR', payload: error.message }); 
} 
}
// Worker Saga: will be fired on FETCH_CURRENT_PRICES actions
function* fetchCurrentPricesSaga() {
  try {
    const response = yield call(axios.get, '/api/fruits/current-prices');
    yield put({ type: 'SET_CURRENT_PRICES', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_CURRENT_PRICES_FAILED', payload: error.message });
  }
}

// Worker Saga: will be fired on UPDATE_PRICES actions
function* updatePricesSaga() {
  while (true) {
    try {
      // Fetch current prices from the API
      const response = yield call(axios.get, '/api/fruits/prices');
      yield put({ type: 'SET_CURRENT_PRICES', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch prices', error);
    }
    // Wait for 15 seconds before the next update
    yield delay(15000); 
  }
}

  
function* fruitSaga() { 
console.log('fruitSaga is running'); 
yield takeLatest('FETCH_FRUITS', fetchFruits);
yield takeLatest('FETCH_CURRENT_PRICES', fetchCurrentPricesSaga);
yield fork(updatePricesSaga);
} 

export default fruitSaga; 
