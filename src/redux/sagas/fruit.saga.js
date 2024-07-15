import { call, put, takeLatest } from 'redux-saga/effects'; 
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

function* fruitSaga() { 
console.log('fruitSaga is running'); 
yield takeLatest('FETCH_FRUITS', fetchFruits); 
} 

export default fruitSaga; 
