export const unitTens = (amount) => {
  if(amount >= 10000 && amount < 1000000) return (amount / 1000) + "K";
  else if(amount >= 1000000) return (amount / 1000000) + "M";
  return amount;
}