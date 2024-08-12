import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const useCurrentPrices = () => {
    const dispatch = useDispatch();
    const currentPrices = useSelector(state => state.fruit.currentPrices);
    const [loading, setLoading] = useState(true);
    const [updatesStarted, setUpdatesStarted] = useState(false);

    useEffect(() => {
        const loadPrices = async () => {
        try {
            const storedPrices = JSON.parse(localStorage.getItem('currentPrices'));
            if (storedPrices && Object.keys(storedPrices).length > 0) {
                console.log('Prices loaded from storage:', storedPrices);
                dispatch({ type: 'LOAD_PRICES_FROM_STORAGE', payload: storedPrices });
                setLoading(false);
            } else {
                console.log('Fetching current prices...');
                dispatch({ type: 'FETCH_CURRENT_PRICES' });
            }
        } catch (error) {
            console.error('Error loading prices from storage:', error);
            dispatch({ type: 'FETCH_CURRENT_PRICES' });
        }
    };

    if (!updatesStarted) {
        loadPrices();
    }
}, [dispatch, updatesStarted]);

    useEffect(() => {
        if (currentPrices && Object.keys(currentPrices).length > 0&& !updatesStarted) {
            dispatch({ type: 'START_PERIODIC_UPDATES' });
            setUpdatesStarted(true);
            setLoading(false);
        }
    }, [currentPrices, dispatch, updatesStarted]);

    return { currentPrices, loading };
};

export default useCurrentPrices;