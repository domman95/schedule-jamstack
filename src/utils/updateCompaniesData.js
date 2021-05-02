async function updateCompaniesData() {
  const { email, name, user_metadata } = currentUserData;
  const data = currentUserData ? user_metadata : [];

  const result = await fetch('/.netlify/functions/update-data', {
    method: 'POST',
    body: JSON.stringify({
      email,
      data,
    }),
  }).then(() => refreshData(email, name));

  return result;
}

export default updateCompaniesData;
