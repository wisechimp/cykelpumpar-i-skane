require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
const publicMapboxToken = process.env.PUBLIC_MAPBOX_ACCESS_TOKEN;
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const PUMP_NODE_TYPE = `CyclePump`;
const { createRemoteFileNode } = require("gatsby-source-filesystem");

// Adding this so I can take advantage of the shortened import directory reference
// as defined in tsconfig
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

// Creating my cycle pump pages
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

// Creating a new graphql scheme item for accessing the pump data from the mapbox geojson
exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const dataUrl = `https://api.mapbox.com/datasets/v1/wisechimp/ck7bzko9y05qm2ts3jqhs5268/features?access_token=${mapboxToken}`;
  const { data } = await axios.get(dataUrl);

  data.features.forEach((feature) =>
    createNode({
      ...feature,
      id: createNodeId(feature.id),
      internal: {
        type: PUMP_NODE_TYPE,
        contentDigest: createContentDigest(feature),
      },
    })
  );
};

// Adding a node to the pumps item with a url for a static map sourced from mapbox
exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  cache,
  store,
}) => {
  if (node.internal.type === PUMP_NODE_TYPE) {
    const fileNode = await createRemoteFileNode({
      url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+8d343a(${node.geometry.coordinates[0]},${node.geometry.coordinates[1]})/${node.geometry.coordinates[0]},${node.geometry.coordinates[1]},13/400x320@2x?access_token=${publicMapboxToken}`,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      cache,
      store,
    });

    if (fileNode) {
      console.log("There's a file node");
      createNodeField({ node, name: "localFile", value: fileNode.id });
    }
  }
};

// Specifying that the new node added for the map image is a file
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type CyclePump implements Node {
      localFile: File @link(from: "fields.localFile")
    }
  `);
};
