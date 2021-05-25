import moment from 'moment';

export const formatDateIntoInputValue = (value) => {
  const date = moment(value).format('YYYY-MM-DD');
  const time = moment(value).format('HH:mm');

  const result = `${date}T${time}`;
  return result;
};
