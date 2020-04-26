require("dotenv").config({
  path: `.env`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-158853521-1",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: "Light (Visual Studio)",
              injectStyles: true,
              logLevel: "error",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/posts/`,
      },
    },
  ],
}
