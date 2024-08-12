import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useCurrentPrices = () => {
    const dispatch = useDispatch();
    const currentPrices = useSelector(state => state.fruit.currentPrices);
    const [loading, setLoading] = useState(true);
    const [updatesStarted, setUpdatesStarted] = useState(false);

    useEffect(() => {
        try {
            const storedPrices = JSON.parse(localStorage.getItem('currentPrices'));
            if (storedPrices && Object.keys(storedPrices).length > 0) {
                dispatch({ type: 'LOAD_PRICES_FROM_STORAGE', payload: storedPrices });
                setLoading(false);
            } else {
                dispatch({ type: 'FETCH_CURRENT_PRICES' });
            }
        } catch (error) {
            console.error('Error loading prices from storage:', error);
            dispatch({ type: 'FETCH_CURRENT_PRICES' });
        }
    }, [dispatch]);

    useEffect(() => {
        if (currentPrices && Object.keys(currentPrices).length > 0) {
            dispatch({ type: 'START_PERIODIC_UPDATES' });
            setUpdatesStarted(true);
            setLoading(false);
        }
    }, [currentPrices, dispatch]);

    return { currentPrices, loading };
};

export default useCurrentPrices;