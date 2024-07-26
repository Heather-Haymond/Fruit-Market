import React from "react";
import useFetchInventory from "../../hooks/useFetchInventory";
import { groupByFruitId } from "../../utils/aggregateData";
import AverageTotalItem from "./AverageTotalItem";

const AverageTotal = () => {
  const { inventory, error } = useFetchInventory();
  // console.log('Inventory:', inventory);

  if (error) return <div>Error: {error}</div>;

  const groupedInventory = groupByFruitId(inventory);

  return (
    <div>
      <h2>Average Total Summary</h2>
      {groupedInventory.map((fruitGroup) => (
        <AverageTotalItem key={fruitGroup.id} fruitGroup={fruitGroup} />
      ))}
      <div className="total-summary">
        <p>
          Total Inventory Value: $
          {groupedInventory
            .reduce(
              (total, fruitGroup) => total + fruitGroup.totalPurchasePrice,
              0
            )
            .toFixed(2)}
        </p>
        <p>
          Average Price per Fruit $
          {(() => {
            const totalFruits = groupedInventory.reduce(
              (sum, fruitGroup) => sum + fruitGroup.totalQuantity,
              0
            );
            if (totalFruits === 0) return "N/A";
            const totalValue = groupedInventory.reduce(
              (sum, fruitGroup) =>
                sum +
                parseFloat(fruitGroup.averagePurchasePrice) *
                  fruitGroup.totalQuantity,
              0
            );
            return (totalValue / totalFruits).toFixed(2);
          })()}
        </p>
      </div>
    </div>
  );
};

export default AverageTotal;
