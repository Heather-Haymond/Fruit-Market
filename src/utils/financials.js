export const calculateGainsOrLoss = (groupedInventory, currentMarketPrices) => {
  if (!Array.isArray(groupedInventory)) {
    console.error('Invalid data type for groupedInventory:', groupedInventory);
    return [];
}
    return groupedInventory.map(fruitGroup => {
      const { id, name, items, averagePurchasePrice } = fruitGroup;
      const currentMarketPrice = currentMarketPrices[id] || 0;

      const potentialProfitLoss = items.map(item => {
        const potentialRevenue = item.quantity * currentMarketPrice;
        const cost = item.quantity * parseFloat(averagePurchasePrice);
        const profitLoss = potentialRevenue - cost;

        return {
          inventory_id: item.inventory_id,
          quantity: item.quantity,
          purchase_price: item.purchase_price,
          current_market_price: currentMarketPrice,
          potential_revenue: potentialRevenue.toFixed(2),
          cost: cost.toFixed(2),
          potential_profit_loss: profitLoss.toFixed(2)
        };
      });

      return {
        fruit_id: id,
        fruit_name: name,
        average_purchase_price: averagePurchasePrice,
        current_market_price: currentMarketPrice,
        items: potentialProfitLoss
      };
    });
  };

