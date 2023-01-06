import React from 'react';
import kebabCase from 'lodash.kebabcase';
import { Link } from 'gatsby';

const PostTags = ({ tags }) => {
  if (!tags) {
    return <div className="post-tag-container" />
  }
  return (
    <div className="post-tag-container">
      <ul>
        {tags.map(tag => (<li key={tag}><Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link></li>))}
      </ul>
    </div>
  );
}

export default PostTags;
