import { graphql, Link } from 'gatsby';
import React from 'react';

import truncate from 'truncate';

// FIXME - import RehypeReact from 'rehype-react';
// FIXME - import Gist from 'react-gist';

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/Layout';
import PostTags from '../components/PostTags/PostTags';
import SEO from '../components/SEO/SEO.jsx';

// FIXME - const renderAst = new RehypeReact({ createElement: React.createElement, components: { 'github-gist': Gist } }).Compiler;

const NavItem = ({ mode, edge, className }) => {
  if (!edge) {
    return (<li className={className} />);
  }
  return (
    <li className={className}>
      <Link to={edge.fields.slug}>
        {mode === 'previous' && '« '}
        {truncate(edge.frontmatter.title, 40)}
        {mode === 'next' && ' »'}
      </Link>
    </li>
  );
}

const PostTemplate = ({ pageContext: { next, previous }, data: { markdownRemark: post } }) => {
  return (
    <Layout title={post.fields.title}>
      <SEO postPath={post.fields.slug} type="article" tags={post.fields.tags} />
      <section id="page">
        <ul className="navigate">
          <NavItem mode="previous" edge={previous} className="previous" />
          <li className="home"><Link to="/">Home</Link></li>
          <NavItem mode="next" edge={next} className="next" />
        </ul>
        <div className="post-card">
          <div>
            {post.frontmatter.cover && <GatsbyImage
              image={getImage(post.frontmatter.cover.childImageSharp)}
              alt="Cover Image"
              className="cover-image"
            />}
          </div>
          <div className="date">
            <time datetime={post.frontmatter.date}>{new Intl.DateTimeFormat('en-CA', { dateStyle: 'full', timeStyle: 'long'}).format(Date.parse(post.frontmatter.date))}</time>
          </div>
          <h2 className="title"><Link to={post.fields.slug}>{post.frontmatter.title}</Link></h2>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <PostTags tags={post.frontmatter.tags} noTitle />
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
            gatsbyImageData(height: 200, transformOptions: {fit: COVER})
          }
        }
        date
        tags
      }
    }
  }
`;
export default PostTemplate;
