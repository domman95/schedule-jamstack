const { query } = require('../src/utils/hasura');

exports.handler = async (event) => {
  const { email, dataToEdit, currentData } = JSON.parse(event.body);
  const { visits, customers, workers } = currentData;

  const x = visits.find((item) => {
    if (item.id === dataToEdit.id) {
      item.customer = dataToEdit.customer;
      item.start = dataToEdit.start;
      item.end = dataToEdit.end;

      return item;
    }
  });

  const y = visits.filter((item) => item.id !== dataToEdit.id);

  const user_metadata = {
    visits: [...y, { ...x }],
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
