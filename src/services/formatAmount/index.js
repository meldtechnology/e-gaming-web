import { unitTens } from "../unitTens";

export const formatAmount = (amount) => {
  if(amount === undefined) return 0;
  return (amount > 1000000) ? unitTens(amount)
    : amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}