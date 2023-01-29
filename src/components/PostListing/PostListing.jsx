import React from 'react';
import { Link } from 'gatsby';

import CoverImage from '../CoverImage';

const PostListing = ({ postEdges }) => {
  return (
    <>
      <section className="card-list">
        {
          postEdges.map(({ node: post }) => {
            return (
              <div className="post-card" key={post.id}>
                <Link to={post.fields.slug}><CoverImage cover={post.frontmatter.cover} /></Link>
                <div>
                  <div className="date">
                    <time dateTime={post.frontmatter.date}>{new Intl.DateTimeFormat('en-CA', { dateStyle: 'full', timeStyle: 'long'}).format(Date.parse(post.frontmatter.date))}</time>
                  </div>
                </div>
                <h2 className="title"><Link to={post.fields.slug}>{post.frontmatter.title}</Link></h2>
                <div className="excerpt">{post.excerpt}</div>
                <Link className="btn" to={post.fields.slug}>Read More</Link>
              </div>
            );
          })
        }
      </section>
    </>
  );
};

export default PostListing;
