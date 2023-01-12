import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { toPostInfo } from '../postUtils.js';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import Layout from '../components/Layout.jsx';

const PresentationList = ({ nodes }) => (
  <div className="md-grid">
    {nodes.map(edge => (
      <ItemBlock
        key={edge.id}
        {...edge}
        html={edge.html}
      />
    ))}
  </div>
);

const PresentationsPage = ({ data }) => {
  const nodes = data.allFile.edges.map(edge => toPostInfo(edge.node.childMarkdownRemark));
  return (
    <Layout title="Presentations">
      <div id="page">
        <Helmet>
          <title>Presentations</title>
        </Helmet>
        <h3>Presentations</h3>

        <PresentationList nodes={nodes} />
      </div>
    </Layout>
  );
};

export default PresentationsPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PresentationsPage {
    allFile(
      filter: {sourceInstanceName: {eq: "presentation"}}
      sort: {childrenMarkdownRemark: {fields: {date: DESC}}}
    ) {
      edges {
        node {
          sourceInstanceName
          childMarkdownRemark {
            id
            excerpt
            timeToRead
            fields {
              slug
              date
              tags
            }
            frontmatter {
              title
              category
              date
              image {
                childImageSharp {
                  gatsbyImageData(height: 405)
                }
              }
              link
              links {
                type
                url
              }
              attachments {
                relativePath
                publicURL
              }
            }
          }
        }
      }
    }
  }
`;
