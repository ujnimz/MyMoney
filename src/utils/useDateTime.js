// return the month name as per to the month index
export const getMonthName = index => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[index];
};

// return the current year
export const getThisYear = () => {
  const d = new Date();
  return d.getFullYear();
};

// return current month index 0 to 11
export const getThisMonthIndex = () => {
  let date = new Date();
  return date.getMonth();
};

// return next month with year
export const getNextMonthYear = (monthIndex, year) => {
  if (monthIndex === 11) {
    return {monthIndex: 0, year: year + 1};
  } else {
    return {monthIndex: monthIndex + 1, year: year};
  }
};

// return previous month with year
export const getPrevMonthYear = (monthIndex, year) => {
  if (monthIndex === 0) {
    return {monthIndex: 11, year: year - 1};
  } else {
    return {monthIndex: monthIndex - 1, year: year};
  }
};
