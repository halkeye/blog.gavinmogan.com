import { graphql } from 'gatsby';
import React from 'react';
// FIXME - import RehypeReact from 'rehype-react';
// FIXME - import Gist from 'react-gist';
import { Helmet } from 'react-helmet';

import Layout from '../components/Layout';
import PostTags from '../components/PostTags/PostTags.jsx';
import PostCover from '../components/PostCover/PostCover.jsx';
import PostInfo from '../components/PostInfo/PostInfo.jsx';
import SocialLinks from '../components/SocialLinks/SocialLinks.jsx';
import SEO from '../components/SEO/SEO.jsx';
import config from '../../data/SiteConfig.js';
import { toPostInfo } from '../postUtils.js';

const Card = ({ children }) => <div>CARD-FIXME, {children}</div>
const CardContent = ({ children }) => <div>CARDCONTENT-FIXME, {children}</div>

// FIXME - const renderAst = new RehypeReact({ createElement: React.createElement, components: { 'github-gist': Gist } }).Compiler;

const PostTemplate = ({ pageContext: { slug }, data: { markdownRemark } }) => {
  console.log(markdownRemark);
  const post = toPostInfo(markdownRemark);
  return (
    <Layout title={post.title}>
      <div className="post-page md-grid md-grid--no-spacing">
        <Helmet>
          <title>{post.title}</title>
        </Helmet>
        <SEO
          postPath={slug}
          postNode={post}
          type="article"
          tags={post.tags}
          categories={post.categories}
        />
        <PostCover cover={post.cover} />
        <div>
          <Card className="md-grid md-cell md-cell--12 post">
            <CardContent className="post-body">
              <h1 className="md-display-2 post-header">{post.title}</h1>
              <PostInfo postNode={post} />
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </CardContent>
            <div className="post-meta">
              <PostTags tags={post.tags} />
              <SocialLinks postPath={slug} postNode={post} />
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

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
            fluid(maxWidth: 800, maxHeight: 300, cropFocus: ENTROPY) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
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
