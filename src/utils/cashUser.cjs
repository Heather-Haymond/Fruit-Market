function formatCash(amount) {
    if (typeof amount !== 'number') {
      throw new Error('Amount must be a number');
    }
    return amount.toFixed(2);
  }
  
  function calculateNewTotalCash(currentCash, transactionAmount) {
    if (typeof currentCash !== 'number' || typeof transactionAmount !== 'number') {
      throw new Error('Both currentCash and transactionAmount must be numbers');
    }
    return currentCash + transactionAmount;
  }
  
  module.exports = {
    formatCash,
    calculateNewTotalCash
  };
  