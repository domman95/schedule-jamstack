const { query } = require('../src/utils/hasura');

exports.handler = async (event) => {
  const { email, name } = event.headers;

  const { companies_profiles } = await query({
    query: `
      query ($email: String = ""){
        companies_profiles (where: {email: {_eq: $email}}) {
          id
          name
          email
          user_metadata
        }
      }
    `,
    variables: { email },
  });

  const result = companies_profiles.find((profile) => profile.email === email);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
