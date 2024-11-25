export const formatAmount = (amount) => {
  if(amount === undefined) return 0;
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}