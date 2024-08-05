import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useCurrentPrices = () => {
    const dispatch = useDispatch();
    const currentPrices = useSelector(state => state.fruit.currentPrices);
    const error = useSelector(state => state.fruit.error);

    useEffect(() => {
        dispatch({ type: 'FETCH_CURRENT_PRICES' });
      }, [dispatch]);
    
      return { currentPrices, loading: !currentPrices && !error, error };
    };

export default useCurrentPrices;