exports.onCreatePage = ({ page, actions }) => {
  if (page.path.match(/^\/app/)) {
    page.matchPath = '/app/*';
    actions.createPage(page);
  }
};
