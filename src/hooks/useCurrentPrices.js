import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useCurrentPrices = () => {
    const dispatch = useDispatch();
    const currentPrices = useSelector(state => state.fruit.currentPrices);
    const previousPrices = useSelector(state => state.fruit.previousPrices);
    const error = useSelector(state => state.fruit.error);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch({ type: 'FETCH_CURRENT_PRICES' });
      }, [dispatch]);


      useEffect(() => {
        if (error) {
            // If there's an error, keep previous prices
            setLoading(false);
        } else if (currentPrices) {
            // If prices are updated, set loading to false
            setLoading(false);
        }
    }, [currentPrices, error]);

    const effectivePrices = error ? previousPrices : currentPrices;

    return { currentPrices: effectivePrices, loading, error };
};


export default useCurrentPrices;