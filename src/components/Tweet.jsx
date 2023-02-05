import React from 'react';

import '../css/twitter.css';

export default function Tweet ({ authorUsername, authorName, status, date, children }) {
  return (
    <blockquote className="twitter-tweet" data-lang="en">
      <p lang="en" dir="ltr">
        {children}
      </p>
      &mdash;
      {authorName} (@{authorUsername})
      {' '}
      <a href={`https://twitter.com/${authorUsername}/status/${status}?ref_src=twsrc%5Etfw`}>{date}</a>
    </blockquote>
  );
}
