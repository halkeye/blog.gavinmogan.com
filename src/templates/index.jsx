import React from 'react';
import { graphql } from 'gatsby';

import PostListing from '../components/PostListing/PostListing.jsx';
import Layout from '../components/Layout.jsx';
import SEO from '../components/SEO/SEO.jsx';

const IndexPage = ({data, pageContext}) => {
    return (
      <Layout>
        <SEO />
        <PostListing
          postEdges={data.allFile.edges}
          pageInfo={data.allFile.pageInfo}
        />
      </Layout>
    );
  }

export default IndexPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery($skip: Int!, $limit: Int!) {
    allFile(
      filter: {sourceInstanceName: {eq: "blog"}}
      limit: $limit
      skip: $skip
      sort: {childrenMarkdownRemark: {fields: {date: DESC}}}
    ) {
      edges {
        node {
          childMarkdownRemark {
            id
            excerpt
            timeToRead
            fields {
              slug
            }
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(height: 200, width: 312)
                }
              }
              date
            }
          }
        }
      }
      pageInfo {
        itemCount
        totalCount
        pageCount
        hasNextPage
        currentPage
        hasPreviousPage
        perPage
      }
    }
  }
`;
