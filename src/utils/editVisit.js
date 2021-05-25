import moment from 'moment';

export default async function editVisit(email, dataToEdit, currentData) {
  moment.fn.toJSON = function () {
    return this.format();
  };

  const result = await fetch('/.netlify/functions/edit-visit', {
    method: 'POST',
    body: JSON.stringify({
      email,
      dataToEdit,
      currentData,
    }),
  });

  return result;
}
