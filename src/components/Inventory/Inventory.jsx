import React, { useMemo }from 'react';
import InventoryItem from './InventoryItem';
import useFetchInventory from '../../hooks/useFetchInventory';
import { groupByFruitId } from "../../utils/aggregateData";
import { useSelector } from 'react-redux';

const Inventory = () => {
  const user = useSelector((state) => state.user);
  const { inventory = [], error } = useFetchInventory(); 

  console.log('User in Inventory:', user);
  console.log('Inventory:', inventory);

  if (inventory && inventory.length > 0) {
    console.log('Type of purchase_price for first item:', typeof inventory[0]?.purchase_price);
  }

  if (error) return <div>Error: {error}</div>;
  if (!inventory) return <div>Loading...</div>;

  const groupedInventory = useMemo(() => {
    return Array.isArray(inventory) ? groupByFruitId(inventory) : [];
  }, [inventory]);

  return (
    <div>
      <h3>Inventory Basket</h3>
      {groupedInventory.length > 0 ? (
        groupedInventory.map((group) => (
          <div key={group.id} className="category">
            <h4>{group.name}</h4>
            {group.items.map((item, index) => (
              <InventoryItem
                key={index} // Use a unique key for each InventoryItem
                fruit={{
                  id: group.id,
                  name: group.name,
                  purchase_price: item.purchase_price,
          
                }}
                user={user}
              />
            ))}
      </div>
      ))
      ) : (
        <p>No items in inventory</p>
      )}
      </div>
  );
};

export default Inventory;