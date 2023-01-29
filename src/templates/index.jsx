import React from 'react';
import { graphql } from 'gatsby';

import PostListing from '../components/PostListing/PostListing.jsx';
import Layout from '../components/Layout.jsx';
import SEO from '../components/SEO/SEO.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';

const IndexPage = ({data, pageContext}) => {
  return (
    <Layout>
      <SEO />
      <PostListing postEdges={data.allMarkdownRemark.edges} />
      <section id="pagination">
        <Pagination
          hasNextPage={!!pageContext.nextPagePath}
          hasPreviousPage={!!pageContext.previousPagePath}
          perPage={pageContext.limit}
          currentPage={pageContext.humanPageNumber}
          pageCount={pageContext.numberOfPages}
        />
      </section>
    </Layout>
  );
}

export default IndexPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {fields: {sourceInstanceName: {eq: "blog"}}}
      sort: {fields: {date: DESC}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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
  }
`;
