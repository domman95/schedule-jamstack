export const currentDate = (value) => {
  const firstDayOfWeek = value.clone().startOf('week').format('DD');
  const lastDayOfWeek = value.clone().endOf('week').format('DD');
  const fullNameOfCurrentMonth = value.format('MMMM');
  const currentYear = value.format('YYYY');

  return `${fullNameOfCurrentMonth} ${firstDayOfWeek} - ${lastDayOfWeek}, ${currentYear}`;
};
