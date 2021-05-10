const { query } = require('../src/utils/hasura');

exports.handler = async (event) => {
  const { email, newData, currentData } = JSON.parse(event.body);
  const { visits, customers, workers } = currentData;

  const user_metadata = {
    visits: [...visits, { ...newData }],
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
