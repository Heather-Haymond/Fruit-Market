import { call, put, takeLatest } from 'redux-saga/effects';
import { formatCash, calculateNewTotalCash } from '../../utils/cashUser.js';
import axios from 'axios';
  
  function* sellSaga(action) {
      try {
        const { fruit_id, quantity, purchase_price, user_id  } = action.payload;
        console.log('Sell fruit payload:', { fruit_id, quantity, purchase_price, user_id });
        const response = yield call(axios.post,  '/api/tranactions/sell', action.payload);
        console.log('Sell fruit response:', response.data);
        yield put({ type: 'SELL_FRUIT_SUCCESS', payload: response.data });
      } catch (error) {
        console.error('Sell fruit error:', error);
        yield put({ type: 'SELL_FRUIT_FAILURE', payload: error.message });
      }
  }
  
  function* buySaga(action) {
      try {
        const { fruitId, quantity, purchasePrice, userId } = action.payload;
        console.log('Buy fruit payload:', action.payload);
        const parsedPurchasePrice = parseFloat(purchasePrice);
        if (isNaN(parsedPurchasePrice)) {
          throw new Error('Amount must be a number');
        }
    
        const response = yield call(axios.post, '/api/transactions/buy', {
           user_id: userId, 
           fruit_id: fruitId,
            quantity,
             purchase_price: purchasePrice
             });
             const { newTotalCash, updatedInventory } = response.data;
             const formattedTotalCash = formatCash(parseFloat(newTotalCash));
             console.log('New total cash:', formatCash(parseFloat(newTotalCash)));
             console.log('Updated inventory:', updatedInventory);
        console.log('Buy fruit response:', response.data);
        yield put({ type: 'BUY_FRUIT_SUCCESS', payload: response.data });
      } catch (error) {
        console.error('Buy fruit error:', error.response?.data || error.message);
        yield put({ type: 'BUY_FRUIT_FAILURE', payload: error.message });
      }
  }

  function* transactionsSaga() {
    yield takeLatest('BUY_FRUIT', buySaga);
    yield takeLatest('SELL_FRUIT', sellSaga);
  }
  
  export default transactionsSaga;