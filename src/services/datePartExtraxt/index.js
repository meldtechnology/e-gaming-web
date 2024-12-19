const dateSuffix = (number) => {
  return ((''+number).includes('1') && checkNumber(number)) ? 'st' :
    ((''+number).includes('2') && checkNumber(number)) ? 'nd' :
    ((''+number).includes('3') && checkNumber(number)) ? 'rd' : 'th';
}

const checkNumber = (number) => {
  return (number !== 11 && number !== 12 && number !== 13);
}

const monthName = (number) => {
  return (number === 1) ? 'January' :
    (number === 2) ? 'February' :
    (number === 3) ? 'March' :
    (number === 4) ? 'April' :
    (number === 5) ? 'May' :
    (number === 6) ? 'June' :
    (number === 7) ? 'July' :
    (number === 8) ? 'August' :
    (number === 9) ? 'September' :
    (number === 10) ? 'October' :
    (number === 11) ? 'November' : 'December';
}

const extractDay = (date) => {
  if(date === undefined) return '';
  const number= new Date(date).getDate();
  return number + dateSuffix(number);
}

const extractMonth = (date) => {
  if(date === undefined) return '';
  const number= new Date(date).getMonth() + 1;
  return monthName(number);
}

const extractYear = (date) => {
  if(date === undefined) return '';
  return new Date(date).getFullYear();
}

const extractFullDate = (date) => {
  return "".concat(extractDay(date), " Of ", extractMonth(date), " ", extractYear(date) );
}


export { extractDay, extractMonth, extractYear, extractFullDate }
