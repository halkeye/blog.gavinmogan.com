import React from 'react';
import kebabCase from 'lodash.kebabcase';
import { Link } from 'gatsby';

const PostTags = ({ tags, noTitle }) => {
  if (!tags || tags.length === 0) {
    return <div className="post-tag-container" />
  }
  return (
    <div>
      {!noTitle || <h3>Tags:</h3>}
      <ul className="post-tag-container">
        {tags.map(tag => (<li key={tag}><Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link></li>))}
      </ul>
    </div>
  );
}

export default PostTags;
