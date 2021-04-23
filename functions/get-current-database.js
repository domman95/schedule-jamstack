const { query } = require('../src/utils/hasura');

exports.handler = async (event) => {
  const { email, name } = event.headers;

  const { companies_profiles } = await query({
    query: `
      query {
        companies_profiles {
          id
          name
          email
          user_metadata
        }
      }
    `,
  });

  const result = companies_profiles.find((profile) => profile.email === email);

  if (result === undefined) {
    const { insert_companies_profiles_one } = await query({
      query: `
        mutation ($email: String = "", $name: String = "") {
          insert_companies_profiles_one(object: {email: $email, name: $name}) {
            email
            name
          }
        }
      `,
      variables: { name, email },
    });

    const result = insert_companies_profiles_one;

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
