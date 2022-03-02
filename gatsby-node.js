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

  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@mapbox|mapbox-gl/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
