export const unitTens = (amount) => {
  if(amount >= 10000 && amount < 1000000) return (amount / 1000) + "K";
  else if(amount >= 1000000) return (amount / 1000000) + "M";
  return amount;
}

export const thousandMillion = (amount) => {
  if(amount >= 5000000 && amount < 900000000) return (amount / 1000000).toFixed(1) + "M";
  else if(amount >= 1000000000) return (amount / 1000000000).toFixed(1) + "B";
  return amount;
}