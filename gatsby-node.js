const {paginate} = require('gatsby-awesome-pagination');
const path = require('path');
const kebabCase = require('lodash.kebabcase');
const {urlDatePrefix, getDateFromNode} = require('./src/postUtils.js');

function getSlugFromNode(node, fileNode) {
  if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      return `/${kebabCase(node.frontmatter.slug)}`;
    }
    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'post_name')) {
      return `/${urlDatePrefix(node, fileNode)}/${node.frontmatter.post_name}`;
    }
  }
  const parsedFilePath = path.parse(fileNode.relativePath);
  if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
    return `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
  } else if (parsedFilePath.dir === '') {
    return `/${parsedFilePath.name}/`;
  }
  return `/${parsedFilePath.dir}/`;
}

const fileNodes = {};
exports.onCreateNode = ({node, actions, getNode}) => {
  const {createNodeField} = actions;

  if (node.internal.type === 'File') {
    fileNodes[node.relativePath] = node.absolutePath;
  }

  if (node.internal.type === 'MarkdownRemark' || node.internal.type === 'Mdx') {
    const fileNode = getNode(node.parent);

    createNodeField({
      name: 'sourceInstanceName',
      node,
      value: fileNode.sourceInstanceName
    });
    createNodeField({
      node,
      name: 'slug',
      value: getSlugFromNode(node, fileNode)
    });
    createNodeField({
      node,
      name: 'date',
      value: getDateFromNode(node, fileNode)
    });
    createNodeField({
      node,
      name: 'tags',
      value: [node.frontmatter.category].concat(node.frontmatter.tags || []).filter(Boolean).map(tag => tag.toLowerCase())
    });
  }
};

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;

  const indexPage = path.resolve('src/templates/index.jsx');
  const postPage = path.resolve('src/templates/post.jsx');
  const tagPage = path.resolve('src/templates/tag.jsx');

  const result = await graphql(`{
    allMarkdownRemark(
      filter: {fields: {sourceInstanceName: {eq: "blog"}}}
      sort: {fields: {date: DESC}}
    ) {
      edges {
        node {
          fields {
            slug
            tags
          }
          frontmatter {
            title
          }
        }
        next {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
        previous {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }`);
  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }

  paginate({
    createPage,
    items: result.data.allMarkdownRemark.edges,
    itemsPerPage: 10,
    pathPrefix: '/',
    component: indexPage,
  });

  const tagSet = new Set();
  result.data.allMarkdownRemark.edges.forEach((edge) => {
    if (!edge?.node?.fields?.slug) {
      return
    }

    if (edge?.node?.fields?.tags) {
      edge?.node?.fields?.tags?.forEach(tag => tagSet.add(tag));
    }
    createPage({
      path: edge.node.fields.slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        next: edge.next,
        previous: edge.previous,
      }
    });
  });

  const tagList = Array.from(tagSet);
  tagList.forEach(tag => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagPage,
      context: {
        tag,
        slug: `/tags/${kebabCase(tag)}/`
      }
    });
  });
};
