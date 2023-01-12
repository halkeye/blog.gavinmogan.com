import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import useNavLinks from '../hooks/nav.js';


const Header = () => {
  const navLinks = useNavLinks()
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteDescription
        }
      }
    }
  `);
  return (
    <header>
      <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title}>
        <meta name="description" content={data.site.siteMetadata.siteDescription} />
      </Helmet>
      <h1>{data.site.siteMetadata.title}</h1>
      <nav>
        <ul className="nav">{navLinks.map(({label, to}) => (<li key={`${label}_${to}`}><Link role="button" to={to}>{label}</Link></li>))}</ul>
      </nav>
    </header>
  );
}

export default Header
