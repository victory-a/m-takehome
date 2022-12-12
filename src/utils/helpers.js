export function formatCurrency(amount, currency = 'USD') {
  const amountDefined = Number(amount) || 0;
  return amountDefined
    ? amountDefined
        .toLocaleString('en-US', {
          style: 'currency',
          currency,
        })
        .slice(0, -3)
    : amountDefined;
}
