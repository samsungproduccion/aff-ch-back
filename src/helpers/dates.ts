export const getMonthDiff = (dateFrom: Date, dateTo: Date) => {
  // console.log({dateFrom, dateTo})
  // get months
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
};

export const getDaysDiff = (dateFrom: Date, dateTo: Date) => {
  // console.log({dateFrom, dateTo})
  const timeDifference = Math.abs(dateTo.getTime() - dateFrom.getTime());
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};
