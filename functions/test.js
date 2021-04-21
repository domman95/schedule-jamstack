const { query } = require('../src/utils/hasura');

exports.handler = async () => {
  const result = await query({
    query: `
      query {
        companies_profiles {
          id
          name
        }
      }
    `,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
