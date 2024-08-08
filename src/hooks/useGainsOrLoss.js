import { useMemo } from "react";
import { groupByFruitId } from "../utils/aggregateData";
import { calculateGainsOrLoss } from "../utils/financials";

const useGainsOrLoss = (inventory, currentPrices) => {
  return useMemo(() => {
    if (!inventory || !currentPrices) return [];

    const groupedInventory = groupByFruitId(inventory);
    return calculateGainsOrLoss(groupedInventory, currentPrices);
  }, [inventory, currentPrices]);
};

export default useGainsOrLoss;
