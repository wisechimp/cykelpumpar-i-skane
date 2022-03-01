require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2017",
  },
});

module.exports = {
  pathPrefix: "/cykelpumpar-i-skane",
  siteMetadata: {
    title: `Skåne Cykelpumpar`,
    description: `A map of all the cycle pumps in Skane.`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-R13DWF6NDH",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 80,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "cyclepumps",
        path: "./src/cyclepumps/",
      },
      __key: "cyclepumps",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
  ],
};
