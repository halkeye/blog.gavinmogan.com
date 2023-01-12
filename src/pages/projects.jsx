import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import ItemBlock from '../components/ItemBlock/ItemBlock.jsx';
import Layout from '../components/Layout.jsx';
import { toPostInfo } from '../postUtils.js';

const ProjectList = ({ nodes, onlyCategory }) => (
  <div className="md-grid">
    {nodes.map(edge => {
      const category = edge.frontmatter.category || [];
      if (onlyCategory && !category.map(c => c.slug).includes(onlyCategory)) {
        return null;
      }
      if (!onlyCategory && category.length) {
        return null;
      }
      return (
        <ItemBlock
          key={edge.id}
          {...edge}
          html={edge.html}
        />
      );
    })}
  </div>
);

const ProjectsPage = ({ data }) => {
  const nodes = data.allFile.edges.map(edge => toPostInfo(edge.node.childMarkdownRemark));
  const categories = new Set();
  data.allFile.edges.forEach(edge => categories.add(edge.node.childMarkdownRemark.frontmatter.category))

  return (
    <Layout title="Projects">
      <div id="page">
        <Helmet>
          <title>Projects</title>
        </Helmet>
        <h3>Projects</h3>

        <div>
          <ProjectList nodes={nodes} />
          {Array.from(categories).map(category => (
            <div key={category}>
              <h3>{category}</h3>
              <ProjectList nodes={nodes} onlyCategory={category} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ProjectsPage {
    allFile(
      filter: {sourceInstanceName: {eq: "project"}}
      sort: {childrenMarkdownRemark: {fields: {date: DESC}}}
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
          childMarkdownRemark {
            fields {
              slug
              date
              tags
            }
            id
            html
            frontmatter {
              title
              category
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
            }
          }
        }
      }
    }
  }
`;
