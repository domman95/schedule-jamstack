import moment from 'moment';

export default async function addVisit(email, newData, currentData) {
  moment.fn.toJSON = function () {
    return this.format();
  };

  const result = await fetch('/.netlify/functions/add-visit', {
    method: 'POST',
    body: JSON.stringify({
      email,
      newData,
      currentData,
    }),
  });

  return result;
}
