import { call, put, takeLatest } from 'redux-saga/effects'; 
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
      const { data } = yield call(axios.put, 'api/fruits/prices');
      yield put({ type: 'UPDATE_PRICES_SUCCESS', payload: data });
      if (action.payload && typeof action.payload.callback === 'function') {
        action.payload.callback(data);
      }
    } catch (error) {
      console.error('Error updating prices', error.response ? error.response.data : error.message);
      yield put({ type: 'UPDATE_PRICES_FAILURE', payload: error.message });
      if (action.payload && typeof action.payload.callback === 'function') {
        action.payload.callback(null, error.message);
      }
    }
  }
  
function* fruitSaga() { 
// console.log('fruitSaga is running'); 
yield takeLatest('FETCH_FRUITS', fetchFruits);
yield takeLatest('UPDATE_PRICES', updatePricesSaga);
} 

export default fruitSaga; 
