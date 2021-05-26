const { query } = require('../src/utils/hasura');

exports.handler = async (event) => {
  const { email, dataToEdit, currentData } = JSON.parse(event.body);
  const { visits, customers, workers } = currentData;

  const y = visits.filter((item) => item.id !== dataToEdit.id);

  const user_metadata = {
    visits: [...y, { ...dataToEdit }],
    customers,
    workers,
  };

  const { update_companies_profiles } = await query({
    query: `
      mutation ($email: String = "", $user_metadata: json = []) {
        update_companies_profiles(where: {email: {_eq: $email}}, _set: {user_metadata: $user_metadata}) {
          affected_rows
        }
      }
    `,
    variables: { email, user_metadata },
  });

  const result = update_companies_profiles;

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
