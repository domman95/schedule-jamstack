import moment from 'moment';

export const getVisitDateTime = (date, g, m) => {
  const day = date.format('MM-DD-YYYY');
  const full = `${day} ${g}:${m}:00`;

  return moment(full, 'MM-DD-YYYY hh:mm:ss');
};

moment('12-25-1995 09:15:00', 'MM-DD-YYYY hh:mm:ss');
