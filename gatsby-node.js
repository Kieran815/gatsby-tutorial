const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
// This onCreateNode function will be called by Gatsby whenever a new node is created (or updated).
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    // `gatsby-source-filesystem` ships with a function for creating slugs/path names:
    // { node, getNode, basePath: `pages`}
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// added an implementation of the createPages API which Gatsby calls so plugins can add pages.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // The graphql function call returns a Promise
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        //data passed to context is available as GraphQL vars
        slug: node.fields.slug,
      },
    })
  })
}
