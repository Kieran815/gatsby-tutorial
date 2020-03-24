import React from 'react';
// with `gatsby-node.js` set up, you can pull data from `GraphQL` queries
import { graphql } from "gatsby";
import Layout from "../components/layout";

// pass `data` from graphql
export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: {slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
