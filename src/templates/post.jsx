import { graphql, Link } from 'gatsby';
import React from 'react';

import truncate from 'truncate';

// FIXME - import RehypeReact from 'rehype-react';
// FIXME - import Gist from 'react-gist';

import Layout from '../components/Layout';
import CoverImage from '../components/CoverImage';
import PostTags from '../components/PostTags/PostTags';
import SEO from '../components/SEO/SEO.jsx';

// FIXME - const renderAst = new RehypeReact({ createElement: React.createElement, components: { 'github-gist': Gist } }).Compiler;

const NavItem = ({ mode, edge }) => {
  if (!edge) { return; }
  return (
    <li>
      <Link to={edge.fields.slug}>
        {mode === 'previous' && '← '}
        {truncate(edge.frontmatter.title, 40)}
        {mode === 'next' && ' ⟶'}
      </Link>
    </li>
  );
}

const PostTemplate = ({ pageContext: { next, previous }, data: { markdownRemark: post } }) => {
  return (
    <Layout title={post.fields.title}>
      <SEO postPath={post.fields.slug} type="article" tags={post.fields.tags} />
      <section id="post">
        <ul className="navigate">
          <NavItem mode="previous" edge={previous} />
          <li><Link to="/" className="nav-link">Home</Link></li>
          <NavItem mode="next" edge={next} />
        </ul>
        <div>
          <CoverImage cover={post.frontmatter.cover} />
          <div className="date">
            <time datetime={post.frontmatter.date}>{new Intl.DateTimeFormat('en-CA', { dateStyle: 'full', timeStyle: 'long'}).format(Date.parse(post.frontmatter.date))}</time>
          </div>
          <h2 className="title"><Link to={post.fields.slug}>{post.frontmatter.title}</Link></h2>
          <div className="content" dangerouslySetInnerHTML={{ __html: post.html }} />
          <PostTags tags={post.frontmatter.tags} />
        </div>
      </section>
    </Layout>
  );
}
PostTemplate.displayName = 'PostTemplate'

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      excerpt
      fields {
        category
      }
      frontmatter {
        title
        cover {
          childImageSharp {
            gatsbyImageData(height: 200)
          }
        }
        date
        tags
      }

      #fields {
      #  nextTitle
      #  nextSlug
      #  prevTitle
      #  prevSlug
      #}
    }
  }
`;
export default PostTemplate;
