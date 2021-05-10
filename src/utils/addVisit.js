export default async function addVisit(email, newData, currentData) {
  const result = await fetch('/.netlify/functions/update-data', {
    method: 'POST',
    body: JSON.stringify({
      email,
      newData,
      currentData,
    }),
  });

  return result;
}
