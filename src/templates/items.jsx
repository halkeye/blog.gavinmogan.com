import { graphql, Link } from 'gatsby';
import React from 'react';
import { toPostInfo } from '../postUtils.js';

import Layout from '../components/Layout.jsx';
import ItemBlockLinks from '../components/ItemBlockLinks/ItemBlockLinks.jsx';
import PostTags from '../components/PostTags/PostTags.jsx';
import SocialLinks from '../components/SocialLinks/SocialLinks.jsx';
import SEO from '../components/SEO/SEO.jsx';
import './b16-tomorrow-dark.css';

const PostCover = ({ children }) => <div>FIXME, {children}</div>
const Card = ({ children }) => <div>FIXME, {children}</div>
const CardContent = ({ children }) => <div>FIXME, {children}</div>
const CardActions = ({ children }) => <div>FIXME, {children}</div>
const Divider = ({ children }) => <div>FIXME, {children}</div>
const Typography = ({ children }) => <div>FIXME, {children}</div>

const ItemsTemplate = ({ pageContext: { slug, urlPrefix }, data }) => {
  const postNode = toPostInfo(data.markdownRemark);
  return (
    <Layout title={postNode.title}>
      <div className="post-page md-grid md-grid--no-spacing">
        <SEO
          postPath={postNode.slug}
          postNode={postNode}
          type="website"
          tags={postNode.tags}
          categories={postNode.categories}
        />
        <PostCover cover={postNode.cover} />
        <div className={`md-grid md-cell--9 post-page-contents mobile-fix ${postOverlapClass}`}>
          <Card className="md-grid md-cell md-cell--12 post">
            <Link to={urlPrefix}>&lt; Back</Link>
            <CardContent className="post-body">
              <a href={postNode.link}>
                <Typography color="textSecondary" variant="h2">{postNode.title}</Typography>
              </a>
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </CardContent>
            <CardActions>
              <PostTags tags={postNode.tags} />
              <SocialLinks
                postPath={slug}
                postNode={postNode}
                mobile={mobile}
              />
            </CardActions>
            {postNode.links && (
              <React.Fragment>
                <Divider />
                <CardActions className="md-divider-border md-divider-border--top">
                  {postNode.links.map(l => (
                    <ItemBlockLinks
                      key={`link_${l.type}`}
                      {...l}
                      attachments={postNode.attachments}
                    />
                  ))}
                </CardActions>
              </React.Fragment>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ItemBySlug($slug: String!) {
     markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(width: 800)
          }
        }
        date
        category
        tags
        attachments {
          absolutePath
          publicURL
        }
        link
        links {
          type
          url
        }
      }
      fields {
        slug
      }
    }
  }
`;

export default ItemsTemplate;
