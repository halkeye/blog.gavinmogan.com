import React from 'react';
import { Link } from 'gatsby';

export default function ItemBlock ({ link, links, title, attachments, html, excerpt }) {
  return (
    <div className="item-block">
      <div><Link to={link}>{title}</Link></div>
      <span dangerouslySetInnerHTML={{ __html: excerpt || html }} />
      <ul className="links">
        {(links || []).map((link, idx) => (<li key={idx}><a href={link.url}>{link.type}</a></li>))}
        {(attachments || []).map((attachment, idx) => (<li key={idx}><a href={attachment.publicURL}>{attachment.relativePath}</a></li>))}
      </ul>
    </div>
  );
}
ItemBlock.defaultProps = {};
