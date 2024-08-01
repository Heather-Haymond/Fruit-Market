const initialState = {
    inventory: {},
    error: null,
  };
  
  const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "BUY_FRUIT_SUCCESS":
        const { inventory, newTotalCash } = action.payload;
        return {
          ...state,
          inventory: {
            ...state.inventory,
            ...inventory
          },
          totalCash: newTotalCash,
          error: null,
        };
  
      case "BUY_FRUIT_FAILURE":
        return {
          ...state,
          error: action.payload,
        };
        // if used as an array of inventory items
        // case "SELL_FRUIT_SUCCESS":
        //   const { inventory_id, quantity, purchase_price } = action.payload;
    
        //   // Update the inventory item by ID
        //   const updatedInventory = state.inventory.map(item => 
        //     item.inventory_id === inventory_id
        //       ? { ...item, quantity: item.quantity - quantity, purchase_price }
        //       : item
        //   ).filter(item => item.quantity > 0); // Optionally filter out items with zero quantity
    
        //   return {
        //     ...state,
        //     inventory: updatedInventory,
        //     error: null,
        //   };

      case "SELL_FRUIT_SUCCESS":
        const { id, quantity, purchase_price } = action.payload;
       
        console.log('SELL_FRUIT_SUCCESS - id:', id, 'quantity:', quantity);
        if (quantity <= 0 || isNaN(quantity) || !state.inventory[id]) {
          console.error('Invalid quantityor item not found:', quantity, id);
          return state;
        }

        const fruit = state.inventory[id];

        // Validate the purchase price
        if (parseFloat(purchase_price).toFixed(2) !== parseFloat(fruit.purchase_price).toFixed(2)) {
           console.error('Purchase price mismatch:', purchase_price, fruit.purchase_price);
        return state; // Handle mismatch case as needed
        }
        // New inventory object to avoid mutating the state directly
        const updatedInventory = { ...state.inventory };
        if (fruit) {
          // Calculate the new quantity
          const updatedQuantity = fruit.quantity - quantity;
          // Update the item quantity or delete the item if quantity is zero or negative
          if (updatedQuantity <= 0) {
            delete updatedInventory[id];
          } else {
            updatedInventory[id] = {
              ...fruit,
              quantity: updatedQuantity,
            };
          }
        }
        return {
          ...state,
          inventory: updatedInventory,
          error: null,
        };

        case "SELL_FRUIT_FAILURE":
          console.error('SELL_FRUIT_FAILURE - error:', action.payload);
          return {
            ...state,
            error: action.payload,
          };
    
     default:
      return state;
   }
 };
  
  export default transactionsReducer;
  