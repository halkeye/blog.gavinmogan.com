import { graphql } from 'gatsby';
import React from 'react';

import { Helmet } from 'react-helmet';
import PostListing from '../components/PostListing/PostListing.jsx';
import Layout from '../components/Layout';

const TagTemplate = ({ pageContext, data }) => {
  return (
    <Layout title={`Posts tagged as "${pageContext.tag}"`}>
      <div id="page">
        <Helmet>
          <title>{`Posts tagged as "${pageContext.tag}"`}</title>
        </Helmet>
        <PostListing postEdges={data.allMarkdownRemark.edges} />
      </div>
    </Layout>
  );
}

export default TagTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      filter: {fields: {sourceInstanceName: {eq: "blog"}, tags: {in: [$tag]}}}
      sort: {fields: {date: DESC}}
      limit: 1000
    ) {
      pageInfo {
        itemCount
        totalCount
        pageCount
        hasNextPage
        currentPage
        hasPreviousPage
        perPage
      }
      edges {
        node {
          fields {
            slug
            tags
          }
          id
          excerpt
          timeToRead
          frontmatter {
            title
            date
            cover {
              childImageSharp {
                gatsbyImageData(width: 800)
              }
            }
          }
        }
      }
    }
  }
`;
