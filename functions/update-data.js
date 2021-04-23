const { query } = require('../src/utils/hasura');

exports.handler = async (event) => {
  const email = 'dominiklasek95@gmail.com';
  const user_metadata = [
    { name: 'name3' },
    { name: 'name4' },
    { name: 'name5' },
  ];

  const { update_companies_profiles } = await query({
    query: `
    mutation MyMutation($email: String = "", $user_metadata: json = []) {
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
