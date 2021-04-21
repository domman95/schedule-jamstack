import moment from 'moment';

export const getVisitDateTime = (date, g, m) => {
  const day = date.format('MM DD YYYY');
  const full = `${day} ${g}:${m}:00`;
  const currentStringOfDate = moment(full)._d;

  return moment(currentStringOfDate, true);
};
