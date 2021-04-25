const path = require('path');

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
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        components: path.join(__dirname, 'src/components'),
        templates: path.join(__dirname, 'src/templates'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
  ],
};
