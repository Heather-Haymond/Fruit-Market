import React from "react";
import useUserInventory from "../../hooks/useUserInventory";
import { groupByFruitId } from "../../utils/aggregateData";
import AverageTotalItem from "./AverageTotalItem";

const AverageTotal = () => {
  const { inventory, error } =  useUserInventory();
  console.log('Inventory:', inventory);

  if (error) return <div>Error: {error}</div>;

  if (!Array.isArray(inventory)) {
    console.error('Expected inventory to be an array:', inventory);
    return <div>Error: Inventory data is not in the expected format</div>;
  }

  const groupedInventory = groupByFruitId(inventory);

  return (
    <div>
      <h2>Average Total Summary</h2>
      {groupedInventory.length > 0 ? (
        <>
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
      </>
      ) : (
        <p>No inventory data available.</p>
      )}
    </div>
  );
};

export default AverageTotal;
