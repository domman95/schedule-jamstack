export default function buildSchedule(value) {
  const startWeek = value.clone().startOf('week');
  const endWeek = value.clone().endOf('week');
  const day = startWeek.clone().subtract(1, 'day');
  const calendar = [];

  while (day.isBefore(endWeek, 'day')) {
    calendar.push(day.add(1, 'day').clone());
  }

  return calendar;
}
