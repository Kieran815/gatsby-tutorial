import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {

  const mapNodes = data.allFile.edges.map((dataSet, index) => {
    return (
      <tr key={index}>
        <td>{dataSet.node.id}</td>
        <td>{dataSet.node.size}</td>
        <td>{dataSet.node.changeTime}</td>
      </tr>
    );
  })

  console.log(data)
  return (
    <Layout>
      <h3>GraphQL Query from `gatsby-source-filesystem`</h3>
      <p>Officially learning how to use GraphQL from plugins</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Size</th>
            <th>Change Time</th>
          </tr>
        </thead>
        <tbody>
          {mapNodes}
        </tbody>
      </table>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          id
          size
          changeTime
        }
      }
    }
  }
`
