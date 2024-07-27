import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const useUserInventory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const inventory = useSelector((state) => state.inventory);

  useEffect(() => {
    const fetchUserInventory = async () => {
      try {
        const response = await axios.get('/api/inventory/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        dispatch({
          type: "SET_INVENTORY",
          payload: response.data,
        });
      } catch (error) {
        console.error('Error fetching user inventory:', error);
      }
    };

    if (user.id) {
      fetchUserInventory();
    }
  }, [dispatch, user.id]);

  return inventory;
};

export default useUserInventory;
