const { query } = require('../src/utils/hasura');

exports.handler = async (event) => {
  const { email, data } = JSON.parse(event.body);

  const newData = [{ name: 'name10' }, { name: 'name27' }, { name: 'name18' }];

  const user_metadata = [...data, ...newData];

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
