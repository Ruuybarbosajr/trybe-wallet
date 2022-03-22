const setValue = (expenses) => {
  if (expenses.length > 0) {
    return expenses.reduce((acc, { value, exchangeRates, currency }) => (
      acc + Number(value) * Number(exchangeRates[currency].ask)), 0).toFixed(2);
  }
  return 0;
};

export default setValue;
