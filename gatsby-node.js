const path = require("path");
const fs = require("fs");

exports.onCreateWebpackConfig = ({ actions, stage, loaders }, options) => {
  const srcPath = options.srcPath || path.resolve(__dirname, "./src");
  try {
    const stat = fs.statSync(srcPath);
    if (!stat.isDirectory) {
      console.warn(`src path is not a directory ${srcPath}`);
    }
  } catch (err) {
    console.warn(`src path not found ${srcPath}`);
  }
  actions.setWebpackConfig({
    resolve: {
      modules: [srcPath, "node_modules"],
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const queryData = await graphql(`
    {
      cyclePumpsData: allMdx {
        edges {
          node {
            frontmatter {
              slug
            }
            id
          }
        }
      }
    }
  `);

  if (queryData.error) {
    throw queryData.error;
  }

  const cyclePumps = queryData.data.cyclePumpsData.edges;
  cyclePumps.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.slug,
      component: path.resolve(`./src/templates/cyclepump.tsx`),
      context: {
        id: node.id,
      },
    });
  });
};
