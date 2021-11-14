export const getMonth = index => {
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

export const getYear = () => {
  const d = new Date();
  return d.getFullYear();
};

export const getThisMonthIndex = () => {
  let date = new Date();
  return date.getMonth();
};
