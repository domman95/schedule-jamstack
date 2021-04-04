module.exports = {
  siteMetadata: {
    title: 'schedule-jamstack',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify-identity-widget',
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'Basic-Auth: someuser:somepassword anotheruser:anotherpassword',
          ],
        },
      },
    },
  ],
};
