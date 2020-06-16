module.exports = {
  siteMetadata: {
    title: 'Knowit Online Fagseminar Sommer 2020',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-material-ui',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdowns`,
        name: 'markdown-pages',
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: 'appgIPwSYdzKbz4c9',
            tableName: 'innsendte_foredrag',
            mapping: { speaker_image: 'fileNode' },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
  ],
  pathPrefix: '/',
};
